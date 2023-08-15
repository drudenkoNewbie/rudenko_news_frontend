import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert, CircularProgress } from '@mui/material';

import PostContainer from '../components/PostContainer/PostContainer';
import { createRequested } from '../redux/actions/postActions';
import { useTypedSelector } from '../hooks/useTypedSelector';

const MainPage: React.FC = () => {
  const { news, isLoading, error } = useTypedSelector(state => state.news)
  
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(createRequested())
  }, []);

  // if (isLoading) return <CircularProgress sx={{position: 'absolute', top: '50%', left: '50%'}} />;

  // if (error) return <h1>ERROR</h1>

  const stylesForInf = {position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}

  return (
    <>
    {
      isLoading ? 
      <CircularProgress sx={stylesForInf} /> : error ? 
      <Alert sx={{...stylesForInf, width: '500px'}} severity="error">{error}</Alert> : <PostContainer posts={news}/>
    }
    </>
)}

export default MainPage;
