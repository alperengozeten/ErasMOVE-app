const INITIAL_STATE = {
    requests: [
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