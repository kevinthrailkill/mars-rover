/**
 * Mars Rover API calls
 */

import axios from 'axios';

/**
 * API call to get photos based on searchParameters
 */
export const getRoverPhotosAPI = searchParameters => {
  const { rover, date } = searchParameters;

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const dateString = `${year}-${month}-${day}`;

  const fullUrl = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?earth_date=${dateString}&api_key=YQv888J9gVeBN6TPQJqZ78ox127KhPQriWjNbYKa`;

  return axios
    .get(fullUrl)
    .then(res => {
      const { photos } = res.data;
      return photos;
    })
    .catch(error => error);
};
