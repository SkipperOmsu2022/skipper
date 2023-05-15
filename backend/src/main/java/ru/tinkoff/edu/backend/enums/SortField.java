package ru.tinkoff.edu.backend.enums;

/**
 * Сортировка на главной странице.
 */
public enum SortField {
    DEFAULT("u.id ASC"),
    RATING("COALESCE(AVG(uf.rating), 0.0) DESC");

    private final String nameSortField;
    SortField(String nameSortField) {
        this.nameSortField = nameSortField;
    }

    public String getString() {
        return nameSortField;
    }
}
