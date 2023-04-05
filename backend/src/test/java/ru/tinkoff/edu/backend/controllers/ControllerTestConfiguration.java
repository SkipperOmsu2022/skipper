package ru.tinkoff.edu.backend.controllers;

import org.springframework.boot.context.properties.EnableConfigurationProperties;
import ru.tinkoff.edu.backend.properties.StorageProperties;

@EnableConfigurationProperties(value = StorageProperties.class)
public class ControllerTestConfiguration {
}
