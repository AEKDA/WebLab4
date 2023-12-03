package itmo.web.lab4.util;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

@Component
public class Jwt {

    @Value("${jwt.token.secret}")
    private String jwtSecret;

    public String generateToken(Long id) {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        Date now = new Date();
        Date expiration = new Date(now.getTime() + 86400000); // 24 часа

        return Jwts.builder()
                .setSubject(Long.toString(id))
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(key)
                .compact();
    }

    public Long checkToken(String token) {
        Key key = Keys.hmacShaKeyFor(jwtSecret.getBytes());
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();

            if (claims.getExpiration().before(new Date())) {
                return -1L;
            }

            return Long.parseLong(claims.getSubject());
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return -1L;
        }
    }

}
