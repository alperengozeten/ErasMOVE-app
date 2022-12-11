const INITIAL_STATE = {
    courseRequests: [
        {
            id: 1,
            name: "John Doe",
            courseName: "CS315",
            equivalentCourse: "CS316",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            status: "waiting",
            type: "Must",
            documents: [],
            feedback: ""
        },{
            id: 2,
            name: "Kürşad Güzelkaya",
            courseName: "CS319",
            equivalentCourse: "CS316",
            description: "Objec Oriented SE",
            courseCoordinator: "Eray Hoca",
            status: "rejected",
            type: "Elective",
            documents: [],
            feedback: "Please fix the issues!!"
        },{
            id: 3,
            name: "Jake Paul",
            courseName: "CS115",
            equivalentCourse: "CS316",
            description: "Python",
            courseCoordinator: "Aynur Dayanık",
            status: "accepted",
            type: "Must",
            documents: [],
            feedback: "LGTM Thanks!"
        },{
            id: 4,
            name: "Lionel Messi",
            courseName: "MATH230",
            equivalentCourse: "CS316",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            status: "waiting",
            type: "Must",
            documents: [],
            feedback: ""
        },{
            id: 5,
            name: "Cristiano Ronaldo",
            courseName: "CS315",
            equivalentCourse: "CS316",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            status: "rejected",
            type: "Elective",
            documents: [],
            feedback: "This is terrible mann :/"
        },
    ], 
    acceptanceLetterRequests: [
      {
          id: 1,
          name: "John Doe",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Computer Science",
          documents: [],
      },{
          id: 2,
          name: "Kürşad Güzelkaya",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Electrical Engineering",
          documents: [],
      },{
          id: 3,
          name: "Jake Paul",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Computer Science",
          documents: [],
      },{
          id: 4,
          name: "Lionel Messi",
          request: "Acceptance Letter",
          status: "waiting",
          department: "Computer Science",
          documents: [],
      },{
          id: 5,
          name: "Cristiano Ronaldo",
          request: "Acceptance Letter",
          status: "sent",
          department: "Computer Science",
          documents: [],
      },
    ], 
    preApprovalForms: [
        {
            id: 1,
            status: "rejected",
            departmentCoordinator: "Altay Güvenir",
            mobilityCourses: [
                {
                    courses: [
                        {
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        },{
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        }
                    ],
                    type: "Must",
                    equivalentCourse: 'CS340',
                },
                {
                    courses: [
                        {
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        }
                    ],
                    type: "Must",
                    equivalentCourse: 'CS340',
                }
            ],
            feedback: "Man this is terrible.. Are you serious??",
        },{
            id: 2,
            status: "waiting",
            departmentCoordinator: "Aynur Dayanik",
            mobilityCourses: [
                {
                    courses: [
                        {
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        },{
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        }
                    ],
                    type: "Must",
                    equivalentCourse: 'CS340',
                }
            ],
            feedback: "Man this is terrible.. Are you serious??",
        },{
            id: 3,
            status: "accepted",
            departmentCoordinator: "Eray Hoca",
            mobilityCourses: [
                {
                    courses: [
                        {
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        },{
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        }
                    ],
                    type: "Must",
                    equivalentCourse: 'CS340',
                },
                {
                    courses: [
                        {
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        },{
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        },{
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        }
                    ],
                    type: "Must",
                    equivalentCourse: 'CS340',
                },{
                    courses: [
                        {
                            courseName: 'CS219',
                            description: 'Proggraming Life',
                            ECTS: 3,
                        }
                    ],
                    type: "Must",
                    equivalentCourse: 'CS340',
                }
            ],
            feedback: "LGTM. You are perfect :))",
        },
    ], 
};

const requestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default requestsReducer;