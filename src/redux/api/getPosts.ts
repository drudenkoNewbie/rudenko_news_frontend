import { Post } from '../../types/post';

import api from './api';

export const getPosts = async ():Promise<Post[]> => api.get('posts');
