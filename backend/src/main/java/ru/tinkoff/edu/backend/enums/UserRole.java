package ru.tinkoff.edu.backend.enums;

/** Роли(права) пользователей. */
public enum UserRole {
  ADMIN("Администратор"),
  MENTEE("Ученик"),
  MENTOR("Ментор");

  private final String name;

  UserRole(String name) {
    this.name = name;
  }

  public String getStringUserRole() {
    return name;
  }
}
