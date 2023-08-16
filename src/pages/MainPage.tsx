import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PostContainer from '../components/PostContainer/PostContainer';
import { createRequested } from '../redux/actions/postActions';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { Loader } from '../components/Loader/Loader';
import { Notification } from '../components/Notification/Notification'

import {NO_NEWS_MESSAGE} from '../locales/en.json'

const MainPage: React.FC = () => {
  const { news, isLoading, error } = useTypedSelector(state => state.news)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createRequested())
  }, []);

  if (isLoading) return <Loader />
  if (news) {
    return (
      <>
        { error && <Notification type="error" message={ String(error) } /> }
        { !news.length && !error &&  <Notification type="info" message={NO_NEWS_MESSAGE} />}
        { news.length && <PostContainer posts={news}/> }
      </>
  )
  }
}

export default MainPage;
