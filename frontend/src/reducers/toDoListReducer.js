const INITIAL_STATE = {
    toDoLists: [
      {
        id: 1,
        toDo: "You have 9 waiting course requests.",
      },
      {
        id: 2,
        toDo: "There are 3 waiting empty Harvard University quotas waiting for replacement offer.",
      },
      {
        id: 3,
        toDo: "You have 4 waiting acceptance letter requests.",
      },
      {
        id: 4,
        toDo: "You have 2 waiting preapproval forms.",
      },

    ],
  };
  
  const toDoListReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default toDoListReducer;
  