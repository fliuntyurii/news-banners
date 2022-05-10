import { TPost } from "../../types/Posts.type";
import './Posts.css'

export const Posts = (props: any) => {
  return (
      <div className="postsList">
        { props.posts.map((post: TPost) => 
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.author}</p>
          </div>
        )}
      </div>
  )
}