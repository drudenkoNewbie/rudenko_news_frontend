import { IPost } from "../../types/post/post"

import api from "./api"

export const getPosts = async ():Promise<IPost[]> => {
  return await api.get('posts')
}