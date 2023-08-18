import { useEffect, type FC } from 'react';
import { useDispatch } from 'react-redux';

import PostContainer from '../components/PostContainer';
import NotificationProps from '../components/Notification';
import Loader from '../components/Loader';
import { createRequested } from '../redux/actions/postActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

import { NO_NEWS_MESSAGE } from '../locales/en.json';

const MainPage: FC = () => {
  const { news, isLoading, error } = useTypedSelector((state) => state.news);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createRequested());
  }, []);

  if (isLoading) return <Loader />;
  if (news) {
    return (
      <>
        { error && <Notification type="error" message={error.valueOf()} /> }
        { !news.length && !error && <Notification type="info" message={NO_NEWS_MESSAGE} />}
        { news.length && <PostContainer posts={news} /> }
      </>
    );
  }
};

export default MainPage;
