package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TokenRepository extends JpaRepository<Token, Long> {
}
