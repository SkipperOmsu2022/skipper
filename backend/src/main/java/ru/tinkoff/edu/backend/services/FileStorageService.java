package ru.tinkoff.edu.backend.services;

import org.apache.commons.io.FilenameUtils;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.exception.FileExtensionNotSupportedException;
import ru.tinkoff.edu.backend.exception.FileStorageServiceException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;

@Service
public interface FileStorageService {
    /**
     * Сохраняет картинку в директории(настраивает в application.properties)
     * @param fileStorageLocation тип сохраняемого файла
     * @param image картинка в формате MultipartFile.
     * @param fileName имя сохраняемого файла.
     * @return пустую строку, если файл пустой, или место сохранения, если файл сохранён.
     */
    String save(FileStorageLocation fileStorageLocation, MultipartFile image, String fileName);

    /**
     * Возвращает расширение файла, если оно поддерживается, иначе выбрасывает FileExtensionNotSupportedException
     */
    default String getFileExtensionIfSupported(MultipartFile file, String... supportedExtensions) {
        String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
        if (fileExtension == null || !Arrays.asList(supportedExtensions).contains(fileExtension)) {
            throw new FileExtensionNotSupportedException("The file extension is not supported! File:"
                    + file.getOriginalFilename());
        }
        return fileExtension;
    }

    /**
     * Удаляет файл по указанному пути. Если расширение файла неизвестно,
     * то передавать вторым аргументом массив всевозможных расширений.<br>
     * Если передать массив расширений файла, то удаляться все файлы, имеющее переданное название и указанные
     * расширения.
     * @param fileName имя удаляемого файла.
     * @param extensions возможные расширения удаляемого файла, если первоначально оно неизвестно.
     */
    default void delete(String fileName, String ...extensions) {
        try {
            if(extensions.length == 0) {
                Files.deleteIfExists(Paths.get(fileName));
            } else {
                for (String ex : extensions) {
                    Files.deleteIfExists(Paths.get(fileName.concat(".").concat(ex)));
                }
            }
        } catch (IOException e) {
            throw new FileStorageServiceException("Failed to delete file with name: " + fileName, e);
        }
    }

    /**
     * Удаляет указанный файл или папку из переданного места хранения.
     * @param fileStorageLocation тип места.
     * @param fileNameOrPath название файла или путь.
     */
    void deleteFromFileStorageLocation(FileStorageLocation fileStorageLocation, String fileNameOrPath);

    /**
     * Возвращает абсолютный нормализированый путь к папке или файлу.
     * Префикс пути - rootLocation, остальные части пути последовательно соединяются.
     * @param rootLocation абсолютный путь корневой папки.
     * @param partOfPath часть составного пути, необходимо указывать только название без разделительного знака.
     * @return абсолютный нормализированый путь к папке или файлу.
     */
    default Path getNormalizeAbsolutePathFromRootLocation(Path rootLocation, String... partOfPath) {
        for(String file : partOfPath) {
            rootLocation = rootLocation.resolve(file);
        }
        return rootLocation
                .normalize()
                .toAbsolutePath();
    }

    /**
     * Создаёт папку для хранения файлов.
     */
    void init();
}
