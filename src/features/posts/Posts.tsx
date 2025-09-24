import { useState } from "react";
import { usePosts } from "./hooks/usePosts";
import Post from "./components/Post";
import Button from "../../shared/ui/Button/Button"; // путь поправь под свой проект
import Input from "../../shared/ui/Input/Input";
import Textarea from "../../shared/ui/Textarea/Textarea";
import s from "./Posts.module.scss";

function Posts() {
  const [limit, setLimit] = useState<number>(3);
  const { posts, loading, error, createPost, deletePost, updatePost } = usePosts(limit);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>{error}</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    createPost({ title, content });
    setTitle("");
    setContent("");
  };

  return (
    <div className={s.wrapper}>
      <h2>Список постов (кол-во постов {limit})</h2>

      <Button variant="secondary" onClick={() => setLimit(limit + 1)}>
        Прогрузить еще пост
      </Button>

      {/* форма создания */}
      <form onSubmit={handleSubmit} className={s.form}>
        <Input
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Текст поста"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button type="submit" variant="primary">
          Добавить пост
        </Button>
      </form>

      <ul className={s.list}>
        {posts.map((p) => (
          <Post
            key={p.id}
            {...p}
            deletePost={deletePost}
            updatePost={updatePost}/>
        ))}
      </ul>
    </div>
  );
}

export default Posts;
