import { css } from "@emotion/css";
import { useRouter } from "next/router";
import Post from "../../components/Post";
import Layout from "../../components/Layout";
import usePost from "../../hooks/post/usePost";
import breakpoints from "../../shared/breakpoints";

const PostPageCss = css`
  position: relative;
  padding: 0 20%;
  padding-top: 160px;

  @media ${breakpoints.tablet} {
    padding-left: 10%;
    padding-right: 10%;
  }

  @media ${breakpoints.phone} {
    padding: 0 5%;
    padding-top: 120px;
  }
`;

function PostPage() {
  const router = useRouter();
  const { postId } = router.query;
  const { post } = usePost(postId);

  return (
    <Layout>
      <div className={PostPageCss}>
        {post ? (
          <Post
            key={post.id}
            id={post.id}
            userId={post.user_id}
            picture={post.picture}
            name={post.name}
            createdAt={post.created_at}
            context={post.context}
            isLiked={post.is_liked}
            likeCount={post.like_count}
            commentCount={post.comment_count}
            comments={post.comments}
            showComments
          />
        ) : (
          ""
        )}
      </div>
    </Layout>
  );
}

export default PostPage;
