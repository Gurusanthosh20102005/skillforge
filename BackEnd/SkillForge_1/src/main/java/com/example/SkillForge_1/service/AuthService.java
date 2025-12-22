package com.example.SkillForge_1.service;

import com.example.SkillForge_1.dto.RegisterRequest;
import com.example.SkillForge_1.dto.RegisterResponse;
import com.example.SkillForge_1.model.UserAuthentication;
import com.example.SkillForge_1.repository.UserAuthenticationRepository;
import com.example.SkillForge_1.security.JwtService;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final UserAuthenticationRepository userAuthRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public AuthService(UserAuthenticationRepository userAuthRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userAuthRepository = userAuthRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public RegisterResponse register(RegisterRequest request) {
        // Create user entity
        UserAuthentication user = new UserAuthentication();
        user.setName(request.getName());
        user.setAge(request.getAge());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole());

        // Save to database
        userAuthRepository.save(user);

        // Convert to UserDetails for JWT
        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole()) // make sure role is correct
                .build();

        // Generate JWT token
        String token = jwtService.generateToken(userDetails);

        // Return response
        return new RegisterResponse(
                token,
                user.getName(),
                user.getAge(),
                user.getEmail(),
                user.getRole()
        );
    }

    public RegisterResponse login(String email, String password) throws Exception {
        Optional<UserAuthentication> optionalUser = userAuthRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new Exception("User not found with email: " + email);
        }

        UserAuthentication user = optionalUser.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Incorrect password");
        }

        // Convert to UserDetails for JWT
        UserDetails userDetails = User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(user.getRole())
                .build();

        String token = jwtService.generateToken(userDetails);

        return new RegisterResponse(
                token,
                user.getName(),
                user.getAge(),
                user.getEmail(),
                user.getRole()
        );
    }
}
