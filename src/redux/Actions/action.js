import axios from 'axios';

// Action types
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';

// Action creators
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

// API endpoint
const API_URL = 'https://reqres.in/api/users';

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(API_URL, {
        params: { page: 1, per_page: 10 },
      });
      const fetchedUsers = response.data.data;
      dispatch(fetchUsersSuccess(fetchedUsers));
    } catch (error) {
      console.error(error);
    }
  };
};
