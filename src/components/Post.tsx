import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import { Avatar } from "./Avatar";
import { Comment } from "./Comment";

import { FormEvent, useState, ChangeEvent, InvalidEvent } from "react";
import { SealCheck } from "@phosphor-icons/react";
import { useAuth } from "../hooks/useAuth";

interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link" | "image";
  content: string;
}

export interface Comment {
  id: number;
  content: string;
  author: string;
  avatarUrl: string;
  isUser: boolean;
}

export interface PostType {
  id: number;
  author: Author;
  publishedAt: Date;
  content: Content[];
  comments?: Comment[];
}

interface PostProps {
  post: PostType;
}

export function Post({ post }: PostProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>(
    post.comments as Comment[]
  );

  const publishedDateFormatted = format(
    post.publishedAt,
    "d 'de' LLLL 'às' HH:mm'h'",
    { locale: ptBR }
  );

  const [newCommentText, setNewCommentText] = useState("");

  const publishedDateRelativeToNow = formatDistanceToNow(post.publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();

    setComments([
      ...comments,
      {
        id: (post.comments?.length ?? 0) + 1,
        content: newCommentText,
        author: user.name,
        avatarUrl: user.avatarImage,
        isUser: true,
      },
    ]);
    setNewCommentText("");
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("");
    setNewCommentText(event.target.value);
  }

  function deleteComment(commentToDelete: number) {
    const commentsWithoutDeletedOne = comments.filter((comment) => {
      return comment.id !== commentToDelete;
    });
    setComments(commentsWithoutDeletedOne);
  }

  const isNewCommentEmpty = newCommentText.length === 0;

  return (
    <article className="bg-[#252525] rounded-2xl p-10">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar src={post.author.avatarUrl} />
          <div>
            <strong className="text-gray-100 leading-relaxed flex flex-row items-center">
              {post.author.name}
              <div className="relative group">
                <SealCheck size={20} className="text-amber-400 ml-1" />
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:flex px-3 py-1 bg-amber-700 text-white font-bold text-xs rounded shadow-lg z-10 whitespace-nowrap">
                  Selo Oficial FURIA
                </span>
              </div>
            </strong>
            <span className="block text-gray-400 text-sm leading-relaxed">
              {post.author.role}
            </span>
          </div>
        </div>
      </header>

      <div className="text-gray-300 leading-6 mt-6">
        {post.content.map((line, index) => {
          if (line.type === "paragraph") {
            return (
              <p key={line.content} className="mt-4">
                {line.content}
              </p>
            );
          } else if (line.type === "link") {
            return (
              <p key={line.content} className="mt-4">
                <a
                  href="#"
                  className="font-bold text-blue-500 hover:text-blue-700"
                >
                  {line.content}
                </a>
              </p>
            );
          } else if (line.type === "image") {
            return (
              <img
                key={line.content}
                className={"w-100 h-full mt-8"}
                src={line.content}
              />
            );
          }
        })}
      </div>
      <div className="w-full text-right mt-4">
        <time
          title={publishedDateFormatted}
          dateTime={post.publishedAt.toISOString()}
          className="text-gray-400 text-sm"
        >
          {publishedDateRelativeToNow}
        </time>
      </div>

      <form
        onSubmit={handleCreateNewComment}
        className="w-full mt-6 pt-6 border-t border-gray-600"
      >
        <strong className="text-gray-100 leading-relaxed">Comentários</strong>
        <textarea
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
          className="w-full bg-[#333333] border-0 resize-none h-24 p-4 rounded-lg text-gray-100 leading-6 mt-4"
        />
        <footer className="visibility-hidden max-h-0 ">
          <button
            type="submit"
            disabled={isNewCommentEmpty}
            className="py-2 px-6 mt-4 rounded-lg border-0 bg-blue-700 text-white font-bold cursor-pointer transition-colors duration-100 hover:bg-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            Publicar
          </button>
        </footer>
      </form>

      <div className="mt-25">
        {comments.map((comment) => {
          return (
            <Comment
              key={`${comment.author}-${comment.id}`}
              comment={comment}
              onDeleteComment={deleteComment}
            />
          );
        })}
      </div>
    </article>
  );
}
