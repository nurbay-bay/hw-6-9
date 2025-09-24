import React, { useEffect, useState } from 'react'
import axios from 'axios'
import type { PostType } from '../../../shared/types/Post'

export function usePosts(limit = 5) {
  const [posts, setPosts] = useState<PostType[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const auth = { username: "admin", password: "123" }

  const API_URL = "http://localhost:8000/api/posts"

  useEffect(() => {

    axios
      .get<PostType[]>(`${API_URL}?_limit=${limit}&_start=0`,
        { auth }
      )
      .then((res) => { setPosts(res.data) })
      .catch((err) => { setError(`Ошибка получения данных ${err}`) })
      .finally(() => { setLoading(false) })
  }, [limit])

  const createPost = async (newPost: Omit<PostType, "id" | "author">) => {
    try {
      const res = await axios.post<PostType>(
        API_URL,
        {
          ...newPost,
          author: "автор"
        },
        { auth }
      )
      setPosts((prev) => [...prev, res.data])
    } catch (err) {
      setError(`Ошибка ${err}`)
    }
  }

  const updatePost = async (id: number, updatedPost: Partial<PostType>) => {
    try {
      const res = await axios.put<PostType>(
        `${API_URL}/${id}`,
        updatedPost
        ,
        { auth }
      )
      setPosts((prev) =>
        prev.map((p) => (p.id === id ? res.data : p))
      )
    } catch (err) {
      setError(`Ошибка ${err}`)
    }
  }

  const deletePost = async (id: number) => {
    try {
      const res = await axios.delete(
        `${API_URL}/${id}`,
        { auth }
      )
      setPosts((prev) =>
        prev.filter((p) => p.id !== id)
      )
    } catch (err) {
      setError(`Ошибка ${err}`)
    }
  }

  return { posts, loading, error, createPost, updatePost, deletePost }
}