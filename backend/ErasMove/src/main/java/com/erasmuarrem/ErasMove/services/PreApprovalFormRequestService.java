package com.erasmuarrem.ErasMove.services;

import com.erasmuarrem.ErasMove.models.*;
import com.erasmuarrem.ErasMove.repositories.DepartmentCoordinatorRepository;
import com.erasmuarrem.ErasMove.repositories.DepartmentRepository;
import com.erasmuarrem.ErasMove.repositories.OutgoingStudentRepository;
import com.erasmuarrem.ErasMove.repositories.PreApprovalFormRequestRepository;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.*;
import com.itextpdf.layout.property.HorizontalAlignment;
import com.itextpdf.layout.property.UnitValue;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Path;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class PreApprovalFormRequestService {

    private final PreApprovalFormRequestRepository preApprovalFormRequestRepository;
    private final DepartmentCoordinatorRepository departmentCoordinatorRepository;
    private final DepartmentCoordinatorService departmentCoordinatorService;
    private final OutgoingStudentRepository outgoingStudentRepository;
    private final ErasmusUniversityService erasmusUniversityService;
    private final ExchangeUniversityService exchangeUniversityService;
    private final NotificationService notificationService;
    private final ApplicationService applicationService;
    private final DepartmentRepository departmentRepository;
    private final MobilityCourseService mobilityCourseService;

    @Autowired
    public PreApprovalFormRequestService(PreApprovalFormRequestRepository preApprovalFormRequestRepository, DepartmentCoordinatorRepository departmentCoordinatorRepository, DepartmentCoordinatorService departmentCoordinatorService, OutgoingStudentRepository outgoingStudentRepository, ErasmusUniversityService erasmusUniversityService, ExchangeUniversityService exchangeUniversityService, NotificationService notificationService, ApplicationService applicationService, DepartmentRepository departmentRepository, MobilityCourseService mobilityCourseService) {
        this.preApprovalFormRequestRepository = preApprovalFormRequestRepository;
        this.departmentCoordinatorRepository = departmentCoordinatorRepository;
        this.departmentCoordinatorService = departmentCoordinatorService;
        this.outgoingStudentRepository = outgoingStudentRepository;
        this.erasmusUniversityService = erasmusUniversityService;
        this.exchangeUniversityService = exchangeUniversityService;
        this.notificationService = notificationService;
        this.applicationService = applicationService;
        this.departmentRepository = departmentRepository;
        this.mobilityCourseService = mobilityCourseService;
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequests() {
        return preApprovalFormRequestRepository.findAll();
    }

    public PreApprovalFormRequest getPreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        return preApprovalFormRequestOptional.get();
    }

    public ResponseEntity<ResponseMessage> addPreApprovalFormRequest(PreApprovalFormRequest preApprovalFormRequest) {
        Long outgoingStudentID = preApprovalFormRequest.getStudent().getID();

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = outgoingStudentRepository.findById(outgoingStudentID).get();

        DepartmentCoordinator departmentCoordinator = departmentCoordinatorService
                .getDepartmentCoordinatorByDepartmentId(outgoingStudent.getDepartment().getID());

        if ( departmentCoordinator == null ) {
            return new ResponseEntity<>(new ResponseMessage("There is no Department Coordinator for department:" + outgoingStudent.getDepartment().getDepartmentName() + " to respond!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        if ( outgoingStudent.getIsErasmus() ) {
            ErasmusUniversity erasmusUniversity = erasmusUniversityService.getErasmusUniversityByAcceptedStudentID(outgoingStudentID);

            if ( erasmusUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!", (long) -1), HttpStatus.BAD_REQUEST);
            }
        }
        else {
            ExchangeUniversity exchangeUniversity = exchangeUniversityService.getExchangeUniversityByAcceptedStudentID(outgoingStudentID);

            if ( exchangeUniversity == null ) {
                return new ResponseEntity<>(new ResponseMessage("Outgoing Student with id:" + outgoingStudentID + " is not currently admitted!", (long) -1), HttpStatus.BAD_REQUEST);
            }
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);

        // the student shouldn't have a waiting or accepted request
        for (PreApprovalFormRequest approvalFormRequest: preApprovalFormRequests) {
            if ( approvalFormRequest.getStatus().equals("ACCEPTED") ) {
                return new ResponseEntity<>(new ResponseMessage("Student with id:" + outgoingStudentID + " already has an accepted Pre-Approval Form!", (long) -1), HttpStatus.BAD_REQUEST);
            }
            else if ( approvalFormRequest.getStatus().equals("WAITING") ) {
                return new ResponseEntity<>(new ResponseMessage("Student with id:" + outgoingStudentID + " already has a waiting Pre-Approval Form!", (long) -1), HttpStatus.BAD_REQUEST);
            }
        }

        Application application = applicationService.getByOutgoingStudentID(outgoingStudentID);

        if ( application == null ) {
            return new ResponseEntity<>(new ResponseMessage("Student with id:" + outgoingStudentID + " doesn't currently have an application!", (long) -1), HttpStatus.BAD_REQUEST);
        }

        application.setPreApprovalFormStatus("WAITING");

        // send notification to the department coordinator
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(departmentCoordinator);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("A new Pre-Approval Form submitted by the Outgoing Student: " +
                outgoingStudent.getName() + " and waiting for the response!");

        notificationService.saveNotification(newNotification);

        preApprovalFormRequest.setDepartmentCoordinator(departmentCoordinator); // set the department coordinator
        preApprovalFormRequest.setStatus("WAITING"); // set status
        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        System.out.println("id:" + preApprovalFormRequest.getID());

        return new ResponseEntity<>(new ResponseMessage("Pre-Approval Form is submitted!", preApprovalFormRequest.getID()), HttpStatus.OK);
    }

    public void deletePreApprovalFormRequestByID(Long id) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            throw new IllegalStateException("Pre-Approval Form Request with id:" + id + " doesn't exist!");
        }

        mobilityCourseService.deleteMobilityCoursesByPreApprovalFormRequestID(preApprovalFormRequestOptional.get().getID());

        preApprovalFormRequestRepository.deleteById(id);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentCoordinatorIDAndOutgoingStudentID(Long departmentCoordinatorID, Long outgoingStudentID) {
        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByDepartmentCoordinatorIDAndStudentID(departmentCoordinatorID, outgoingStudentID);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentCoordinatorID(Long departmentCoordinatorID) {

        if ( !departmentCoordinatorRepository.existsById(departmentCoordinatorID) ) {
            throw new IllegalStateException("Department Coordinator with id:" + departmentCoordinatorID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByDepartmentCoordinatorID(departmentCoordinatorID);
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            throw new IllegalStateException("Outgoing Student with id:" + outgoingStudentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByStudentID(outgoingStudentID);
    }

    public ResponseEntity<String> declinePreApprovalFormRequest(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        if ( preApprovalFormRequest.getStatus().equals("ACCEPTED") || preApprovalFormRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = preApprovalFormRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = preApprovalFormRequest.getDepartmentCoordinator();

        Application application = applicationService.getByOutgoingStudentID(outgoingStudent.getID());

        if ( application == null ) {
            return new ResponseEntity<>("Student with id:" + outgoingStudent.getID() + " doesn't currently have an application!", HttpStatus.BAD_REQUEST);
        }

        application.setPreApprovalFormStatus("DECLINED");

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Pre-Approval form has been rejected by the Department Coordinator: " + departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("DECLINED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has been declined!", HttpStatus.OK);
    }

    public ResponseEntity<String> acceptPreApprovalFormRequestByID(Long id, String feedback) {
        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " doesn't exist!", HttpStatus.BAD_REQUEST);
        }

        PreApprovalFormRequest preApprovalFormRequest = preApprovalFormRequestOptional.get();

        if ( preApprovalFormRequest.getStatus().equals("ACCEPTED") || preApprovalFormRequest.getStatus().equals("DECLINED") ) {
            return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has already been responded!", HttpStatus.BAD_REQUEST);
        }

        OutgoingStudent outgoingStudent = preApprovalFormRequest.getStudent();
        DepartmentCoordinator departmentCoordinator = preApprovalFormRequest.getDepartmentCoordinator();

        Application application = applicationService.getByOutgoingStudentID(outgoingStudent.getID());

        if ( application == null ) {
            return new ResponseEntity<>("Student with id:" + outgoingStudent.getID() + " doesn't currently have an application!", HttpStatus.BAD_REQUEST);
        }

        application.setPreApprovalFormStatus("ACCEPTED");

        // send notification to the outgoing student
        Notification newNotification = new Notification();
        newNotification.setRead(false);
        newNotification.setApplicationUser(outgoingStudent);
        newNotification.setDate(LocalDate.now());
        newNotification.setContent("Your Pre-Approval form has been rejected by the Department Coordinator: " + departmentCoordinator.getName() + "!");

        notificationService.saveNotification(newNotification);

        preApprovalFormRequest.setFeedback(feedback);
        preApprovalFormRequest.setStatus("ACCEPTED");

        preApprovalFormRequestRepository.save(preApprovalFormRequest);
        return new ResponseEntity<>("Pre-Approval Form with id:" + id + " has been accepted!", HttpStatus.OK);
    }

    @Transactional
    public String deletePreApprovalFormRequestByOutgoingStudentID(Long outgoingStudentID) {

        if ( !outgoingStudentRepository.existsById(outgoingStudentID) ) {
            return "Outgoing Student with id:" + outgoingStudentID + " doesn't exist!";
        }

        List<PreApprovalFormRequest> preApprovalFormRequests = getPreApprovalFormRequestsByOutgoingStudentID(
                outgoingStudentID
        );

        if ( preApprovalFormRequests.size() == 0 ) {
            return "Outgoing Student has not yet created a Pre-Approval Form!";
        }

        // delete the mobility courses belonging to the pre-approval forms
        for (PreApprovalFormRequest preApprovalFormRequest : preApprovalFormRequests) {
            mobilityCourseService.deleteMobilityCoursesByPreApprovalFormRequestID(preApprovalFormRequest.getID());
        }

        preApprovalFormRequestRepository.deletePreApprovalFormRequestsByStudent_ID(outgoingStudentID);
        return "All Pre-Approval Forms of Outgoing Student with id:" + outgoingStudentID + " have been deleted!";
    }

    public List<PreApprovalFormRequest> getPreApprovalFormRequestsByDepartmentID(Long departmentID) {

        if ( !departmentRepository.existsById(departmentID) ) {
            throw new IllegalStateException("Department with id:" + departmentID + " doesn't exist!");
        }

        return preApprovalFormRequestRepository.findByStudent_Department_ID(departmentID);
    }

    public ResponseEntity<Resource> getPDFPreApprovalFormByID(Long id) {

        Optional<PreApprovalFormRequest> preApprovalFormRequestOptional = preApprovalFormRequestRepository.findById(id);

        if ( !preApprovalFormRequestOptional.isPresent() ) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }

        // Create a new PDF document
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        PdfDocument pdf = new PdfDocument(new PdfWriter(baos));
        Document document = new Document(pdf);

        String path = new FileSystemResource("").getFile().getAbsolutePath();
        Path root = Path.of(path);
        root = root.resolve("documents").resolve("bilkent.png");

        try {
            ImageData imageData = ImageDataFactory.create(root.toString());
            Image image = new Image(imageData);
            image.scale(0.5F, 0.5F);
            image.setHorizontalAlignment(HorizontalAlignment.CENTER);
            document.add(image);
        } catch (MalformedURLException e) {
            throw new RuntimeException(e);
        }

        try {
            Paragraph header = new Paragraph("Pre-Approval Form")
                    .setFont(PdfFontFactory.createFont(StandardFonts.HELVETICA_BOLD))
                    .setFontSize(14);
            header.setHorizontalAlignment(HorizontalAlignment.CENTER);

            document.add(header);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        List<MobilityCourse> mobilityCourseList = mobilityCourseService.getMobilityCoursesByPreApprovalFormRequestID(id);
        Table table = new Table(UnitValue.createPercentArray(6)).useAllAvailableWidth();

        table.addCell("");
        table.addCell("Course Code");
        table.addCell("Course Name");
        table.addCell("Credits");
        table.addCell("Corresponding Course Code");
        table.addCell("Credits");
        int outerCount = 1;

        for (MobilityCourse mobilityCourse : mobilityCourseList) {
            List<Course> mergedCourses = mobilityCourse.getMergedCourses();
            int count = 1;

            for (Course course : mergedCourses) {
                table.addCell(String.valueOf(outerCount));
                table.addCell(course.getCourseName());
                table.addCell(course.getDescription());
                table.addCell(String.valueOf(course.getEcts()));

                if ( count == 1 ) {
                    Cell cell1 = new Cell(mergedCourses.size(), 1);
                    cell1.add(new Paragraph(mobilityCourse.getCorrespondingCourse().getCourseName()));
                    table.addCell(cell1);

                    Cell cell2 = new Cell(mergedCourses.size(), 1);
                    cell2.add(new Paragraph(mobilityCourse.getCorrespondingCourse().getCourseName()));
                    table.addCell(cell2);
                }

                outerCount++;
                count++;
            }
        }

        // Add the table to the document
        document.add(table);

        // Close the document
        document.close();

        // Convert the PDF document to a byte array
        byte[] contents = baos.toByteArray();

        // Create a Resource object for the PDF file
        Resource resource = new ByteArrayResource(contents);

        return new ResponseEntity<>(resource, HttpStatus.OK);
    }
}
