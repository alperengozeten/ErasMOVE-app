# :flight_departure: ErasMOVE :flight_arrival:

## Team Members of Erasmus Muarrem :woman_student: :man_student:
#### - Hazal Buluş (21903435) :gem:
#### - Halil Alperen Gözeten (21902464) :crown:
#### - Süleyman Gökhan Tekin (21902512) :crown:
#### - Korhan Kemal Kaya (21903357) :crown:
#### - Kürşad Güzelkaya (21902103) :crown:

## Description :memo:

**ErasMOVE** is a website that will be designed to provide ease to students, staff, and department personnel during the Erasmus and Exchange applications. The department coordinators can easily keep track of the application processes of students and update information related to the students or universities. Students, on the other hand, can handle pre-application and post-application processes through our app and contact university staff for document-related issues. The course coordinator and the administrative staff will be the other actors in our app who will have the ability to manage document and course-related requests of students. Incoming students, as the least essential actor, can propose a list of courses they plan to take and track its status.

## Roles in ErasMOVE :memo:

#### - Outgoing Student :man_student: :woman_student: 
#### - Department Coordinator :man_office_worker: :woman_office_worker: 
#### - Course Coordinator :man_office_worker: :woman_office_worker: 
#### -  Administrative Staff :man_office_worker: :woman_office_worker:
#### - Incoming Student :man_student: :woman_student:  

## :computer: Non-Actor Related Features

-   Placements will be done according to a sheet uploaded by the Registrar's Office (Administrative Staff). The placement algorithm will be implemented in a detailed manner considering the details like quotas and accepted semesters of the partner universities. A waiting bin (queue) will be formed with the non-placed students considering their total points, which will be used in case of cancellation.
    
-   If the CGPA of an Erasmus student drops below 2.5 or 3.0 for an Exchange student, their acceptance will be canceled, and the process of finding a new student from the waiting will be started by the department coordinator.
    
-   Information related to approved/rejected courses will be logged and will be available to the next applicants.
    
-   Actors can send messages to other actors through our application, or they can be directed to send an email by clicking the mail button.

## :man_student: :woman_student: What Outgoing Students Can Do in ErasMOVE

-  Each student will sign-up with their Bilkent University emails, and a verification link will be sent in this process. Later, they will be able to log in to the system either with their emails or Bilkent IDs.
    
-   Students will be able to take a look at the list of courses that have been previously accepted as an equivalence of a course offered at Bilkent University.
    
-   When the placement is done, students, in case needed by the university they are placed in, will get a notification about when and where their language proficiency test will be.
    
-   Students will be able to create a request for a course that they want to take in their mobility as a possible equivalence of a course in Bilkent. In the request, the student will be able to attach the syllabus of the course and explain the contents. The request will be delivered to the related course coordinator for their approval.
    

-   Students will be able to create pre-approval forms to get approval for their planned courses from the department coordinator (there will be two of these if the student is a double major or doing a minor). While creating this form, students will have the option to merge some courses depending on their university (i.e. universities in France). The system won’t accept the form unless the total ECTS workload of the courses is below 30 (this is strict) or above 40 (more flexible).
    
-   In case a student cancels their placement, the top student on the waiting list might be offered this empty slot by the department coordinator. Students will have the ability to accept or decline this offer.
    
-   The student will be able to create a new (secondary) pre-approval form through our system in case he/she fails to take the desired courses at registration in the mobility. The same process for approval will start once again.
    

-   Each student will have a profile containing their related information such as department, current GPA, semester, double major and minor status, etc. Information related to different language proficiencies (German, French, etc.) will also be displayed on the profile page of students. Most importantly, they will be able to see the current status of their application.
    
-   Each admitted student will have an option on their profile page to request a Learning Agreement and Acceptance Letter, which is required by the visa processes.
    
-   On the student’s profile page, there will be buttons for requesting Staff to send transcripts and other necessary files to the approved school. Students also will be able to pay for paid documents such as transcripts and enrollment certificates through the application.
    
-   An admitted student may be able to see previous and current students who are going to the same university or city and contact them via email.
    
-   Changes in the applications of the students are not possible, however, a chance for complete cancellation of the application will be provided until 1 month before their mobility.
    
-   After the mobility ends; students, in case they have taken a course with a term project or similar course activity in their mobility process, may upload a project report or any needed document for the approval of the course of the equivalent course coordinator in Bilkent.
    
-   The students will also be able to see the exemption status of the courses they took in the mobility (same as courses in the last pre-approval form).

## :man_office_worker: :woman_office_worker: What Department Coordinator Can Do in ErasMOVE

-   Will be able to see the placements of the students listed with decreasing scores calculated by considering students’ ENG 101/102 grades and their CGPA.
    
-   Will be able to approve the language proficiency of students applying to universities with language requirements other than English; like German, French, etc, according to the results of the language exams conducted by Bilkent University.
    
-   Will be able to make changes to the announcement page where the information related to application deadlines and conditions will be displayed.
    
-   Will be able to update quotas and other pieces of information related to the partner university. The department coordinator will also be able to add a new partner university or cancel a current one.
    
-   In case a student cancels their application, the coordinator will be able to send a notification to the first student on the waiting list. The student will be placed in this position once they accept this offer.
    
-   Department coordinators will have a to-do list on their profile which shows the different requests coming from students.
    
-   Workload between department coordinators will be distributed equally.

## :man_office_worker: :woman_office_worker: What Administrative Staff Can Do in ErasMOVE

-   Get notifications and emails about a student’s file requests, and they will be able to see the list of requests.
    
-   For the placements to be done, a sheet including information about applicants, their cumulative GPA’s and ENG 101/102 notes will be uploaded by administrative staff initially.
    
-   They will also be able to submit the requested file to the system.
    
-   The administrative staff will have a to-do list in their profile where they can look into the list of requests.

## :man_office_worker: :woman_office_worker: What Course Coordinator Can Do in ErasMOVE

-   The course coordinator will get a notification about the requests of students to accept or decline a course in another university as an equivalence of the course that they’re coordinating.
    
-   If the course requires a report, the course coordinator can request the report from the students who took this course on mobility to approve or disapprove it.
    
-   The course coordinator will also have a to-do list in their profile where they can see the list of requests of students.

## :man_student: :woman_student: What Incoming Students Can Do in ErasMOVE

-   Outgoing student actors will have the lowest priority in the design and implementation of our application.
    
-   We plan to provide them with the ability to create a proposal for their planned courses in Bilkent, which will then be approved by the department coordinator.

## :gear: Build Instructions
1.  Install PostgreSQL. Use the default instructions and the port number (which is 5432). In this process, you will be asked to create a password for the superuser (postgres), remember this password.
2.  Clone our repository https://github.com/alperengozeten/ErasMOVE-app
3.  Add the psql to the path to be able to run the psql from the terminal and create a new database.
4.  Navigate to the path /backend/ErasMove from the cloned project and open IntelliJ from there. Then, please wait for the Maven indexing to finish.
5.  Open “”application.properties” which can be found under “src/main/resources”. Then, fill the empty spring.datasource.password= with the password you picked for the superuser.
6.  Now, open the cmd and run the command “psql -U postgres” to login as the superuser “postgres”. Enter your password when asked.
7.  Here, run the command “CREATE DATABASE erasmove”;
8.  Now, you can run “ErasMoveApplication.java” under “src/main/java/com.erasmusmuarrem.ErasMove/”. 
9.  If everything works fine, you should be able to make a HTTP request to the server.
10. Install Postman. Then, make a GET request to the following endpoint: “http://localhost:8080/initialize”. This will allow to initiate necessary entities to successfully start the application such as an admin user with email “korhan@gmail.com” and password “admin”, courses, universites, and other Bilkent Members.
11. If query is successful, you should get the response “Initialized Successfully!”. 
12. On terminal, cd into the frontend directory of the cloned project which is simply “frontend”. From there run the command “yarn install”. Then run the command “yarn start”. Note that you need to have Node.js installed on your computer and you need to install yarn from npm with “npm install --globally yarn” in order to run “yarn” commands. If you don’t have this installed, simply download it from the internet. 
13. After “yarn start”, you should be able to see the application running on your browser. If you cannot see it, you can visit “localhost:3000, localhost:3001, localhost:3002…” 
14. If everything works fine, you should see the login page of ErasMOVE on your browser. Choose admin from the radio button under the input fields, and then login with the credentials given on step 9. 
15. After logging in, please follow 3.6 Admin under 3. User’s Guide to get detailed information about adding new users. 
