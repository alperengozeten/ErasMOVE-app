
const INITIAL_STATE = {
    universities: [
      {
          id: 1,
          name: "Harvard University",
          quota: 4
      },    {
        id: 2,
        name: "Stanford University",
        quota: 3
    },    {
        id: 3,
        name: "Bridgeton University",
        quota: 5
    },    {
        id: 4,
        name: "Cambridge University",
        quota: 2
    },    {
        id: 5,
        name: "Ohio University",
        quota: 1    },
    ]
  };
  
  const universityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default universityReducer;
  