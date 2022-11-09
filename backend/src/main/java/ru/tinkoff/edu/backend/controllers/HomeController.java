package ru.tinkoff.edu.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {
    @GetMapping("/")
    public String home() {
        return "Home Page";
    }

    @GetMapping("/info")
    public ResponseEntity<?> sec() {
        return ResponseEntity.ok().body("Authentication");
    }
}
