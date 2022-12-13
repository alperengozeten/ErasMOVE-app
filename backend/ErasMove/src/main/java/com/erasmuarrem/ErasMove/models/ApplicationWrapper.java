package com.erasmuarrem.ErasMove.models;

import lombok.Data;

import java.util.List;

@Data

public class ApplicationWrapper {
    private double cgpa;
    private String firstName;
    private String lastName;
    private String selectedSemester;
    private Long studentId;
    private double totalPoint;
    private List<Long> selectedUniversityIds;

}
