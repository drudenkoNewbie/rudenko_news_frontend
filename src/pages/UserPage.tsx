import { useEffect, type FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userId = parseInt(String(useParams().id));

    useEffect(() => {
    if (!Number.isNaN(userId)) {
      dispatch(createUserRequested(userId));
    } else navigate('/');
  }, [userId]);

  if (isUserFetching || user == null) return <Loader />;

  if (user == null) return null;
  
  return (
    <>
      {user != null && <UserCard />}
      {user.posts.length > 0 && (
        <PostContainer posts={user.posts} isSelfDisplayed={false} />
      )}
      {user == null && userError != null && (
        <Notification type="error" message="Something goes wrong" />
      )}
    </>
  );
};

export default UserPage;
