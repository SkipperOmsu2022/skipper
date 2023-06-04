package ru.tinkoff.edu.backend.controllers;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
@Hidden
@CrossOrigin
public class HomeController {
  @GetMapping("/")
  public String home() {
    return "/index.html";
  }
}
