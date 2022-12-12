package com.erasmuarrem.ErasMove.repositories;

import com.erasmuarrem.ErasMove.models.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
     Optional<Chat> findChatByUser1_IDAndUser2_ID( Long User1ID, Long User2ID);
     List<Chat> findChatsByUser1_ID(Long id);

}
