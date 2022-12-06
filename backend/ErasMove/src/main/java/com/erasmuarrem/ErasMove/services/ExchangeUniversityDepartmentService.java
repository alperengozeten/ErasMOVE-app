package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.ExchangeUniversityDepartment;
import com.erasmuarrem.ErasMove.repositories.ExchangeUniversityDepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ExchangeUniversityDepartmentService {

    private final ExchangeUniversityDepartmentRepository exchangeUniversityDepartmentRepository;

    @Autowired
    public ExchangeUniversityDepartmentService(ExchangeUniversityDepartmentRepository exchangeUniversityDepartmentRepository) {
        this.exchangeUniversityDepartmentRepository = exchangeUniversityDepartmentRepository;
    }

    public List<ExchangeUniversityDepartment> getExchangeUniversityDepartments() {
        return exchangeUniversityDepartmentRepository.findAll();
    }

    public ExchangeUniversityDepartment getExchangeUniversityDepartmentByID(Long id) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        return exchangeUniversityDepartmentOptional.get();
    }

    public void addExchangeUniversityDepartment(ExchangeUniversityDepartment exchangeUniversityDepartment) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findByExchangeUniversityIDAndDepartmentName(exchangeUniversityDepartment.getExchangeUniversity().getID(),
                        exchangeUniversityDepartment.getDepartmentName());

        if ( exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Department with name:" + exchangeUniversityDepartment.getDepartmentName() +
                    " alredy exists in university with id:" + exchangeUniversityDepartment.getExchangeUniversity().getID());
        }

        exchangeUniversityDepartmentRepository.save(exchangeUniversityDepartment);
    }

    public void deleteExchangeUniversityDepartmentByID(Long id) {
        Optional<ExchangeUniversityDepartment> exchangeUniversityDepartmentOptional = exchangeUniversityDepartmentRepository
                .findById(id);

        if ( !exchangeUniversityDepartmentOptional.isPresent() ) {
            throw new IllegalStateException("Exchange University Department with id:" + id + " doesn't exist!");
        }

        exchangeUniversityDepartmentRepository.deleteById(id);
    }
}
