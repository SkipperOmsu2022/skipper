package ru.tinkoff.edu.backend.controllers;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;


@Controller
public class ErrorControllerImpl implements ErrorController {
    /**
     * Переадресация на главную страницу. Необходимо для React Rooter.
     * Браузер не знает о том, что его перенаправили. Страница не вызывается на сервере, а рендерится прямо в барузере.
     * Контейнер сервлета перенаправляет запрос на тот же адрес, откуда и был вызван.
     * @return index.html
     */
    @ResponseStatus(HttpStatus.OK)
    @RequestMapping("/error")
    public String handleError() {
        return "forward:/index.html";
    }
}
