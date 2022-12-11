export const SET_NEWS_DETAILS = 'SET_NEWS_DETAILS';

export const setNewsDetails = news => dispatch => {
  dispatch({
    type: SET_NEWS_DETAILS,
    payload: news,
  });
};
