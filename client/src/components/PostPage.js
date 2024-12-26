import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentForm from "./CommentForm";
import AOS from "aos";

const PostPage = () => {
  const [post, setPost] = useState("");

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
        console.log(post);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);
  return (
    <div className="flex flex-col w-full items-center pt-10 pb-20">
      {!post ? (
        <p>No post</p>
      ) : (
        <div className="w-4/6 flex flex-col items-center max-sm:w-11/12">
          <div className="flex bg-gradient-to-r from-red-900 via-red-600 to-red-900 rounded-lg w-full p-3 my-3 relative max-sm:w-full max-sm:flex-col max-sm:my-1">
            <section className="flex flex-row">
              <div className="flex flex-col items-start max-sm:w-full">
                <h1 className="text-3xl movie-header max-sm:text-lg">{post.title}</h1>
                <p className="text-white font-bold pt-5 text-start">{post.description}</p>
              </div>
            </section>
            <section className="absolute bottom-3 right-3 text-white font-bold max-sm:static max-sm:flex max-sm:justify-end">
              <p>{post?.date}</p>
              <h1 className="text-xl">{post.username}</h1>
            </section>
          </div>
          <div className="flex flex-col w-full items-end">
            {post.comments.map((comment, index) => (
              <div className="flex flex-col bg-gradient-to-r from-slate-800 via-slate-600 to-slate-800 w-3/4 p-3 my-3 relative rounded-tl-lg rounded-bl-lg max-sm:w-full max-sm:flex-col max-sm:rounded-tr-lg max-sm:rounded-br-lg max-sm:my-1">
                <section className="flex flex-row">
                  <div className="flex flex-col items-start max-sm:w-full">
                    <p className="text-white font-bold pt-5 pl-5 text-start">{comment.description}</p>
                  </div>
                </section>
                <section className="flex justify-end text-white font-bold max-sm:static max-sm:flex max-sm:justify-end">
                  {/* <p>{comment?.date}</p> */}
                  <h1 className="text-xl">{comment.username}</h1>
                </section>
              </div>
            ))}
          </div>
          <CommentForm />
        </div>
      )}
    </div>
  );
};

export default PostPage;
