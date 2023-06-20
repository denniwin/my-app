import React, { useEffect, useState } from "react";
import { GetPosts } from "../../API/posts.api";
import { Message } from "../../Models/message";
import Post from "../post-item/PostItem";
import "./postslist.scss";

const Posts = () => {
  const [posts, setPosts] = useState<Message[]>([]);
  const [count, setCount] = useState<Number>(0);


  // function GetLastPost(posts: any) {
  //   let maxId = 0;
  //   posts.forEach((item: { id: number }) => {
  //     if (item.id > maxId) {
  //       maxId = item.id;
  //     }
  //   });
  //   return setLastPost(maxId);
  // }




  

  useEffect(() => {

    const GetDataPost = (messageId: any = 0, oldMessages: any = false) => {
      GetPosts(messageId, oldMessages)
        .then((item) => {
          setPosts(item);
          setCount(parseInt(item[item.length - 1].id));
        })
        .catch((err) => {
          console.error(err);
        });
    }

    let id: any;
    id = setInterval(() => {
      GetDataPost(count);
    }, 5000);

    return () => {
      clearInterval(id);
    };
  }, [count]);

  return (
    <div className="container">
      {posts.map((item) => (
        <Post
          key={item.id}
          author={item.author}
          content={item.content}
          date={item.date}
        />
      ))}
    </div>
  );
};

export default Posts;
