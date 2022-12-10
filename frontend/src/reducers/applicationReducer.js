
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
        department: "Mechanical Engineering",
        selectedUniversities: [],
        selectedSemester: 'fall',
        score: 85,
        status: "waiting",
        admittedUniversity: null,
        documents: [],
    },
  ], 
  // To just represent for now
  placedApplications: [
    {
        id: 1,
        name: "John Doe",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: ["Bilkent University", "Stanford University", "Harvard University", "Ohio State University", "MIT"],
        selectedSemester: 'fall',
        score: 67,
        status: "placed",
        admittedUniversity: "Stanford",
        documents: [],
    },{
        id: 2,
        name: "Kürşad Güzelkaya",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: ["Bilkent University", "Stanford University", "Harvard University", "Ohio State University", "MIT"],
        selectedSemester: 'spring',
        score: 77,
        status: "placed",
        admittedUniversity: "Harward",
        documents: [],
    },{
        id: 3,
        name: "Jake Paul",
        type: 'Erasmus',
        department: "Electrical Engineering",
        selectedUniversities: ["Bilkent University", "Stanford University", "Harvard University", "Ohio State University", "MIT"],
        selectedSemester: 'fall',
        score: 80,
        status: "placed",
        admittedUniversity: "MIT",
        documents: [],
    },{
        id: 4,
        name: "Lionel Messi",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: ["Bilkent University", "Stanford University", "Harvard University", "Ohio State University", "MIT"],
        selectedSemester: 'spring',
        score: 69,
        status: "placed",
        admittedUniversity: "UCLA",
        documents: [],
    },{
        id: 5,
        name: "Cristiano Ronaldo",
        type: 'Erasmus',
        department: "Computer Science",
        selectedUniversities: ["Bilkent University", "Stanford University", "Harvard University", "Ohio State University", "MIT"],
        selectedSemester: 'fall',
        score: 85,
        status: "placed",
        admittedUniversity: "Colby",
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
