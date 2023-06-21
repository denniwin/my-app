import { useState } from "react";
import dateFormat from "dateformat";
import avatar from "./img/avatar.svg";
import "font-awesome/css/font-awesome.min.css";
import "./postitem.scss";

const PostItem = ({
  id,
  author,
  content,
  date,
  attachments,
  toggleFavorite,
  isPostFavorite,
}: any) => {
  const [expanded, setExpanded] = useState<Boolean>(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleTextContent = (text: string) => {
    if (text.length <= 250) {
      return text;
    }

    if (expanded) {
      return text;
    }

    return text.slice(0, 250) + "...";
  };

  return (
    <div className="post hover:bg-slate-100 transition-all">
      <i
        onClick={() => toggleFavorite(id)}
        className={` ${
          isPostFavorite(id) ? " text-blue-500 " : "text-gray-600"
        } post__icon-star fa fa-star cursor-pointer `}
        aria-hidden="true"
      ></i>
      <div className="post__description">
        <div className="post__avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="post__time">{dateFormat(date, "HH:MM")}</div>
      </div>
      <div className="post__message">
        <div className="post__author">{author}</div>
        <div className="post__comment">
          Текст поста в соц. сетях если это комментарий
        </div>
        <div className="post__text">{handleTextContent(content)}</div>
        <div className="post__text-next mt-3">
          {content.length > 250 && !expanded && (
            <button
              className="text-gray-400 hover:font-bold"
              onClick={toggleExpand}
            >
              {" "}
              Далее
            </button>
          )}
          {content.length > 250 && expanded && (
            <button
              className="text-gray-400 hover:font-bold"
              onClick={toggleExpand}
            >
              {" "}
              Свернуть
            </button>
          )}
        </div>
        <div className="post__media">
          {attachments ? (
            attachments.type === "video" ? (
              <video preload="none" src={attachments.url} controls />
            ) : attachments.type === "image" ? (
              <img src={attachments.url} alt="Media" />
            ) : null
          ) : (
            ""
          )}
        </div>
      </div>
      <div className="post__tags">
        <span className="post__tags-general">#Новое</span>
        <span className="post__tags-secondary">#Эксперт</span>
      </div>
    </div>
  );
};

export default PostItem;
