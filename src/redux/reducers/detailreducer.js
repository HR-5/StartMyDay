import {SET_NEWS_DETAILS} from '../actions/detailaction';

const initialState = {
  news: {},
};

function detailReducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS_DETAILS:
      return {...state, news: action.payload};
    default:
      return state;
  }
}

export default detailReducer;
