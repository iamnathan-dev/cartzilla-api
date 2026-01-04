import org.springframework.stereotype.Component;

import java.security.Key;

@Component
public class JwtUtil {
    private Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512); // Use a strong secret in production
    private long expiry = 3600000; // 1 hour

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiry))
                .signWith(key)
                .compact();
    }

    public Claims extractClaims(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, String username) {
        return (username.equals(extractUsername(token)) && !extractClaims(token).getExpiration().before(new Date()));
    }
}