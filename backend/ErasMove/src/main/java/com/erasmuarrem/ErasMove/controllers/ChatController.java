package com.erasmuarrem.ErasMove.controllers;

import com.erasmuarrem.ErasMove.models.Chat;
import com.erasmuarrem.ErasMove.models.Message;
import com.erasmuarrem.ErasMove.services.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;
    @Autowired
    public ChatController( ChatService chatService ) {
        this.chatService = chatService;
    }

    @PostMapping("/add")
    public void addChat(@RequestBody Chat chat ) {
        chatService.addChat(chat);
    }

    @GetMapping("/{id}")
    public Chat getChatById( @PathVariable("id") Long chatId ) {
        return chatService.getChatById(chatId);
    }

    @GetMapping()
    public List<Chat> getAllChats() {
        return chatService.getAllChats();
    }

    @GetMapping("/user/{id}")
    public List<Chat> getChatsOfAUser(  @PathVariable("id") Long id ) {
        return chatService.getAllChatsOfAUser(id);
    }
    @GetMapping("/user1/{id1}/user2/{id2}")
    public Chat getChatByUserIds( @PathVariable("id1") Long id1 , @PathVariable("id2") Long id2 ) {
        return chatService.getChatByUserIds(id1,id2);
    }

    @GetMapping("/{id}/messages")
    public List<Message> getAllMessagesInAChat( @PathVariable("id") Long id ) {
        return chatService.getAllMessagesInAChat(id);
    }

    @GetMapping("{chatid}/user/{userid}")
    public List<Message> getMessagesOfAUserInAChat( @PathVariable("chatid") Long chatid , @PathVariable("userid") Long userid ) {
        return chatService.getMessagesOfAUserInAChat(chatid,userid);
    }

    @MessageMapping("send/sender/{senderid}/receiver/{receiverid}")
    public void sendMessage( @RequestBody Message message, @PathVariable("senderid") Long senderId, @PathVariable("receiverid") Long receiverId ) {
        chatService.sendMessage(message,senderId,receiverId);
    }
}
