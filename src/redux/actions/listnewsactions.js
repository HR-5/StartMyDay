export const SET_NEWS = 'SET_NEWS';
export const SET_CATEGORY = 'SET_CATEGORY';
export const RESET_NEWS = 'RESET_NEWS';
export const LOADING = 'LOADING';
export const MORE_LOADING = 'MORE_LOADING';
export const NEXT_PAGE = 'NEXT_PAGE';

export const setNews = news => dispatch => {
  dispatch({
    type: SET_NEWS,
    payload: news,
  });
};

export const setCat = cat => dispatch => {
  dispatch({
    type: SET_CATEGORY,
    payload: cat,
  });
};

export const resetNews = () => dispatch => {
  dispatch({
    type: RESET_NEWS,
  });
};

export const setLoading = load => dispatch => {
  dispatch({
    type: LOADING,
    payload: load,
  });
};

export const setMoreLoading = load => dispatch => {
  dispatch({
    type: MORE_LOADING,
    payload: load,
  });
};

export const setNextpage = page => dispatch => {
  dispatch({
    type: NEXT_PAGE,
    payload: page,
  });
};
