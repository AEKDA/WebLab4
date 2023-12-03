package itmo.web.lab4.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import itmo.web.lab4.entities.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByLogin(String login);
}