const INITIAL_STATE = {
    notifications: [
      {
        id: 1,
        from: "Eray Tüzün",
        date: "20.12.2022",
        isUnread: true,
        isNew: true,
        notification: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
      },
      {
        id: 2,
        from: "Fatih Terim",
        date: "12.12.2022",
        isUnread: true,
        isNew: true,
        notification: "Final exams announced",
      },
      {
        id: 3,
        from: "Kürşad Güzelkaya",
        date: "11.12.2022",
        isUnread: false,
        isNew: false,
        notification: "Deadline for reports are coming",
      },
      {
        id: 4,
        from: "Eray Tüzün",
        date: "20.12.2022",
        isUnread: false,
        isNew: true,
        notification: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
      },
    ],
  };
  
  const notificationReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      default:
        return state;
    }
  };
  
  export default notificationReducer;
  