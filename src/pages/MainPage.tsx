import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import PostContainer from '../components/PostContainer/PostContainer'
import { createRequested } from '../redux/actions/postActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const MainPage: React.FC = () => {
  const { news, isLoading, error } = useTypedSelector(state => state.news)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createRequested())
  }, [])

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>ERROR</h1>
  console.log(news);
  return (
    <>
     
      <PostContainer posts={news}/>
    </>
  )
}

export default MainPage
