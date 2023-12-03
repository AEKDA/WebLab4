package itmo.web.lab4.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import itmo.web.lab4.entities.Hit;
import itmo.web.lab4.entities.User;
import itmo.web.lab4.services.HitService;
import itmo.web.lab4.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/api")
public class HitController {

    private HitService hitService = null;
    private UserService userService = null;

    @Autowired
    public HitController(HitService service, UserService userService) {
        hitService = service;
        this.userService = userService;
    }

    @GetMapping("/hit")
    public List<Hit> getHits(HttpServletRequest request, HttpServletResponse response) {

        String authorizationHeader = ((HttpServletRequest) request).getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        String token = authorizationHeader.split(" ")[1];

        Long id = -1l;
        try {
            id = userService.login(token);
            if (id == -1) {

                response.getWriter().write("Unauthorized");
                ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        Long userId = id;
        return hitService.getHitsData(userId).stream()
                .sorted((o1, o2) -> Long.compare(o2.getDate(), o1.getDate())).toList();
    }

    @PostMapping("/hit")
    public Hit checkHit(@Validated @RequestBody Hit hit, HttpServletRequest request, HttpServletResponse response) {

        String authorizationHeader = ((HttpServletRequest) request).getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return null;
        }

        String token = authorizationHeader.split(" ")[1];

        Long id = -1l;
        try {
            id = userService.login(token);

            if (id == -1l) {
                response.getWriter().write("Unauthorized");
                ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        Long userId = id;
        if (userId == null) {
            System.err.println("user");
            return null;
        }

        long currentDateTime = System.currentTimeMillis() / 1000L;
        long currentTime = System.nanoTime();
        hit.setDate(currentDateTime);
        hit.setHit(hitService.checkHit(hit));
        hit.setExecutionTime(System.nanoTime() - currentTime);

        User user = new User();
        user.setId(userId);

        hit.setUser(user);
        hitService.saveHit(hit);

        return hit;
    }

    @DeleteMapping("/hit")
    public void clear(HttpServletRequest request, HttpServletResponse response) {

        String authorizationHeader = ((HttpServletRequest) request).getHeader("Authorization");

        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String token = authorizationHeader.split(" ")[1];

        Long id = -1l;
        try {
            id = userService.login(token);
            if (id == -1) {

                response.getWriter().write("Unauthorized");
                ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
            ((HttpServletResponse) response).setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        }

        Long userId = id;
        System.err.println("clear");
        hitService.clear(userId);
    }

}
