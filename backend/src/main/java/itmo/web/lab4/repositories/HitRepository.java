package itmo.web.lab4.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import itmo.web.lab4.entities.Hit;

public interface HitRepository extends JpaRepository<Hit, Long> {
    void deleteByUserId(Long userId);

    List<Hit> findAllByUserId(Long userId);
}