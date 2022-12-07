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
        },{
            id: 2,
            name: "Kürşad Güzelkaya",
            courseName: "CS319",
            equivalentCourse: "CS316",
            description: "Objec Oriented SE",
            courseCoordinator: "Eray Hoca",
            status: "rejected",
            documents: [],
        },{
            id: 3,
            name: "Jake Paul",
            courseName: "CS115",
            equivalentCourse: "CS316",
            description: "Python",
            courseCoordinator: "Aynur Dayanık",
            status: "accepted",
            documents: [],
        },{
            id: 4,
            name: "Lionel Messi",
            courseName: "MATH230",
            equivalentCourse: "CS316",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            status: "waiting",
            documents: [],
        },{
            id: 5,
            name: "Cristiano Ronaldo",
            courseName: "CS315",
            equivalentCourse: "CS316",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            status: "rejected",
            documents: [],
        },
    ], 
    acceptanceLetterRequests: [
      {
          id: 1,
          name: "John Doe",
          request: "Acceptance Letter",
          status: "waiting",
          documents: [],
      },{
          id: 2,
          name: "Kürşad Güzelkaya",
          request: "Acceptance Letter",
          status: "waiting",
          documents: [],
      },{
          id: 3,
          name: "Jake Paul",
          request: "Acceptance Letter",
          status: "waiting",
          documents: [],
      },{
          id: 4,
          name: "Lionel Messi",
          request: "Acceptance Letter",
          status: "waiting",
          documents: [],
      },{
          id: 5,
          name: "Cristiano Ronaldo",
          request: "Acceptance Letter",
          status: "sent",
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