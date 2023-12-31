import { useEffect, type FC } from 'react';

import { PostContainer } from '../components/PostContainer';
import { Notification } from '../components/Notification';
import Loader from '../components/Loader';
import { createPostsRequested } from '../redux/actions/postActions';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import { NO_NEWS_MESSAGE } from '../locales/en.json';

const MainPage: FC = () => {
  const { news, isLoading, error } = useAppSelector((state) => state.news);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(createPostsRequested());
  }, []);

  if (isLoading) return <Loader />;
  if (news != null) {
    return (
      <>
        {error != null && <Notification type="error" message={error} />}
        {news.length === 0 && error == null && (
          <Notification type="info" message={NO_NEWS_MESSAGE} />
        )}
        {news.length > 0 && <PostContainer isSelfDisplayed posts={news} />}
      </>
    );
  }
};

export default MainPage;
