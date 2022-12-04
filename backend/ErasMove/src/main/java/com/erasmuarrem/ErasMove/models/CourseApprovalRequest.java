package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@MappedSuperclass
public class CourseApprovalRequest extends Request {

    private String description;
    private String feedback;
}
