package ru.tinkoff.edu.backend.services;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface ImageStorageService {
    /**
     * Сохраняет картинку в директории(настраивает в application.properties)
     * @param image картинка в формате MultipartFile.
     * @param fileName имя сохраняемого файла.
     * @return пустую строку, если файл пустой, или место сохранения, если файл сохранён.
     */
    String save(MultipartFile image, String fileName);
    void init();
}
