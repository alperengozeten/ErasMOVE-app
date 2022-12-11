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
            type: "Mandatory",
            status: "rejected",
            documents: [],
        },{
            id: 2,
            type: "Mandatory",
            status: "waiting",
            documents: [],
        },{
            id: 3,
            type: "Elective",
            status: "accepted",
            documents: [],
        }
    ], 
};

const requestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default requestsReducer;