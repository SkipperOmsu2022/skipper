package ru.tinkoff.edu.backend.config;

import lombok.NonNull;
import lombok.extern.log4j.Log4j2;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.tinkoff.edu.backend.enums.FileStorageLocation;
import ru.tinkoff.edu.backend.properties.StorageProperties;

import java.nio.file.Path;
import java.nio.file.Paths;

@Configuration
@Log4j2
public class RestConfiguration implements WebMvcConfigurer {
  private final Path rootLocation;

  public RestConfiguration(StorageProperties properties) {
    this.rootLocation = Paths.get(properties.getLocation());
  }

  @Override
  public void addResourceHandlers(final @NonNull ResourceHandlerRegistry registry) {
    for (FileStorageLocation fileStorageLocation : FileStorageLocation.values()) {
      registry
          .addResourceHandler(fileStorageLocation.getApi() + "/**")
          .addResourceLocations(
              "file:"
                  + rootLocation.resolve(fileStorageLocation.getPath()).normalize().toAbsolutePath()
                  + "/");
    }
  }
}
