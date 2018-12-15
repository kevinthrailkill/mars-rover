/**
 * Mars Actions
 *
 */
import { GET_PHOTOS, GET_PHOTOS_SUCCESS, GET_PHOTOS_ERROR } from './types';

/**
 * Redux Action To Get Rover Photos
 */
export const getRoverPhotos = searchParameters => ({
  type: GET_PHOTOS,
  searchParameters
});

/**
 * Redux Action To Get Rover Photos Success
 */
export const getRoverPhotosSuccess = photos => ({
  type: GET_PHOTOS_SUCCESS,
  photos
});

/**
 * Redux Action To Get Rover Photos Error
 */
export const getRoverPhotosError = error => ({
  type: GET_PHOTOS_ERROR,
  error
});
