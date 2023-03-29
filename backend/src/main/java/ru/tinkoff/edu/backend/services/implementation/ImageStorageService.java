package ru.tinkoff.edu.backend.services.implementation;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.exception.ImageStorageException;
import ru.tinkoff.edu.backend.properties.StorageProperties;
import ru.tinkoff.edu.backend.services.FileStorageService;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;

@Service
@Log4j2
public class ImageStorageService implements FileStorageService {
    private final String[] supportedFileExtension = new String[]{"png", "jpg", "jpeg"};
    private final Path rootLocation;
    private final String apiUserImage;

    public ImageStorageService(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.apiUserImage = properties.getApiUserImage();
    }

    @Override
    public String save(MultipartFile image, String fileName) {
        if (image == null || image.isEmpty()) {
            delete(rootLocation.resolve(fileName).toString(), supportedFileExtension);
            return "";
        }

        String fileExtension = getFileExtensionIfSupported(image, supportedFileExtension);

        try {
            final String finalFileName = fileName + '.' + fileExtension;

            Path destinationFile = rootLocation.resolve(finalFileName).normalize().toAbsolutePath();
            if (!destinationFile.getParent().equals(this.rootLocation.toAbsolutePath())) {
                throw new ImageStorageException(
                        "Cannot store file outside current directory.");
            }

            try (InputStream inputStream = image.getInputStream()) {
                Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
            }

            log. info("Image save in->" + destinationFile);
            return apiUserImage + '/' + finalFileName;
        } catch (IOException e) {
            throw new ImageStorageException("Failed to save file.", e);
        }
    }

    @Override
    public void init() {
        try {
            Files.createDirectories(rootLocation);
        }
        catch (IOException e) {
            throw new ImageStorageException("Could not initialize storage", e);
        }
    }
}
