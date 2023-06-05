package ru.tinkoff.edu.backend.logger;

import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

/**
 * Aspect — модуль в котором собраны описания Pointcut и Advice.<br>
 * <img src="https://hsto.org/r/w1560/webt/wh/bo/5d/whbo5d_vyupqimqrjalrvsx0y50.png">
 */
@Slf4j
@Aspect
@Component
public class LoggingAspect {
  /**
   * Срез/запрос точек присоединения. Некая область с несколькими joinPoint. Может быть одна или
   * несколько точек/срезов в одном Pointcut. Правила можно объединять через &&, ||,!
   */
  @Pointcut(value = "execution(* ru.tinkoff.edu.backend.*.*.*(..))")
  public void pointcut() {}

  /**
   * Виды Advice:<br>
   * -Before - перед вызовом метода.<br>
   * -After — после вызова метода.<br>
   * -After returning — после возврата значения из функции.<br>
   * -After throwing — в случае exception.<br>
   * -After finally — в случае выполнения блока finally.<br>
   * -Around — можно сделать пред., пост., обработку перед вызовом метода, а также вообще обойти
   * вызов метода.<br>
   * <b>На один Pointcut можно «повесить» несколько Advice разного типа.</b>
   *
   * @param joinPoint точка наблюдения, точка присоединения к коду, где планируется введение
   *     функциональности.
   */
  @Before("pointcut()")
  public void beforeMethod(JoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().getName();
    List<String> args = getArgs(joinPoint);
    log.info("Method={} args={} started", methodName, args);
  }

  @AfterReturning("pointcut()")
  public void afterMethod(JoinPoint joinPoint) {
    String methodName = joinPoint.getSignature().getName();
    List<String> args = getArgs(joinPoint);
    log.info("Method={} args={} finished", methodName, args);
  }

  @AfterThrowing(value = "pointcut()", throwing = "e")
  public void afterException(JoinPoint joinPoint, Throwable e) {
    String methodName = joinPoint.getSignature().getName();
    List<String> args = getArgs(joinPoint);
    log.error("ERROR!!! Failed to method={} args={} error={}", methodName, args, e);
  }

  /** Возвращает список всех аргументов метода. */
  private List<String> getArgs(JoinPoint joinPoint) {
    List<String> args = new ArrayList<>();
    for (int i = 0; i < joinPoint.getArgs().length; i++) {
      Object argValue = joinPoint.getArgs()[i];
      args.add("arg.".concat(String.valueOf(i)).concat("= ").concat(String.valueOf(argValue)));
    }
    return args;
  }
}
