package ru.tinkoff.edu.backend.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


@Controller
public class ErrorController implements org.springframework.boot.web.servlet.error.ErrorController {
    /**
     * Переадресация на главную страницу. Необходимо для React Rooter.
     * Браузер не знает о том, что его перенаправили. Страница не вызывается на сервере, а рендерится прямо в барузере.
     * Контейнер сервлета перенаправляет запрос на тот же адрес, откуда и был вызван.
     * @return index.html
     */
    @RequestMapping("/error")
    public String handleError() {
        return "forward:/index.html";
    }
}
