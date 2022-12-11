package com.erasmuarrem.ErasMove.models;

import lombok.*;

import java.util.HashMap;
import java.util.Random;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Email {
    public static final String sender = "erasmove.help";
    private String recipient;
    private String mail;
    private String subject;

    public static HashMap<Long, String> activationCodes = new HashMap<>();

    public String generateActivationCode() {
        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@.-*!";
        StringBuilder salt = new StringBuilder();
        Random rnd = new Random();
        while (salt.length() < 6) { // length of the  activation code.
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            salt.append(SALTCHARS.charAt(index));
        }
        return salt.toString();
    }

    public void addActivationCode( String activationCode, Long userId ) {
        activationCodes.put(userId,activationCode);
    }
}