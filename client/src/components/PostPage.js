import { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { useParams } from "react-router-dom";
import { faReply, faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CommentForm from "./CommentForm";
import LoadingPage from "./LoadingPage";
import AOS from "aos";

const PostPage = () => {
  const [post, setPost] = useState([]);
  const [commentCap, setCommentCap] = useState(5);
  const [isLoading, setIsLoading] = useState(true);
  const [isReplyFormOpenFor, setIsReplyFormOpenFor] = useState(null);
  const [isRepliesOpenFor, setIsRepliesOpenFor] = useState(null);
  const [formData, setFormData] = useState({
    message: "",
  });

  const { isLoggedIn, user } = useAuth();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  let submitHandler = (e, commentId) => {
    e.preventDefault();

    const reply = {
      description: formData.message,
      username: user.username,
      commentId: commentId,
    };

    fetch(`/comment/reply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(reply),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add reply");
        }
        return response.json();
      })
      .then((updatedComment) => {
        setPost((prevPost) => {
          console.log(updatedComment.replies);
          return {
            ...prevPost,
            comments: prevPost.comments.map((comment) => (comment._id === commentId ? { ...comment, replies: updatedComment.replies } : comment)) || [],
          };
        });
        setIsReplyFormOpenFor(false);
        setFormData({ message: "" });
      })
      .catch((error) => console.error("Error creating reply:", error));
  };

  const showMoreHandler = () => {
    setCommentCap(post.comments?.length);
  };

  const showLessHandler = () => {
    setCommentCap(5);
  };

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
        <div className="flex flex-col bg-gradient-to-r from-red-900/90 via-red-600/90 to-red-900/90 rounded-2xl w-full p-6 my-5 shadow-lg backdrop-blur-sm border border-red-800/40 transition">
          <section className="flex flex-col">
            <h1 className="text-4xl font-extrabold movie-header text-white tracking-tight max-sm:text-2xl">{post.title}</h1>
            <p className="text-gray-200 font-medium pt-4 leading-relaxed">{post.description}</p>
          </section>
          <section className="flex justify-between items-center text-gray-300 font-semibold pt-6 text-sm">
            <p>{post?.date}</p>
            <h1 className="italic">
              Posted by <span className="text-white">{post.username}</span>
            </h1>
          </section>
        </div>
        <div className="flex flex-col w-full transition ease-in-out">
          {post.comments?.slice(0, commentCap).map((comment, index) => (
            <div key={index}>
              <div className="flex justify-end">
                <div className="flex flex-col bg-gradient-to-r from-slate-900/90 via-slate-700/80 to-slate-900/90 w-full p-5 my-3 rounded-xl border border-slate-700 shadow-md hover:shadow-xl transition">
                  <section>
                    <p className="text-gray-100 font-medium leading-relaxed">{comment.description}</p>
                  </section>

                  <section className="flex justify-end items-center text-gray-300 font-semibold mt-4">
                    <h1 className="text-sm">{comment.username}</h1>
                    {isLoggedIn && <FontAwesomeIcon className="ml-4 text-lg cursor-pointer hover:text-red-500 transition" icon={faReply} onClick={() => setIsReplyFormOpenFor(isReplyFormOpenFor === comment._id ? null : comment._id)} />}
                    {comment.replies?.length > 0 && <FontAwesomeIcon className="ml-4 text-lg cursor-pointer hover:text-red-500 transition" icon={isRepliesOpenFor === comment._id ? faAngleDown : faAngleRight} onClick={() => setIsRepliesOpenFor(isRepliesOpenFor === comment._id ? null : comment._id)} />}
                  </section>
                </div>
              </div>
              {isReplyFormOpenFor === comment._id && (
                <div className="flex flex-col items-end bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-xl p-5 shadow-md border border-red-700 mt-2">
                  <textarea className="w-full rounded-lg p-3 text-black focus:ring-2 focus:ring-red-500 outline-none" name="message" placeholder={`Reply as ${user.username}...`} value={formData.message} onChange={handleChange} />
                  <button className="border border-white bg-red-700 movie-header text-lg px-4 py-2 rounded-lg mt-3 hover:bg-red-800 transition" onClick={(e) => submitHandler(e, comment._id)}>
                    Reply
                  </button>
                </div>
              )}
              {isRepliesOpenFor === comment._id && (
                <div className="pl-6 mt-2 space-y-2">
                  {comment?.replies?.map((reply) => (
                    <div key={reply._id} className="flex flex-col bg-gray-100 w-full p-3 rounded-lg border border-gray-300 shadow-sm">
                      <p className="text-gray-800">{reply.description}</p>
                      <div className="flex w-full justify-end text-gray-600 text-sm font-medium mt-2">
                        <h1 className="italic">{reply.username}</h1>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
          {commentCap < (post.comments?.length || 0) && (
            <button onClick={showMoreHandler} className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-full p-3 my-4 border border-black text-center text-lg font-semibold hover:shadow-lg transition">
              Show more
            </button>
          )}
          {commentCap === (post.comments?.length || 0) && post.comments?.length > 5 && (
            <button onClick={showLessHandler} className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-lg w-full p-3 my-4 border border-black text-center text-lg font-semibold hover:shadow-lg transition">
              Show less
            </button>
          )}
        </div>
        {isLoggedIn ? (
          <CommentForm id={id} addNewComment={addNewComment} />
        ) : (
          <div className="bg-gradient-to-r from-red-900 via-red-600 to-red-900 text-white rounded-xl w-3/4 p-5 my-5 border border-black shadow-md">
            <a href="/login">
              <h1 className="text-center text-2xl font-semibold movie-header">Login to join the discussion</h1>
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;
