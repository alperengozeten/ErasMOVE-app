const INITIAL_STATE = {
    courseRequests: [
      {
          id: 1,
          name: "John Doe",
          documents: [],
      },{
          id: 2,
          name: "Kürşad Güzelkaya",
          documents: [],
      },{
          id: 3,
          name: "Jake Paul",
          documents: [],
      },{
          id: 4,
          name: "Lionel Messi",
          documents: [],
      },{
          id: 5,
          name: "Cristiano Ronaldo",
          documents: [],
      },
    ], 
};

const courseRequestsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default courseRequestsReducer;