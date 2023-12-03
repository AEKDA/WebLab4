package itmo.web.lab4.services;

import java.util.Optional;

import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;

import itmo.web.lab4.entities.User;
import itmo.web.lab4.repositories.UserRepository;
import itmo.web.lab4.util.Jwt;

@Service
public class UserService {

    private final UserRepository userRepository;
    private Jwt jwtUtil;

    @Autowired
    public UserService(UserRepository userRepository, Jwt jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String registration(User user) throws HttpClientErrorException {
        User existingUser = userRepository.findByLogin(user.getLogin());

        String token;

        if (existingUser == null) {

            String salt = BCrypt.gensalt();

            String hashedPasswd = BCrypt.hashpw(user.getPasswd(), salt);
            System.out.println(hashedPasswd);

            user.setPasswd(hashedPasswd);

            Long id = userRepository.save(user).getId();

            token = jwtUtil.generateToken(id);

        } else {
            if (BCrypt.checkpw(user.getPasswd(), existingUser.getPasswd())) {
                token = jwtUtil.generateToken(existingUser.getId());
            } else {
                throw new HttpClientErrorException(HttpStatus.BAD_REQUEST, "wrong data");
            }
        }

        return token;
    }

    public Long login(String token) {
        Long id = jwtUtil.checkToken(token);
        if (id != -1l) {
            return id;
        }
        return -1l;
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

}
