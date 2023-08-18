import { Post } from '../../types/post/post';

import api from './api';

export const getPosts = async ():Promise<Post[]> => api.get('posts');
