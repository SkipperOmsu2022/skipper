package ru.tinkoff.edu.backend.config;

import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.tinkoff.edu.backend.properties.StorageProperties;
import ru.tinkoff.edu.backend.services.ImageStorageService;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@Log4j2
public class RestConfiguration implements WebMvcConfigurer {
    private final Path rootLocation;
    private final String apiUserImage;

    public RestConfiguration(StorageProperties properties) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.apiUserImage = properties.getApiUserImage();
    }

    /**
     * Создаёт директорию для хранения файлов.
     */
    @Bean
    CommandLineRunner init(ImageStorageService imageStorageService) {
        return (args) -> {
            imageStorageService.init();
        };
    }

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        // загрузка фото профиля
        registry.addResourceHandler(apiUserImage + "/**")
                .addResourceLocations("file:" + rootLocation + "/");
    }
}
