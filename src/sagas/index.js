/**
 * Root Sagas
 */
import { all } from 'redux-saga/effects';

/**
 * Mars Saga
 */
import marsSagas from './Mars';

export default function* rootSaga(getState) {
  yield all([marsSagas()]);
}
