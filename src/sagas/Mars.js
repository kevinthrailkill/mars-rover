/**
 * Mars Sagas
 */
import { all, fork, put, takeEvery, call } from 'redux-saga/effects';

import { GET_PHOTOS } from '../actions/types';
import { getRoverPhotosAPI } from '../apis';

import { getRoverPhotosSuccess, getRoverPhotosError } from '../actions';

/**
 * Get Rover Photos For Given Search Parameters
 */
function* getPhotos({ searchParameters }) {
  try {
    const photos = yield call(getRoverPhotosAPI, searchParameters);
    yield put(getRoverPhotosSuccess(photos));
  } catch (error) {
    yield put(getRoverPhotosError(error));
  }
}

/**
 * Watch For GET_PHOTOS
 */
export function* watchGetPhotos() {
  yield takeEvery(GET_PHOTOS, getPhotos);
}

/**
 * Mars Root Saga
 */
export default function* rootSaga() {
  yield all([fork(watchGetPhotos)]);
}
