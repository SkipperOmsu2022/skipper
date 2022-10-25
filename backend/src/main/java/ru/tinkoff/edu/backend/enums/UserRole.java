package ru.tinkoff.edu.backend.enums;

/**
 * Роли(права) пользователей.
 */
public enum UserRole {
    ADMIN("Администратор"),
    MENTEE("Менти"),
    MENTOR("Ментор");

    private final String status;
    UserRole(String status) {
        this.status = status;
    }

    public String getStringUserRole() {
        return status;
    }
}
