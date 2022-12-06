const INITIAL_STATE = {
    courseRequests: [
        {
            id: 1,
            name: "John Doe",
            courseName: "CS315",
            status: "waiting",
            documents: [],
        },{
            id: 2,
            name: "Kürşad Güzelkaya",
            courseName: "CS319",
            documents: [],
        },{
            id: 3,
            name: "Jake Paul",
            courseName: "CS115",
            status: "waiting",
            documents: [],
        },{
            id: 4,
            name: "Lionel Messi",
            courseName: "MATH230",
            status: "waiting",
            documents: [],
        },{
            id: 5,
            name: "Cristiano Ronaldo",
            courseName: "CS315",
            status: "waiting",
            documents: [],
        },
    ], 
    acceptanceLetterRequests: [
      {
          id: 1,
          name: "John Doe",
          request: "Acceptance Letter",
          documents: [],
      },{
          id: 2,
          name: "Kürşad Güzelkaya",
          request: "Acceptance Letter",
          documents: [],
      },{
          id: 3,
          name: "Jake Paul",
          request: "Acceptance Letter",
          documents: [],
      },{
          id: 4,
          name: "Lionel Messi",
          request: "Acceptance Letter",
          documents: [],
      },{
          id: 5,
          name: "Cristiano Ronaldo",
          request: "Acceptance Letter",
          documents: [],
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