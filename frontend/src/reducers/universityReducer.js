
const INITIAL_STATE = {
    universities: [
      {
          id: 1,
          name: "Harvard University",
          type: "Erasmus",
          emptyQuota: 4,
          totalQuota: 8

      },    {
        id: 2,
        name: "Stanford University",
        type: "Erasmus",
        emptyQuota: 4,
        totalQuota: 6
    },    {
        id: 3,
        name: "Bridgeton University",
        type: "Exchange",
        emptyQuota: 2,
        totalQuota: 5
    },    {
        id: 4,
        name: "Cambridge University",
        type: "Erasmus",
        emptyQuota: 0,
        totalQuota: 3
    },    {
        id: 5,
        name: "Ohio University",
        type: "Exchange",
        emptyQuota: 2,
        totalQuota: 4   },
    ]
  };
  
  const universityReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default universityReducer;
  