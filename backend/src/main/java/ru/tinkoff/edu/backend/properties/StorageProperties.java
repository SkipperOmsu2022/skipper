package ru.tinkoff.edu.backend.properties;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Getter
@Setter
@Component
@ConfigurationProperties(prefix = "storage")
public class StorageProperties {
  /**
   * Конфигурация в application.properties для указания местоположения сохранения файлов. Значение
   * по умолчанию: "~/uploads"
   */
  private String location = "~/uploads";
}
