import React, { useEffect, useState } from "react";
import { GetPosts } from "../../API/posts.api";
import { Message } from "../../Models/message";
import Post from "./Post/Post";
import '../Posts/posts.scss'


const Posts = () => {
  const [posts, setPosts] = useState<Message[]>([]);
  const [newPosts, setNewPosts] = useState<Message[]>([]);
  const [lastPost, setLastPost] = useState<Number>(0);

  function GetLastPost(posts:any) {
    let maxId = 0;
    posts.forEach((item: { id: number; }) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return setLastPost(maxId)
  }


  function GetDataPost(messageId:any = 0, oldMessages:any = false) {
    GetPosts(messageId, oldMessages)
  .then((item) => {
    setPosts(item);
    GetLastPost(item)
  })
  .catch((err) => {
    console.error(err);
  });
  }

  function GetDataNewPost(messageId:any = 0, oldMessages:any = false) {
    GetPosts(messageId, oldMessages)
      .then((item) => {
    console.log(lastPost);
    
    setNewPosts(item);
  })
  .catch((err) => {
    console.error(err);
  });
  }

  useEffect(() => {
    let id: any;
    GetDataPost()
    id = setInterval(() => {       
      GetDataPost();
    }, 5000);

    return () => {
      clearInterval(id)
    }
  }, []);


  
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
