import {API_KEY} from '../utils/constants';
import {useSelector, useDispatch} from 'react-redux';
import {
  setNews,
  setLoading,
  setMoreLoading,
} from '../redux/actions/listnewsactions';
import axios from 'axios';

export const getNews = (page, dispatch, category) => {
  const url =
    'https://newsapi.org/v2/top-headlines?category=' +
    category +
    '&pageSize=5&page=' +
    page +
    '&apiKey=' +
    API_KEY;
  axios
    .get(url)
    .then(response => {
      if (response.status === 200) {
        dispatch(setNews(response.data.articles));
        dispatch(setLoading(false));
        dispatch(setMoreLoading(false));
      } else {
        dispatch(setLoading(false));
        dispatch(setMoreLoading(false));
      }
    })
    .catch(function (error) {
      console.log(error);
      dispatch(setLoading(false));
      dispatch(setMoreLoading(false));
    });
};
