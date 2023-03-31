package ru.tinkoff.edu.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * EnableJpaAuditing выноситься в отдельный класс конфигурации(а не в main class), чтобы он не загружался для
 * несвязных срезов приложения.
 */
@Configuration
@EnableJpaAuditing
public class JpaAuditingConfiguration {
}
