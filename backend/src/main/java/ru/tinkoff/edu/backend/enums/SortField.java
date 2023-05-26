package ru.tinkoff.edu.backend.enums;

/**
 * Сортировка на главной странице.
 */
public enum SortField {
    DEFAULT("u.id ASC"),
    RATING("AVG(uf.rating) DESC NULLS LAST");

    private final String nameSortField;
    SortField(String nameSortField) {
        this.nameSortField = nameSortField;
    }

    public String getString() {
        return nameSortField;
    }
}
