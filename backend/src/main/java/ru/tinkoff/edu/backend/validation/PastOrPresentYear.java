package ru.tinkoff.edu.backend.validation;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.time.Year;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;


@Documented
@Target({FIELD})
@Retention(RUNTIME)
@Constraint(validatedBy = YearStartConstraintValidator.class)
public @interface PastOrPresentYear {
    String message() default "The beginning cannot be in the future time!";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}

class YearStartConstraintValidator implements ConstraintValidator<PastOrPresentYear, Integer> {

    @Override
    public void initialize(PastOrPresentYear constraintAnnotation) {
        ConstraintValidator.super.initialize(constraintAnnotation);
    }

    @Override
    public boolean isValid(Integer value, ConstraintValidatorContext context) {
        if(value == null) {
            return true;
        }
        return value <= Year.now().getValue();
    }
}
