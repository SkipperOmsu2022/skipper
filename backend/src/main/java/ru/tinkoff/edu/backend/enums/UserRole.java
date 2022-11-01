package ru.tinkoff.edu.backend.enums;

/**
 * Роли(права) пользователей.
 */
public enum UserRole {
    ADMIN("Администратор"),
    MENTEE("Ученик"),
    MENTOR("Ментор");

    private final String status;
    UserRole(String status) {
        this.status = status;
    }

    public String getStringUserRole() {
        return status;
    }
}
