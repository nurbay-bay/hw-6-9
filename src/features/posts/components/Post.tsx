import { useState } from "react";
import Button from "../../../shared/ui/Button/Button";
import Input from "../../../shared/ui/Input/Input";
import Textarea from "../../../shared/ui/Textarea/Textarea";
import type { PostType } from "../../../shared/types/Post";
import s from "./Post.module.scss";

interface PostProps extends PostType {
  deletePost: (id: number) => void;
  updatePost: (id: number, updated: Partial<PostType>) => void;
}

function Post({ id, title, content, deletePost, updatePost }: PostProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(title);
  const [editContent, setEditContent] = useState(content);

  const handleSave = () => {
    updatePost(id, { title: editTitle, content: editContent });
    setIsEditing(false);
  };

  return (
    <li className={s.post}>
      {isEditing ? (
        <div className={s.editForm}>
          <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
          <Textarea value={editContent} onChange={(e) => setEditContent(e.target.value)} />
          <div className={s.actions}>
            <Button variant="primary" onClick={handleSave}>
              Сохранить
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Отмена
            </Button>
          </div>
        </div>
      ) : (
        <>
          <strong>{title}</strong>
          <p>{content}</p>
          <div className={s.actions}>
            <Button variant="secondary" onClick={() => setIsEditing(true)}>
              Редактировать
            </Button>
            <Button variant="danger" onClick={() => deletePost(id)}>
              Удалить
            </Button>
          </div>
        </>
      )}
    </li>
  );
}

export default Post;
