const INITIAL_STATE = {
    hostCourses: [
        {
            id: 1,
            courseName: "CS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            ects: 3,
        },{
            id: 2,
            courseName: "CS319",
            description: "Objec Oriented SE",
            courseCoordinator: "Eray Hoca",
            ects: 3,
        },{
            id: 3,
            courseName: "CS115",
            description: "Python",
            courseCoordinator: "Aynur Dayanık",
            ects: 4,
        },{
            id: 4,
            courseName: "MATH230",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            ects: 2,
        },{
            id: 5,
            courseName: "CS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            ects: 5,
        },
    ], 
    approvedCourses: [
        {
            id: 1,
            courseName: "ACS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            ects: 3,
        },{
            id: 2,
            courseName: "ACS319",
            description: "Objec Oriented SE",
            courseCoordinator: "Eray Hoca",
            ects: 4,
        },{
            id: 3,
            courseName: "ACS115",
            description: "Python",
            courseCoordinator: "Aynur Dayanık",
            ects: 4,
        },{
            id: 4,
            courseName: "AMATH230",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            ects: 2,
        },{
            id: 5,
            courseName: "ACS315",
            description: "Programming Languages",
            courseCoordinator: "Altay Güvenir",
            ects: 1,
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