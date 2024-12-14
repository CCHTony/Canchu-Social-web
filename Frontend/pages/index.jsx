import Head from "next/head";
import { css } from "@emotion/css";
import Layout from "../components/Layout";
import Sidebar from "../components/Home/Sidebar";
import UploadAPost from "../components/Post/UploadAPost";
import useMyProfile from "../hooks/user/useMyProfile";
import Posts from "../components/Post/Posts";
import breakpoints from "../shared/breakpoints";

const HomeCss = css`
  .container {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 125px;

    .feedsWall {
      width: 55vw;
      /* min-width: 500px; */
    }
  }

  @media ${breakpoints.tablet} {
    .container {
      .feedsWall {
        width: 85%;
      }
    }
  }
`;

function Home() {
  const { user } = useMyProfile();
  // console.log(posts)
  return (
    <>
      <Head>
        <title>CanChu</title>
      </Head>
      <Layout>
        <div className={HomeCss}>
          <div className="container">
            <Sidebar user={user} />
            <div className="feedsWall">
              <UploadAPost user={user} />
              {user && <Posts />}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Home;
