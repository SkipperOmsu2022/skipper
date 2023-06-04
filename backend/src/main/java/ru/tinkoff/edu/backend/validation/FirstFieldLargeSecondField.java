package ru.tinkoff.edu.backend.validation;

import ru.tinkoff.edu.backend.exception.CustomValidatorException;

import javax.validation.Constraint;
import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;
import javax.validation.Payload;
import javax.validation.constraints.NotBlank;
import java.lang.annotation.Documented;
import java.lang.annotation.Repeatable;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;
import java.lang.reflect.Field;

import static java.lang.annotation.ElementType.TYPE;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Documented
@Target({TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = FirstFieldLargeSecondFieldValidator.class)
@Repeatable(FirstFieldLargeSecondField.List.class)
public @interface FirstFieldLargeSecondField {
  String message() default "";

  @NotBlank(message = "First field is required!")
  String firstField();

  @NotBlank(message = "Second field is required!")
  String secondField();

  Class<?>[] groups() default {};

  Class<? extends Payload>[] payload() default {};

  @Target({TYPE})
  @Retention(RUNTIME)
  @Documented
  @interface List {
    FirstFieldLargeSecondField[] value();
  }
}

class FirstFieldLargeSecondFieldValidator
    implements ConstraintValidator<FirstFieldLargeSecondField, Object> {
  private String firstField;
  private String secondField;

  @Override
  public void initialize(FirstFieldLargeSecondField constraintAnnotation) {
    ConstraintValidator.super.initialize(constraintAnnotation);
    firstField = constraintAnnotation.firstField();
    secondField = constraintAnnotation.secondField();
  }

  @Override
  public boolean isValid(Object object, ConstraintValidatorContext context) {
    if (object == null) {
      return true;
    }
    Number firstFiledValue = (Number) getFieldValue(object, firstField);
    Number secondFiledValue = (Number) getFieldValue(object, secondField);

    if (firstFiledValue == null || secondFiledValue == null) {
      return true;
    }

    return firstFiledValue.longValue() > secondFiledValue.longValue();
  }

  private static Object getFieldValue(Object object, String fieldName) {
    try {
      Field field = object.getClass().getDeclaredField(fieldName);
      field.setAccessible(true);
      return field.get(object);
    } catch (ReflectiveOperationException e) {
      e.printStackTrace();
      throw new CustomValidatorException(e.getMessage());
    }
  }
}
