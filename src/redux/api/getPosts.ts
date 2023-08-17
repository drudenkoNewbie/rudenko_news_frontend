import { IPost } from '../../types/post/post';

import api from './api';

export const getPosts = async ():Promise<IPost[]> => api.get('posts');
