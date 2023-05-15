package ru.tinkoff.edu.backend.enums;

/**
 * Сортировка на главной странице.
 */
public enum SortField {
    DEFAULT("id"),
    RATING("rating");

    private final String nameSortField;
    SortField(String nameSortField) {
        this.nameSortField = nameSortField;
    }

    public String getNameField() {
        return nameSortField;
    }
}
