import React from "react";
import { TPost } from "../../types/Posts.type";
import './Suggestions.css';

export const Suggestions = (props: any) => {
  return (
    <div className='suggestions'>
      { props.posts.map((post: TPost) => 
        <div key={post.id}>
          <h2>{post.title}</h2>
          <p>{post.author}</p>
        </div>
      )}
    </div>
  )
}