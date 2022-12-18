package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.*;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProposalService {

    private final ApplicationRepository applicationRepository;
    private final DepartmentRepository departmentRepository;
    private final DepartmentCoordinatorService departmentCoordinatorService;
    private final ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository;
    private final ErasmusReplacementRequestRepository erasmusReplacementRequestRepository;
    private final ErasmusReplacementRequestService erasmusReplacementRequestService;
    private final ExchangeReplacementRequestRepository exchangeReplacementRequestRepository;
    private final ExchangeUniversityService exchangeUniversityService;
    private final ExchangeReplacementRequestService exchangeReplacementRequestService;

    public ProposalService(ApplicationRepository applicationRepository, DepartmentRepository departmentRepository, DepartmentCoordinatorService departmentCoordinatorService, ErasmusUniversityDepartmentRepository erasmusUniversityDepartmentRepository, ErasmusReplacementRequestRepository erasmusReplacementRequestRepository, ErasmusReplacementRequestService erasmusReplacementRequestService, ExchangeReplacementRequestRepository exchangeReplacementRequestRepository, ExchangeUniversityService exchangeUniversityService, ExchangeReplacementRequestService exchangeReplacementRequestService) {
        this.applicationRepository = applicationRepository;
        this.departmentRepository = departmentRepository;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.erasmusUniversityDepartmentRepository = erasmusUniversityDepartmentRepository;
        this.erasmusReplacementRequestRepository = erasmusReplacementRequestRepository;
        this.erasmusReplacementRequestService = erasmusReplacementRequestService;
        this.exchangeReplacementRequestRepository = exchangeReplacementRequestRepository;
        this.exchangeUniversityService = exchangeUniversityService;
        this.exchangeReplacementRequestService = exchangeReplacementRequestService;
    }

    @Transactional
    public String makeErasmusProposalsToDepartmentCoordinator(Long departmentID) {

        Optional<Department> departmentOptional = departmentRepository.findById(departmentID);

        if ( !departmentOptional.isPresent() ) {
            return "Department with id:" + departmentID + " doesn't exist!";
        }

        Department department = departmentOptional.get();
        DepartmentCoordinator departmentCoordinator = departmentCoordinatorService
                .getDepartmentCoordinatorByDepartmentId(departmentID);

        List<ErasmusUniversityDepartment> erasmusUniversityDepartmentList = erasmusUniversityDepartmentRepository
                .findByDepartmentName(department.getDepartmentName());
        List<Application> erasmusApplicationList = applicationRepository.findByOutgoingStudent_IsErasmusAndOutgoingStudent_Department_ID(
                true, departmentID
        );

        erasmusReplacementRequestRepository.deleteAllByStatusAndDepartmentCoordinator_ID(
                "PROPOSAL", departmentCoordinator.getID()
        );

        for (ErasmusUniversityDepartment erasmusUniversityDepartment : erasmusUniversityDepartmentList) {
            if ( erasmusUniversityDepartment.getQuota() > 0 ) {

                ErasmusUniversity erasmusUniversity = erasmusUniversityDepartment.getErasmusUniversity();
                double maxScore = -1;
                double maxNonSelectedScore = -1;
                Application maxApplication = null;
                Application maxNonSelectedApplication = null;

                for (Application application : erasmusApplicationList) {
                    // check if the student already has a waiting proposal??
                    Optional<ErasmusReplacementRequest> erasmusReplacementRequestOptional = erasmusReplacementRequestRepository.findByStatusAndStudent_ID(
                            "WAITING", application.getOutgoingStudent().getID()
                    );
                    if ( erasmusReplacementRequestOptional.isPresent() ) {
                        continue;
                    }
                    if ( application.getAdmittedStatus().equalsIgnoreCase("NOT ADMITTED") ) {
                        if ( application.getSelectedUniversities().contains(erasmusUniversity) ) {
                            if ( maxScore < application.getApplicationScore() ) {
                                maxScore = application.getApplicationScore();
                                maxApplication = application;
                            }
                        }
                        else if ( maxApplication == null ) {
                            if ( maxNonSelectedScore < application.getApplicationScore() ) {
                                maxNonSelectedScore = application.getApplicationScore();
                                maxNonSelectedApplication = application;
                            }
                        }
                    }
                }

                // send proposal to department coordinator
                if ( maxApplication == null ) {
                    maxApplication = maxNonSelectedApplication;
                }

                if ( maxApplication != null ) {
                    ErasmusReplacementRequest newReplacementRequest = new ErasmusReplacementRequest();
                    newReplacementRequest.setStudent(maxApplication.getOutgoingStudent());
                    newReplacementRequest.setErasmusUniversity(erasmusUniversity);
                    newReplacementRequest.setInfo("Replacement Request for the university: " + erasmusUniversity.getUniversityName());
                    erasmusReplacementRequestService.proposeErasmusReplacementRequest(newReplacementRequest);
                }
            }
        }

        return "Successfully created the proposals!";
    }

    @Transactional
    public String makeExchangeProposalsToDepartmentCoordinators() {

        List<Application> exchangeApplicationList = applicationRepository.findByOutgoingStudent_IsErasmus(false);

        exchangeReplacementRequestRepository.deleteAllByStatus("PROPOSAL");
        List<ExchangeUniversity> exchangeUniversityList = exchangeUniversityService
                .getExchangeUniversitiesWithNonEmptyQuota();

        for (ExchangeUniversity exchangeUniversity : exchangeUniversityList) {
            double maxScore = -1;
            double maxNonSelectedScore = -1;
            Application maxApplication = null;
            Application maxNonSelectedApplication = null;

            for (Application application : exchangeApplicationList) {
                // check if the student already has a waiting proposal??
                Optional<ExchangeReplacementRequest> exchangeReplacementRequestOptional = exchangeReplacementRequestRepository.findByStatusAndStudent_ID(
                        "WAITING", application.getOutgoingStudent().getID()
                );
                if ( exchangeReplacementRequestOptional.isPresent() ) {
                    continue;
                }
                if ( application.getAdmittedStatus().equalsIgnoreCase("NOT ADMITTED") ) {
                    if ( application.getSelectedUniversities().contains(exchangeUniversity) ) {
                        if ( maxScore < application.getApplicationScore() ) {
                            maxScore = application.getApplicationScore();
                            maxApplication = application;
                        }
                    }
                    else if ( maxApplication == null ) {
                        if ( maxNonSelectedScore < application.getApplicationScore() ) {
                            maxNonSelectedScore = application.getApplicationScore();
                            maxNonSelectedApplication = application;
                        }
                    }
                }
            }

            // send proposal to department coordinator
            if ( maxApplication == null ) {
                maxApplication = maxNonSelectedApplication;
            }

            if ( maxApplication != null ) {
                ExchangeReplacementRequest newReplacementRequest = new ExchangeReplacementRequest();
                newReplacementRequest.setStudent(maxApplication.getOutgoingStudent());
                newReplacementRequest.setExchangeUniversity(exchangeUniversity);
                newReplacementRequest.setInfo("Replacement Request for the university: " + exchangeUniversity.getUniversityName());
                exchangeReplacementRequestService.proposeExchangeReplacementRequest(newReplacementRequest);
            }
        }

        return "Successfully created the proposals!";
    }
}
