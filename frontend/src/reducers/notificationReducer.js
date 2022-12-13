const INITIAL_STATE = {
    notifications: [
      {
        from: "Eray Tüzün",
        date: "20.12.2022",
        isUnread: true,
        isNew: true,
        notification: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
      },
      {
        from: "Fatih Terim",
        date: "12.12.2022",
        isUnread: true,
        isNew: true,
        notification: "Final exams announced",
      },
      {
        from: "Kürşad Güzelkaya",
        date: "11.12.2022",
        isUnread: false,
        isNew: false,
        notification: "Deadline for reports are coming",
      },
      {
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
  