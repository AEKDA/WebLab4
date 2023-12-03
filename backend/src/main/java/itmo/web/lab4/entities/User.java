package itmo.web.lab4.entities;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String login;

    private String passwd;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)

    private List<Hit> hits;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public List<Hit> getHits() {
        return hits;
    }

    // Сеттер
    public void setHits(List<Hit> hits) {
        this.hits = hits;
    }

    public User() {
    }

    public User(String login, String passwd, List<Hit> data) {
        this.login = login;
        this.passwd = passwd;
        this.hits = data;
    }
}