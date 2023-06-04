package ru.tinkoff.edu.backend.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

/** Обработка сообщений WebSocket, поддерживаемый броккером сообщений. */
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
  /**
   * Настройка брокера сообщений. Реализует простоый броккер сообщений "enableSimpleBroker", который
   * хранится в памяти. Передаёт сообщений обратно, если пришло на api "/topic". Также, добавляется
   * префикс "/app" для сообщений, связанный с методами, аннотированными с помощью @MessageMapping.
   */
  @Override
  public void configureMessageBroker(MessageBrokerRegistry config) {
    config.setApplicationDestinationPrefixes("/app").enableSimpleBroker("/topic");
  }

  /**
   * Регистрирует основные и альтернативные api(включая SockJS), если WebSocket
   * недоступен(неподдержэивается в браузере на стороне клиента). Клиент попытается подключится к
   * SockJS к зарегистрированному в этом методе api, чтобы использовать наилучший доступный
   * транспорт(канал) передачи.
   */
  @Override
  public void registerStompEndpoints(StompEndpointRegistry registry) {
    registry.addEndpoint("/chat").setAllowedOriginPatterns("*").withSockJS();
  }
}
