import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import LoadingPage from "./LoadingPage";
import AOS from "aos";

const PostPage = () => {
  const [post, setPost] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  let { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(`/message/${id}`);
        const post = await response.json();
        setPost(post);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, [id]);

  const addNewComment = (newComment) => {
    setPost((prevPost) => ({
      ...prevPost,
      comments: [...prevPost.comments, newComment],
    }));
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div className="flex flex-col w-full items-center pt-10 pb-20">
      <div className="w-4/6 flex flex-col items-center max-sm:w-11/12">
        <div className="flex flex-col bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg w-full p-3 my-3 relative max-sm:w-full max-sm:flex-col max-sm:my-1">
          <section className="flex flex-row">
            <div className="flex flex-col items-start max-sm:w-full">
              <h1 className="text-3xl movie-header max-sm:text-lg">{post.title}</h1>
              <p className="text-white font-bold pt-5 text-start">{post.description}</p>
            </div>
          </section>
          <section className="text-white font-bold flex justify-end pt-3">
            <p>{post?.date}</p>
            <h1 className="text-md max-sm:text-sm">Post by {post.username}</h1>
          </section>
        </div>
        <div className="flex flex-col w-full items-end">
          {post.comments.map((comment, index) => (
            <div className="flex flex-col bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 w-3/4 p-3 my-3 relative rounded-tl-lg rounded-bl-lg max-sm:w-full max-sm:flex-col max-sm:rounded-tr-lg max-sm:rounded-br-lg max-sm:my-1">
              <section className="flex flex-row p-2">
                <div className="flex flex-col items-start justify-start max-sm:w-full">
                  <p className="text-white font-bold text-start">{comment.description}</p>
                </div>
              </section>
              <section className="flex justify-end text-white font-bold max-sm:static max-sm:flex max-sm:justify-end">
                {/* <p>{comment?.date}</p> */}
                <h1 className="text-xl max-sm:text-sm">{comment.username}</h1>
              </section>
            </div>
          ))}
        </div>
        <CommentForm id={id} addNewComment={addNewComment} />
      </div>
    </div>
  );
};

export default PostPage;