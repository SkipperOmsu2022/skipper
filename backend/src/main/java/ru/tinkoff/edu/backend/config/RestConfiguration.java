package ru.tinkoff.edu.backend.config;

import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
import ru.tinkoff.edu.backend.properties.StorageProperties;
import ru.tinkoff.edu.backend.services.FileStorageService;
import ru.tinkoff.edu.backend.services.UserService;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@Log4j2
public class RestConfiguration implements WebMvcConfigurer {
    private final Path rootLocation;
    private final String apiUserImage;
    private final DispatcherServlet servlet;

    public RestConfiguration(StorageProperties properties, DispatcherServlet servlet) {
        this.rootLocation = Paths.get(properties.getLocation());
        this.apiUserImage = properties.getApiUserImage();
        this.servlet = servlet;
    }

    /**
     * Создаёт директорию для хранения файлов.
     */
    @Bean
    public CommandLineRunner initFolderOfFileStorageService(FileStorageService fileStorageService) {
        return args -> fileStorageService.init();
    }

    @Bean
    public CommandLineRunner getCommandLineRunner(ApplicationContext context) {
        servlet.setThrowExceptionIfNoHandlerFound(true);
        return args -> {};
    }

    @Override
    public void addResourceHandlers(final @NonNull ResourceHandlerRegistry registry) {
        registry.addResourceHandler(apiUserImage + "/**")
                .addResourceLocations("file:" + rootLocation + "/");
    }
}
