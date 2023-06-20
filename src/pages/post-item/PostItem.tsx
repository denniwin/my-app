import dateFormat from "dateformat";
import avatar from "./img/avatar.svg";
import 'font-awesome/css/font-awesome.min.css';
import "./postitem.scss";

const Post = ({ author, content, date, attachments }: any) => {
  return (
    <div className="post">
      <i className="post__icon-star fa fa-star" aria-hidden="true"></i>
      <div className="post__description">
        <div className="post__avatar">
          <img src={avatar} alt="Avatar" />
        </div>
        <div className="post__time">{dateFormat(date, "HH:MM")}</div>
      </div>
      <div className="post__message">
        <div className="post__author">{author}</div>
        <div className="post__comment">lorer</div>
        <div className="post__text">{content}</div>
        <div className="post__img">{attachments}</div>
      </div>
      <div className="post__tags">
        <span className="post__tags-general">#Новое</span>
        <span className="post__tags-secondary">#Эксперт</span>
      </div>
    </div>
  );
};

export default Post;
