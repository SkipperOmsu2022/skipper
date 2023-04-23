package ru.tinkoff.edu.backend.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mock.web.MockMultipartFile;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.exception.FileExtensionNotSupportedException;
import ru.tinkoff.edu.backend.exception.ImageStorageException;
import ru.tinkoff.edu.backend.properties.StorageProperties;
import ru.tinkoff.edu.backend.services.implementation.ImageStorageService;

import java.nio.file.Files;
import java.nio.file.Path;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class ImageStorageServiceTest {
    @Mock
    private StorageProperties storageProperties;
    private Path rootLocation;
    private ImageStorageService imageStorageService;

    @BeforeEach
    void setUp() throws Exception {
        rootLocation = Files.createTempDirectory("test-dir");
        when(storageProperties.getLocation()).thenReturn(rootLocation.toString());
        imageStorageService = new ImageStorageService(storageProperties);
    }

    @Test
    void init_createsDirectories() {
        imageStorageService.init();
        for (FileStorageLocation fileStorageLocation : FileStorageLocation.values()) {
            assertTrue(Files.isDirectory(rootLocation.resolve(fileStorageLocation.getPath())));
        }
    }

    @Test
    void deleteFromFileStorageLocation_withValidFile_deletesFile() throws Exception {
        String fileName = "test.png";
        Files.createFile(
                rootLocation
                        .resolve(FileStorageLocation.USER_PROFILE_PHOTO.getPath())
                        .resolve(fileName)
        );

        assertTrue(Files.exists(
                rootLocation
                        .resolve(FileStorageLocation.USER_PROFILE_PHOTO.getPath())
                        .resolve(fileName))
        );

        imageStorageService.deleteFromFileStorageLocation(
                        FileStorageLocation.USER_PROFILE_PHOTO,
                        fileName
        );

        assertFalse(Files.exists(
                rootLocation
                        .resolve(FileStorageLocation.USER_PROFILE_PHOTO.getPath())
                        .resolve(fileName))
        );
    }

    @Test
    void save_emptyFile_thenReturnEmptyString() {
        String fileName = "test.png";
        MockMultipartFile emptyFile = new MockMultipartFile("image", new byte[0]);
        String result = imageStorageService.save(
                FileStorageLocation.USER_PROFILE_PHOTO,
                emptyFile,
                fileName
        );

        assertEquals("", result);
        assertFalse(Files.exists(
                rootLocation
                        .resolve(FileStorageLocation.USER_PROFILE_PHOTO.getPath())
                        .resolve(fileName))
        );
    }

    @Test
    void save_withUnsupportedFileExtension_throwsException() {
        String fileName = "test.txt";
        MockMultipartFile unsupportedFile = new MockMultipartFile(
                "image",
                fileName,
                "text/plain",
                new byte[123]
        );
        String messageExceptionExpected = "The file extension is not supported! File:" + fileName;

        String messageExceptionActual = assertThrows(
                FileExtensionNotSupportedException.class,
                () -> imageStorageService.save(
                        FileStorageLocation.USER_CERTIFICATES,
                        unsupportedFile,
                        fileName
                )
        ).getMessage();
        assertEquals(messageExceptionExpected, messageExceptionActual);
        assertFalse(Files.exists(
                rootLocation
                        .resolve(FileStorageLocation.USER_CERTIFICATES.getPath())
                        .resolve(fileName)
        ));
    }

    @Test
    void save_withValidImage_returnsImageUrl() {
        String fileName = "test";
        MockMultipartFile validImage = new MockMultipartFile(
                "image",
                fileName + ".jpg",
                "image/jpeg",
                "image".getBytes()
        );
        String result = imageStorageService.save(
                FileStorageLocation.USER_PROFILE_PHOTO,
                validImage,
                fileName
        );

        assertTrue(result.contains(
                FileStorageLocation.USER_PROFILE_PHOTO.getApi()
        ));
        assertTrue(Files.exists(
                imageStorageService.getNormalizeAbsolutePathFromRootLocation(
                        rootLocation,
                        FileStorageLocation.USER_PROFILE_PHOTO.getPath(),
                        fileName + ".jpg"
                )
        ));
    }
}