package com.erasmuarrem.ErasMove.services;

 import com.erasmuarrem.ErasMove.models.ApplicationUser;
import com.erasmuarrem.ErasMove.models.Chat;
 import com.erasmuarrem.ErasMove.models.Message;
 import com.erasmuarrem.ErasMove.repositories.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

 import java.time.LocalDateTime;
 import java.util.ArrayList;
 import java.util.List;
 import java.util.Objects;
 import java.util.Optional;

@Service
public class ChatService {
    private final ChatRepository chatRepository;
    private final UserManagementService userManagementService;

    @Autowired
    public ChatService(ChatRepository chatRepository, UserManagementService userManagementService) {
        this.chatRepository = chatRepository;
        this.userManagementService = userManagementService;
    }

    public void addChat(Chat chat) {
        Long user1Id = chat.getUser1().getID();
        Long user2Id = chat.getUser2().getID();
        //So that if one of the users doesn't exist, program will throw an error.
        ApplicationUser user1 = userManagementService.getUserById(user1Id);
        ApplicationUser user2 = userManagementService.getUserById(user2Id);

        //If both user exist
        if (chatRepository.findChatByUser1_IDAndUser2_ID(user1Id, user2Id).isPresent()) {
            throw new IllegalStateException("There is already a chat between users" + user1.getName() + " and " + user2.getName());
        } else if (chatRepository.findChatByUser1_IDAndUser2_ID(user2Id, user1Id).isPresent()) {
            throw new IllegalStateException("There is already a chat between users" + user1.getName() + " and " + user2.getName());
        } else {
            chatRepository.save(chat);
        }
    }

    public Chat getChatById(Long chatId) {
        Optional<Chat> chatOptional = chatRepository.findById(chatId);
        if (chatOptional.isPresent()) {
            return chatOptional.get();
        } else {
            throw new IllegalStateException("Chat with id " + chatId + "doesn't exist!");
        }
    }

    public List<Chat> getAllChats() {
        return chatRepository.findAll();
    }

    public List<Chat> getAllChatsOfAUser(Long userId) {
        return chatRepository.findChatsByUser1_ID(userId);
    }

    public Chat getChatByUserIds(Long user1Id, Long user2Id) {
        if (chatRepository.findChatByUser1_IDAndUser2_ID(user1Id, user2Id).isPresent()) {
            return chatRepository.findChatByUser1_IDAndUser2_ID(user1Id, user2Id).get();
        } else if (chatRepository.findChatByUser1_IDAndUser2_ID(user2Id, user1Id).isPresent()) {
            return chatRepository.findChatByUser1_IDAndUser2_ID(user2Id, user1Id).get();
        } else {
            throw new IllegalStateException("Such a chat doesn't exist.");
        }
    }

    public List<Message> getAllMessagesInAChat(Long chatId) {
        Chat currChat = getChatById(chatId);
        List<Message> out = new ArrayList<>();
        out.addAll(currChat.getUser1Msgs());
        out.addAll(currChat.getUser2Msgs());
        return out;
    }

    public List<Message> getMessagesOfAUserInAChat(Long chatId, Long userId) {

        Chat currChat = getChatById(chatId);

        if (Objects.equals(currChat.getUser1().getID(), userId)) {
            return currChat.getUser1Msgs();
        } else if (Objects.equals(currChat.getUser2().getID(), userId)) {
            return currChat.getUser2Msgs();
        } else {
            throw new IllegalStateException("This user doesn't exist in the chat with id " + chatId);
        }
    }

    public void sendMessage( String message, Long senderId, Long receiverId ) {
        Chat chat = getChatByUserIds(senderId, receiverId);
        Message message1 = new Message();
        message1.setMessage(message);
        message1.setLocalDateTime(LocalDateTime.now());
        if (Objects.equals(chat.getUser1().getID(), senderId)) {
             chat.getUser1Msgs().add(message1);
             chatRepository.save(chat);
        } else if (Objects.equals(chat.getUser2().getID(), senderId)) {
             chat.getUser2Msgs().add(message1);
            chatRepository.save(chat);
        }
    }
}
