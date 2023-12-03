package itmo.web.lab4.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import itmo.web.lab4.entities.Hit;
import itmo.web.lab4.repositories.HitRepository;

@Service
public class HitService {

    private final HitRepository hitRepository;

    @Autowired
    public HitService(HitRepository hitRepository) {
        this.hitRepository = hitRepository;
    }

    public List<Hit> getHitsData(Long userId) {
        return hitRepository.findAllByUserId(userId);
    }

    public void saveHit(Hit h) {
        hitRepository.save(h);
    }

    @Transactional
    public void clear(Long id) {
        hitRepository.deleteByUserId(id);
    }

    public boolean checkHit(Hit h) {
        return isHitCircle(h.getX(), h.getY(), h.getR()) || isHitRectangle(h.getX(), h.getY(), h.getR())
                || isHitTriangle(h.getX(), h.getY(), h.getR());
    }

    private boolean isHitCircle(double x, double y, double r) {
        return x <= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r / 2, 2));
    }

    private boolean isHitRectangle(double x, double y, double r) {
        return x >= 0 && x <= r / 2 && y >= 0 && y <= r;
    }

    private boolean isHitTriangle(double x, double y, double r) {
        return x >= -r && y <= r && y <= x + r && x <= 0 && y >= 0;
    }

}
