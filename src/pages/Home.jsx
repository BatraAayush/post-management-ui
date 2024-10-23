import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts, deletePost } from "../features/postSlice";
import Loader from "../components/Loader";
import { MdEdit, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants";

const Home = () => {
  const { posts, loading } = useSelector((store) => store.posts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);
  const removePost = (id) => {
    dispatch(deletePost(id));
  };

  const editPost = (id) => {
    navigate(`/edit/${id}`);
  };

  const sortPostsByTime = () => {
    const reverseArray = [];
    for (let i = 0; i < posts.length; i++) {
      reverseArray.push(posts[posts.length - i - 1]);
    }
    return reverseArray;
  };

  return loading ? (
    <div className="bg-gray-200">
      <Loader />
    </div>
  ) : (
    <div className="flex flex-col items-center py-4 gap-4 bg-gray-200 min-h-[92vh]">
      {sortPostsByTime().length === 0 ? (
        <h2 className="text-xl font-bold">No Posts</h2>
      ) : (
        sortPostsByTime().map(({ _id, title, description, image }) => (
          <div
            key={_id}
            className="w-[95%] md:w-[60%] lg:w-[40%] max-w-[40rem] flex flex-col pb-4 pt-8 gap-4 bg-white rounded-md items-center relative"
          >
            <div className="absolute right-2 top-2 flex gap-2">
              <button>
                <MdEdit
                  className="text-green-600 w-6 h-6 hover:text-green-800"
                  onClick={() => editPost(_id)}
                />
              </button>
              <button>
                <MdDelete
                  className="text-red-600 w-6 h-6 hover:text-red-800"
                  onClick={() => removePost(_id)}
                />
              </button>
            </div>
            <h2 className="text-xl font-bold capitalize px-4 break-all">{title}</h2>
            <div className="bg-gray-400 w-full flex justify-center">
              <img
                className="h-[15rem] md:h-[20rem] object-cover"
                src={`${BASE_URL}/${image}`}
                alt={title}
              />
            </div>

            <p className="px-4 pb-0 break-all w-full">{description}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
