package ru.tinkoff.edu.backend.enums;

import java.util.Arrays;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

public enum MentorSpecialization {
    PROGRAMMING("Программирование"),
    TESTING_SOFTWARE("Тестирование ПО"),
    DEV_OPS("DevOps"),
    BUSINESS_ANALYTICS("Бизнес-аналитика"),
    ADMINISTRATION_SOFTWARE("Администрирование"),
    ACCOUNTING("Бухгалтерский учёт"),
    STOCK_MARKET("Фондовый рынок"),
    JOURNALISTIC_ACTIVITY("Журналистская деятельность"),
    JURISPRUDENCE("Юриспруденция"),
    SCHOOL_EDUCATION("Школьное образование");
    private final String designation;
    MentorSpecialization(String designation) {
        this.designation = designation;
    }

    public String getStringMentorSpecialization() {
        return designation;
    }

    public static Map<MentorSpecialization, String> getMapMentorSpecialization() {
        return Arrays.stream(MentorSpecialization.values())
                .collect(Collectors.toMap(Function.identity(), MentorSpecialization::getStringMentorSpecialization));
    }
}
