package ru.tinkoff.edu.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * EnableJpaAuditing выноситься в отдельный класс конфигурации(а не в main class), чтобы он не
 * загружался для несвязных срезов приложения.
 */
@Configuration
@EnableJpaAuditing
@EnableJpaRepositories(basePackages = "ru.tinkoff.edu.backend.repositories")
public class JpaConfiguration {}
