package com.example.SkillForge_1.security;

import com.example.SkillForge_1.model.UserAuthentication;
import com.example.SkillForge_1.repository.UserAuthenticationRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class MyUserDetailsService implements UserDetailsService {

    private final UserAuthenticationRepository userRepository;

    public MyUserDetailsService(UserAuthenticationRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserAuthentication user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + email));

        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                Collections.emptyList() // no roles yet
        );
    }
}
