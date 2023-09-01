import { useEffect, type FC } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import UserCard from '../components/UserCard';
import { PostContainer } from '../components/PostContainer';
import { useAppDispatch, useAppSelector } from '../redux/hooks/hooks';
import Loader from '../components/Loader';
import { Notification } from '../components/Notification';
import { createUserRequested } from '../redux/actions/userActions';

const UserPage: FC = () => {
  const { user, isUserFetching, userError } = useAppSelector(
    (state) => state.user
  );
  const { authUser } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const userId = Number(location.pathname.split('/').pop());
  const navigate = useNavigate();

  useEffect(() => {
    if (authUser && userId) {
      dispatch(createUserRequested(userId));
    } else navigate('/');
  }, []);

  if (isUserFetching) return <Loader />;

  if (user) {
    return (
      <>
        {user && !userError && <UserCard />}
        {user.posts.length > 0 && (
          <PostContainer posts={user.posts} isSelfDisplayed={false} />
        )}
        {userError && (
          <Notification type="error" message="Something goes wrong" />
        )}
      </>
    );
  }
};

export default UserPage;
