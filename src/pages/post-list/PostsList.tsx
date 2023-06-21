import React, { useEffect, useState } from "react";
import { GetPosts } from "../../API/posts.api";
import { Message } from "../../Models/message";
import PostItem from "../post-item/PostItem";
import "./postslist.scss";

const PostsList = () => {
  const [posts, setPosts] = useState<Message[]>([]);
  const [lastId, setlastId] = useState<Number>(0);
  const [favorites, setFavorites] = useState<String[]>([]);
  const [hidden, setHidden] = useState<Boolean>(true);

  const sortPosts = (arr: any, sort: boolean = true) => {
    if (sort) {
      return arr.sort((a: any, b: any) => b.id - a.id);
    } else return arr.sort((a: any, b: any) => a.id - b.id);
  };

  const isPostFavorite = (idPost: any) => {
    return favorites.includes(idPost);
  };

  const toggleFavorite = (idPost: any) => {
    const updatedFavorites = [...favorites];
    const index = updatedFavorites.indexOf(idPost);

    if (index > -1) {
      updatedFavorites.splice(index, 1);
    } else {
      updatedFavorites.push(idPost);
    }
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }

    const GetDataPost = (messageId: any = 0, oldMessages: any = false) => {
      GetPosts(messageId, oldMessages)
        .then((item) => {
          if (item) {
            setPosts((prev) => [...prev, ...item]);
            setlastId(+item[item.length - 1].id);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    };
    let id: any;
    id = setInterval(() => {
      GetDataPost(lastId);
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [lastId]);

  const sortarray = sortPosts(posts);
  const actualMessages = sortarray.slice(0, 20);
  const archiveMessages = sortarray.slice(20);

  return (
    <div className="container z-100">
      {sortarray.length === 0 && (
        <div className="flex justify-center mt-52">
          <i className="fa fa-refresh fa-spin fa-3x fa-fw"></i>
        </div>
      )}

      {actualMessages?.map((item: any, index: any) => (
        <PostItem
          key={index}
          toggleFavorite={toggleFavorite}
          isPostFavorite={isPostFavorite}
          id={item.id}
          author={item.author}
          content={item.content}
          date={item.date}
          attachments={item.attachments[0]}

        />
      ))}
      {archiveMessages.length > 0 && (
        <h2
          onClick={() => setHidden((prev) => !prev)}
          className="text-center cursor-pointer text-gray-500 hover:font-bold mb-10"
        >
          Показать архивные сообщения - {archiveMessages.length}
        </h2>
      )}

      <div className={` ${!hidden ? "hidden" : "visible"} `}>
        {archiveMessages?.map((item: any, index: any) => (
          <PostItem
            key={index}
            toggleFavorite={toggleFavorite}
            isPostFavorite={isPostFavorite}
            id={item.id}
            author={item.author}
            content={item.content}
            date={item.date}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsList;
