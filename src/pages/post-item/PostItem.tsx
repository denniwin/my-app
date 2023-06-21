import {useState} from 'react'
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

  const handleTextContent = (text:string) => {
    if (text.length <= 250) {
      return text;
    }

    if (expanded) {
      return text;
    }

    return text.slice(0, 250) + '...';
  };
  
  console.log(attachments ? attachments.type : 'пусто' );

  
  return (
    <div className="post">
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
        <div className="post__comment">lorer</div>
        <div className="post__text">{handleTextContent(content)}{content.length > 250 && !expanded && (
        <button className='text-gray-400 hover:font-bold' onClick={toggleExpand}> Далее</button>
      )}
      {content.length > 250 && expanded && (
        <button className='text-gray-400 hover:font-bold' onClick={toggleExpand}> Свернуть</button>
      )}</div>
        <div className="post__img">
          { attachments ? (attachments.type === "video" ? (
            <video preload='none' src={attachments.url} controls />
          ) : attachments.type === "image" ? (
            <img src={attachments.url} alt="Media"/>
          ) : null): 'Нет контента'}
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
