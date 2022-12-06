const INITIAL_STATE = {
  announcements: [
    {
      id: 1,
      date: "22.02.2022",
      announcementPrev: "preview",
      announcementFull: "full",
    },
    {
      id: 2,
      date: "23.02.2022",
      announcementPrev: "preview",
      announcementFull: "full",
    },
    {
      id: 3,
      date: "12.07.2022",
      announcementPrev: "preview",
      announcementFull: "full",
    },
    {
      id: 4,
      date: "26.04.2022",
      announcementPrev: "preview",
      announcementFull: "full",
    },
    {
      id: 5,
      date: "2.12.2022",
      announcementPrev: "preview",
      announcementFull: "full",
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
