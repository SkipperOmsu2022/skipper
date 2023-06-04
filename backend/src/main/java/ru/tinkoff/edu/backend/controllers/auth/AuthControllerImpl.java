package ru.tinkoff.edu.backend.controllers.auth;

import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import ru.tinkoff.edu.backend.dto.UserLoginDTO;
import ru.tinkoff.edu.backend.dto.UserRegDTO;
import ru.tinkoff.edu.backend.services.UserService;

import javax.servlet.http.HttpServletRequest;

@Log4j2
public class AuthControllerImpl implements AuthController {
  private final UserService userService;

  public AuthControllerImpl(UserService userService) {
    this.userService = userService;
  }

  @Override
  public ResponseEntity<Void> registration(UserRegDTO user, HttpServletRequest httpServletRequest) {
    log.info("remote address:" + httpServletRequest.getRemoteAddr());

    String id = userService.create(user).getId().toString();
    return ResponseEntity.status(HttpStatus.CREATED).header("Location", id).build();
  }

  @Override
  public ResponseEntity<Void> login(UserLoginDTO user, HttpServletRequest httpServletRequest) {
    // можно узнать ip отправителя
    log.info("remote host:" + httpServletRequest.getRemoteHost());
    log.info("remote address:" + httpServletRequest.getRemoteAddr());
    log.info("remote user:" + httpServletRequest.getRemoteUser());
    log.info("request url:" + httpServletRequest.getRequestURL());
    log.info("remote port:" + httpServletRequest.getRemotePort());

    String id = userService.readByUserLoginDTO(user).getId().toString();
    return ResponseEntity.ok().header("Location", id).build();
  }
}
