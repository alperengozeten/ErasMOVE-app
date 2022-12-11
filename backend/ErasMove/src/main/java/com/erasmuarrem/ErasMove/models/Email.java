package com.erasmuarrem.ErasMove.models;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Email {
    public static final String sender = "erasmove.help";
    private String recipient;
    private String mail;
    private String subject;

    private static List<String> activationCodes = new ArrayList<>();
    private static List<ApplicationUser> users = new ArrayList<>();

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

    public void addActivationCode( String activationCode ) {
        activationCodes.add(activationCode);
    }
    public void addUserGotCode( ApplicationUser user ) {
        users.add(user);
    }
}