package ru.tinkoff.edu.backend.services;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.exception.FileExtensionNotSupportedException;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import static org.junit.jupiter.api.Assertions.*;

class FileStorageServiceTest {
  private final FileStorageService fileStorageService =
      new FileStorageService() {
        @Override
        public String save(
            FileStorageLocation fileStorageLocation, MultipartFile image, String fileName) {
          return null;
        }

        @Override
        public void deleteFromFileStorageLocation(
            FileStorageLocation fileStorageLocation, String fileNameOrPath) {}

        @Override
        public void init() {}
      };
  private final String[] supportedExtensions = new String[] {"jpg", "png"};

  @Test
  void getFileExtensionIfSupported_thenReturnString() {
    String fileExtension = "jpg";
    MultipartFile multipartFile =
        new MockMultipartFile(
            "file",
            "image." + fileExtension,
            MediaType.MULTIPART_FORM_DATA_VALUE,
            "image(1231231341442)".getBytes());

    String actualFileExtension =
        fileStorageService.getFileExtensionIfSupported(multipartFile, supportedExtensions);

    assertEquals(actualFileExtension, fileExtension);
  }

  @Test
  void getFileExtensionIfSupported_withFileExtensionNotSupportedException() {
    String originalFileName = "file.pdf";
    MultipartFile multipartFile =
        new MockMultipartFile(
            "file",
            originalFileName,
            MediaType.MULTIPART_FORM_DATA_VALUE,
            "image(1234562346)".getBytes());

    String messageActual =
        assertThrows(
                FileExtensionNotSupportedException.class,
                () ->
                    fileStorageService.getFileExtensionIfSupported(
                        multipartFile, supportedExtensions))
            .getMessage();
    assertEquals("The file extension is not supported! File:" + originalFileName, messageActual);
  }

  @Test
  void deleteFile() throws IOException {
    Path tempFile = Files.createTempFile("tempFile", null);

    assertTrue(Files.exists(tempFile));

    fileStorageService.delete(tempFile.toString());

    assertFalse(Files.exists(tempFile));
  }

  @Test
  void deleteFile_withExtensions() throws IOException {
    Path tempFile = Files.createTempFile("tempFile", "." + supportedExtensions[0]);
    String tempFileWithoutExtension = tempFile.toString().split("\\.")[0];

    assertTrue(Files.exists(tempFile));

    fileStorageService.delete(tempFileWithoutExtension, supportedExtensions);

    assertFalse(Files.exists(tempFile));
  }

  @Test
  void deleteMultipleFilesWithExtensions() throws IOException {
    Path tempFile1 = Files.createTempFile("test1", "." + supportedExtensions[0]);
    Path tempFile2 =
        new File(tempFile1.toString().replace(supportedExtensions[0], supportedExtensions[1]))
            .toPath();
    String tempFileWithoutExtension = tempFile1.toString().split("\\.")[0];

    fileStorageService.delete(tempFileWithoutExtension, supportedExtensions);

    assertFalse(Files.exists(tempFile1));
    assertFalse(Files.exists(tempFile2));
  }

  @Test
  void testGetNormalizeAbsolutePathFromRootLocation() {
    Path rootLocation = Paths.get("/root/folder");
    String[] partOfPath = {"subfolder1", "subfolder2", "file.txt"};
    Path expectedPath =
        Paths.get("/root/folder/subfolder1/subfolder2/file.txt").normalize().toAbsolutePath();

    Path actualPath =
        fileStorageService.getNormalizeAbsolutePathFromRootLocation(rootLocation, partOfPath);

    assertEquals(expectedPath, actualPath);
  }
}
