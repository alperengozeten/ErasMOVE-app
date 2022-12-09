const INITIAL_STATE = {
    hostCourses: [
        {
            id: 1,
            courseName: "CS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
        },{
            id: 2,
            courseName: "CS319",
            description: "Objec Oriented SE",
            courseCoordinator: "Eray Hoca",
        },{
            id: 3,
            courseName: "CS115",
            description: "Python",
            courseCoordinator: "Aynur Dayanık",
        },{
            id: 4,
            courseName: "MATH230",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
        },{
            id: 5,
            courseName: "CS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
        },
    ], 
    approvedCourses: [
        {
            id: 1,
            courseName: "ACS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
        },{
            id: 2,
            courseName: "ACS319",
            description: "Objec Oriented SE",
            courseCoordinator: "Eray Hoca",
        },{
            id: 3,
            courseName: "ACS115",
            description: "Python",
            courseCoordinator: "Aynur Dayanık",
        },{
            id: 4,
            courseName: "AMATH230",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
        },{
            id: 5,
            courseName: "ACS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
        },
    ], 
    
};

const courseReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default courseReducer;