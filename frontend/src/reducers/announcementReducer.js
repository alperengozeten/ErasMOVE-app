const INITIAL_STATE = {
  announcements: [
    {
      id: 1,
      date: "22.02.2022",
      from: "David Davenport",
      announcement: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 2,
      date: "23.02.2022",
      from: "Shervin Arashloo",
      announcement: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 3,
      date: "12.07.2022",
      from: "Eray Tüzün",
      announcement: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 4,
      date: "26.04.2022",
      from: "Yelda Ateş",
      announcement: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 5,
      date: "2.12.2022",
      from: "Eray Tüzün",
      announcement: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 6,
      date: "27.7.2022",
      from: "Can Alkan",
      announcement: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
  ],
};

const announcementReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default announcementReducer;
