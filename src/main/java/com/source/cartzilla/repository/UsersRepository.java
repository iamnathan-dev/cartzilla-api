package com.source.cartzilla.repository;

import com.source.cartzilla.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersRepository extends JpaRepository<Users, Long> {
}
