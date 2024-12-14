import { css } from "@emotion/css";
import Post from ".";
import usePosts from "../../hooks/post/usePosts";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const PostsCss = css`
  .nullMessage {
    text-align: center;
    margin-top: 50px;
  }
`;

function Posts({ userId, isMyself }) {
  const { posts, updatePostsByCursor } = usePosts(userId);
  useInfiniteScroll(() => updatePostsByCursor());
  
  const postInfo = (post) => ({
    userId: post.user_id,
    picture: post.picture,
    name: post.name,
    createdAt: post.created_at,
    context: post.context,
    isLiked: post.is_liked,
    likeCount: post.like_count,
    commentCount: post.comment_count
  });

  return (
    <div className={PostsCss}>
      {posts?.map((post) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <Post key={post.id} id={post.id} {...postInfo(post)} />
      ))}
      {posts && posts.length === 0 && (
        <div className="nullMessage">
          {isMyself ? "沒有貼文，因為你沒有朋友" : "他還沒有貼文"}
        </div>
      )}
    </div>
  );
}

export default Posts;
