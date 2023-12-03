package itmo.web.lab4.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import itmo.web.lab4.entities.User;
import itmo.web.lab4.services.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private UserService authService = null;

    @Autowired
    public AuthController(UserService service) {
        authService = service;
    }

    @PostMapping("/login")
    public ResponseEntity<TokenResponse> registration(@Validated @RequestBody User user) {
        String token = authService.registration(user);

        TokenResponse tokenResponse = new TokenResponse(token);

        return ResponseEntity.ok().body(tokenResponse);
    }

    // Дополнительный класс для представления токена в JSON
    public static class TokenResponse {
        private String token;

        public TokenResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }
}
