import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, getAllPosts, updatePost } from "../features/postSlice";
import { BASE_URL } from "../constants";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editPostId, setEditPostId] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    if (params?.id && posts.length > 0) {
      setEditPostId(params.id);
      const editPostDetails = posts.find(({ _id }) => _id === params.id);
      if (editPostDetails) {
        setTitle(editPostDetails.title);
        setDescription(editPostDetails.description);
        setImage(null);
        setImagePreview(`${BASE_URL}/${editPostDetails.image}`);
      }
    } else {
      setEditPostId(null);
      setTitle("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
    }
  }, [params?.id, posts]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postDetails = { title, description, image };

    if (editPostId) {
      dispatch(updatePost({ postId: editPostId, postData: postDetails }));
    } else {
      dispatch(createPost(postDetails));
    }

    navigate("/");
  };

  return (
    <div className="min-h-[92vh] p-4 py-8 bg-gray-200">
      <div className="p-4 w-[100%] sm:w-[60%] md:w-[50%] lg:w-[40%] max-w-[30rem] m-auto border-4 border-dark rounded-md bg-white">
        <h1 className="text-2xl font-bold mb-4 text-center">
          {editPostId ? "Edit" : "Create"} Post
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-dark">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-dark">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-medium text-dark">
              Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-400 rounded-md p-2"
              accept="image/*"
              required={!editPostId}
            />
          </div>

          {imagePreview && (
            <div className="mt-4">
              <img
                src={imagePreview}
                alt="Selected Preview"
                className="w-full h-auto max-h-[15rem] object-contain"
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full border-2 font-semibold border-dark bg-dark text-white py-2 rounded-md hover:bg-white hover:text-dark"
          >
            {editPostId ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
