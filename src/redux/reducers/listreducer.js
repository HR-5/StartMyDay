import {
  LOADING,
  MORE_LOADING,
  NEXT_PAGE,
  SET_CATEGORY,
  SET_NEWS,
  RESET_NEWS,
} from '../actions/listnewsactions';

const initialState = {
  news: '',
  loading: false,
  moreloading: false,
  page: 1,
  category: 'general',
};

function listreducer(state = initialState, action) {
  switch (action.type) {
    case SET_NEWS:
      var latest = [...state.news, ...action.payload];
      return {...state, news: latest};
    case SET_CATEGORY:
      return {...state, category: action.payload};
    case RESET_NEWS:
      return {...state, news: []};
    case LOADING:
      return {...state, loading: action.payload};
    case MORE_LOADING:
      return {...state, moreloading: action.payload};
    case NEXT_PAGE:
      return {...state, page: action.payload};
    default:
      return state;
  }
}

export default listreducer;
