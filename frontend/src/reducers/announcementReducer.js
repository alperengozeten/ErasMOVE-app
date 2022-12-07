const INITIAL_STATE = {
  announcements: [
    {
      id: 1,
      date: "22.02.2022",
      from: "Reçel Tahin Ersoğan",
      announcement: "previewpreviewFatih Terim' in terli gömleği previewpreviewFatih Terim' in terli gömleği",
    },
    {
      id: 2,
      date: "23.02.2022",
      from: "Ali Koçu döven Fatih Terim",
      announcement: "TOGG Otomobilimiz yerli ve milli direksiyonda dünya lideri TOGG Otomobilimiz yerli ve milli direksiyonda dünya lideri",
    },
    {
      id: 3,
      date: "12.07.2022",
      from: "Messici Fatih Terim",
      announcement: "Yerli değil milli değil değil diyenler kendileri ne kadar yerli Yerli değil milli değil diyenler kendileri ne kadar yerli",
    },
    {
      id: 4,
      date: "26.04.2022",
      from: "Bayramda harçlık veren Fatih Terim",
      announcement: "previewpreviewFatih Terim' in terli gömleği previewpreviewFatih Terim' in terli gömleği",
    },
    {
      id: 5,
      date: "2.12.2022",
      from: "Onyekuruyu koşturan Fatih Terim",
      announcement: "previewpreviewFatih Terim' in terli gömleği previewpreviewFatih Terim' in terli gömleği",
    },
    {
      id: 6,
      date: "27.7.2022",
      from: "Fatih Terim' in terli gömleği",
      announcement: "previewpreviewFatih Terim' in terli gömleği previewpreviewFatih Terim' in terli gömleği",
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
