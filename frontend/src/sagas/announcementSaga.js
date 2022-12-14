import { takeEvery, put } from 'redux-saga/effects';
import { CREATE_ANNOUNCEMENT_FAIL, CREATE_ANNOUNCEMENT_REQUEST, CREATE_ANNOUNCEMENT_SUCCESS, GET_ANNOUNCEMENTS_FAIL, GET_ANNOUNCEMENTS_REQUEST, GET_ANNOUNCEMENTS_SUCCESS } from '../constants/actionTypes';

function* getAnnouncementRequest() {
    yield console.log(`Get announcements...`);

    try {
        // TODO: send Post request here
        //const { data } = yield call(getApplication, id);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }
  
        yield put({
            type: GET_ANNOUNCEMENTS_SUCCESS,
            payload: announcements,
        });
    } catch (error) {
      yield put({
        type: GET_ANNOUNCEMENTS_FAIL,
        payload: error.message,
      });
    }
}

function* createAnnouncementRequest({ payload: { announcement } }) {
    yield console.log(`Create announcement... `);

    try {
        // TODO: send Post request here
        //const { data } = yield call(getApplication, id);
  
        const status = 200;
        if (status !== 200) {
          throw Error('Accept request failed for  course approval request ');
        }

        const announcementToSend = {
            date: "22.02.2022",
            from: "David Davenport",
            title: announcement.title,
            description: announcement.description,
        };
  
        yield put({
            type: CREATE_ANNOUNCEMENT_SUCCESS,
            payload: announcementToSend,
        });
    } catch (error) {
      yield put({
        type: CREATE_ANNOUNCEMENT_FAIL,
        payload: error.message,
      });
    }
}


const announcementSaga = [
    takeEvery(GET_ANNOUNCEMENTS_REQUEST, getAnnouncementRequest),
    takeEvery(CREATE_ANNOUNCEMENT_REQUEST, createAnnouncementRequest),
];

const announcements = [
    {
      id: 1,
      date: "22.02.2022",
      from: "David Davenport",
      title: "Finalss",
            description: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 2,
      date: "23.02.2022",
      from: "Shervin Arashloo",
      title: "Finalss",
            description: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 3,
      date: "12.07.2022",
      from: "Eray Tüzün",
      title: "Finalss",
            description: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 4,
      date: "26.04.2022",
      from: "Yelda Ateş",
      title: "Finalss",
            description: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 5,
      date: "2.12.2022",
      from: "Eray Tüzün",
      title: "Finalss",
            description: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
    {
      id: 6,
      date: "27.7.2022",
      from: "Can Alkan",
      title: "Finalss",
            description: "Final report submission deadline extended from 12.12.2022 to 24.12.2022",
    },
  ];


export default announcementSaga;
