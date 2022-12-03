
const INITIAL_STATE = {
  applications: [
    {
        id: 1,
        name: "John Doe",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 67,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 2,
        name: "Kürşad Güzelkaya",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 77,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 3,
        name: "Jake Paul",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 80,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 4,
        name: "Lionel Messi",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 69,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },{
        id: 5,
        name: "Cristiano Ronaldo",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 85,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },
  ],
};

const applicationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default applicationReducer;
