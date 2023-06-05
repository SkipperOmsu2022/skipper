package ru.tinkoff.edu.backend.services.implementation;

import lombok.extern.log4j.Log4j2;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.exception.ImageStorageException;
import ru.tinkoff.edu.backend.properties.StorageProperties;
import ru.tinkoff.edu.backend.services.FileStorageService;

import java.io.IOException;
import java.io.InputStream;
import java.nio.file.*;

@Service
@Log4j2
public class ImageStorageService implements FileStorageService {
  private static final String[] SUPPORTED_FILE_EXTENSION = new String[] {"png", "jpg", "jpeg"};
  private final Path rootLocation;

  public ImageStorageService(StorageProperties properties) {
    this.rootLocation = Paths.get(properties.getLocation());
    init();
  }

  @Override
  public String save(
      FileStorageLocation fileStorageLocation, MultipartFile image, String fileName) {
    if (image == null || image.isEmpty()) {
      delete(
          getNormalizeAbsolutePathFromRootLocation(
                  rootLocation, fileStorageLocation.getPath(), fileName)
              .toString(),
          SUPPORTED_FILE_EXTENSION);
      return "";
    }

    String fileExtension = getFileExtensionIfSupported(image, SUPPORTED_FILE_EXTENSION);

    try {
      final String finalFileName = fileName + '.' + fileExtension;

      Path destinationFile =
          getNormalizeAbsolutePathFromRootLocation(
              rootLocation, fileStorageLocation.getPath(), finalFileName);
      if (!destinationFile.getParent().startsWith(rootLocation.normalize().toAbsolutePath())) {
        throw new ImageStorageException("Cannot store file outside current directory!");
      }

      try (InputStream inputStream = image.getInputStream()) {
        Files.copy(inputStream, destinationFile, StandardCopyOption.REPLACE_EXISTING);
      }

      log.info("Image save in->" + destinationFile);
      return fileStorageLocation.getApi() + '/' + finalFileName;
    } catch (IOException e) {
      throw new ImageStorageException("Failed to save file!", e);
    }
  }

  @Override
  public void deleteFromFileStorageLocation(
      FileStorageLocation fileStorageLocation, String fileNameOrPath) {
    Path path =
        getNormalizeAbsolutePathFromRootLocation(
            rootLocation,
            fileStorageLocation.getPath(),
            Paths.get(fileNameOrPath).getFileName().toString());
    delete(path.toString());
  }

  @Override
  public void init() {
    try {
      Files.createDirectories(rootLocation);
      for (FileStorageLocation fileStorageLocation : FileStorageLocation.values()) {
        Files.createDirectories(rootLocation.resolve(fileStorageLocation.getPath()));
      }
    } catch (IOException e) {
      throw new ImageStorageException("Could not initialize storage", e);
    }
  }
}
