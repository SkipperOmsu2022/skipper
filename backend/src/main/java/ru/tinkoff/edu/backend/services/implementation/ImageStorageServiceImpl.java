package ru.tinkoff.edu.backend.services.implementation;

import lombok.extern.log4j.Log4j2;
import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.exception.ImageStorageException;
import ru.tinkoff.edu.backend.properties.StorageProperties;
import ru.tinkoff.edu.backend.services.ImageStorageService;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
@Log4j2
public class ImageStorageServiceImpl implements ImageStorageService {
    private final Path rootLocation;
    private final String apiUserImage;

    public ImageStorageServiceImpl(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.apiUserImage = properties.getApiUserImage();
    }

    @Override
    public String save(MultipartFile image, String fileName) {
        if (image == null || image.isEmpty()) {
            // здесь будет код удаления картинки, если она существует
            return "";
        }

        try {
            final String finalFileName = fileName + '.' + FilenameUtils.getExtension(image.getOriginalFilename());

            Path destinationFile = rootLocation.resolve(Paths.get(finalFileName)).normalize().toAbsolutePath();

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

    // TODO при сжатии, если файл не является картинкой, то выдавать исключение "Unsupported image type!"

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
