package ru.tinkoff.edu.backend.enums;

/** Пол пользователя. */
public enum UserGender {
  MALE("Мужской"),
  FEMALE("Женский");

  private final String gender;

  UserGender(String gender) {
    this.gender = gender;
  }

  public String getStringUserGender() {
    return gender;
  }
}
