/**
 * Mars Reducers
 */
import {
  GET_PHOTOS,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_ERROR
} from '../actions/types';

/**
 * Hardcoded rover objects. Could be transitioned to pull all rovers on init.
 * Also could add in properties such as camera available for more filter options.
 */
const currentRovers = [
  { roverName: 'Curiosity', roverValue: 'curiosity' },
  { roverName: 'Opportunity', roverValue: 'opportunity' },
  { roverName: 'Spirit', roverValue: 'spirit' }
];

/**
 * Mars App Initial State
 */
const INIT_STATE = {
  photos: null,
  rovers: currentRovers,
  loading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PHOTOS:
      return { ...state, loading: true };
    case GET_PHOTOS_SUCCESS:
      return { ...state, photos: action.photos, loading: false };
    case GET_PHOTOS_ERROR:
      return { ...state, error: action.error, loading: false };
    default:
      return { ...state };
  }
};
