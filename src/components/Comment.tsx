import { useState } from "react";

import { Avatar } from "./Avatar";
import { Comment as CommentInterface } from "./Post";

import { ThumbsUp, Trash } from "@phosphor-icons/react";

interface CommentProps {
  comment: CommentInterface;
  onDeleteComment: (comment: number) => void;
}

export function Comment({ comment, onDeleteComment }: CommentProps) {
  const [likeCount, setLikeCount] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleDeleteComment() {
    onDeleteComment(comment.id);
  }

  function handleLikeComment() {
    setLikeCount((state) => {
      return state + 1;
    });
  }

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div className="flex gap-4">
      <Avatar hasBorder={false} src={comment.avatarUrl} alt="Avatar" />
      <div className="flex-1">
        <div className="bg-[#333333] p-4 rounded-lg break-all overflow-auto">
          <header className="flex items-start justify-between">
            <div className="authorAndTime">
              <strong className="block text-sm leading-[1.6] text-white">
                {comment.author}
              </strong>
              <time
                className="block text-xs text-gray-400 leading-[1.6]"
                title="25 de Maio às 8h13h"
                dateTime="2024-05-15 08:13:30"
              >
                Cerca de 1h atrás
              </time>
            </div>
            {comment.isUser && (
              <button
                onClick={() => openModal(comment)}
                title="Deletar comentário"
                className="bg-transparent border-0 text-gray-400 cursor-pointer rounded-sm hover:text-red-500"
              >
                <Trash size={24} />
              </button>
            )}
          </header>
          <p className="mt-4 text-gray-300">{comment.content}</p>
        </div>
        <footer className="mt-4 mb-8">
          <button
            onClick={handleLikeComment}
            className="bg-transparent text-gray-400 cursor-pointer flex items-center rounded-sm hover:text-blue-500 "
          >
            <ThumbsUp size={20} className="mr-2" />
            Curtir <span className="pl-2">{likeCount}</span>
          </button>
        </footer>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/90 flex justify-center items-center ">
            <div className="bg-[#202024] rounded-lg p-6 w-96 h-auto max-w-sm max-md:w-80">
              <h2 className="text-white mb-4 font-bold text-center">
                Excluir comentário
              </h2>
              <p className="text-center mb-8 text-white">
                Você tem certeza que gostaria de excluir esse comentário?
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-white rounded-lg bg-gray-600 hover:bg-gray-500 cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleDeleteComment}
                  className="px-4 py-2 bg-[#17171a] text-red-500 rounded-lg hover:bg-red-600 hover:text-white cursor-pointer"
                >
                  Sim, excluir
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
