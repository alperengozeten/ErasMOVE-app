package com.erasmuarrem.ErasMove.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@MappedSuperclass
@Getter
@Setter
@NoArgsConstructor
public class ReplacementRequest extends Request {

    @OneToOne
    private DepartmentCoordinator departmentCoordinator;
}
