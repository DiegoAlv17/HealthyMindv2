import React, { useEffect, useState, useContext } from "react";
import {
  getPosts,
  createPost,
  deletePost,
  updatePost,
} from "../api/PostRequest.js";
import { Trash2,Edit } from "lucide-react";

import { AuthContext } from "../context/AuthContext";

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
  });
  const [editingPost, setEditingPost] = useState(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (err) {
        setError("Error fetching posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingPost) {
        // Actualizar el post existente
        const updatedPost = await updatePost(editingPost._id, newPost);
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post._id === editingPost._id ? updatedPost : post
          )
        );
        setEditingPost(null); // Salir del modo de edición
      } else {
        // Crear un nuevo post
        const response = await createPost(newPost);
        const createdPost = response.post;
        setPosts((prevPosts) => [createdPost, ...prevPosts]);
      }
      setNewPost({ title: "", content: "" }); // Reiniciar el formulario
    } catch (err) {
      console.error("Error creating or updating post:", err);
      setError("Error creating or updating post. Please try again later.");
    }
  };

  const handleDelete = async (postId) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== postId));
    } catch (err) {
      console.error("Error deleting post:", err);
      setError("Error deleting post. Please try again later.");
    }
  };

  const handleEdit = (post) => {
    setEditingPost(post);
    setNewPost({ title: post.title, content: post.content }); // Rellena el formulario con los datos existentes
  };

  if (loading) return <div>Loading posts...</div>;

  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-pink-600 mb-4">Posts</h1>

      {/* Formulario para crear o editar un post */}
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          type="text"
          name="title"
          required
          value={newPost.title}
          onChange={handleChange}
          placeholder="Enter post title"
          className="mb-2 p-2 border rounded w-full border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <textarea
          name="content"
          value={newPost.content}
          required
          onChange={handleChange}
          placeholder="Enter post content"
          className="mb-2 p-2 border rounded w-full border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button type="submit" className="p-2 bg-pink-500 text-white rounded hover:bg-pink-600 transition-colors">
          {editingPost ? "Update Post" : "Create Post"}
        </button>
        {editingPost && (
          <button
            type="button"
            onClick={() => {
              setEditingPost(null); // Salir del modo de edición
              setNewPost({ title: "", content: "" });
            }}
            className="p-2 bg-gray-500 text-white rounded ml-2 hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
        )}
      </form>

      {/* Mostrar los posts existentes */}
      {!posts ? (
        <p>No posts available.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post._id} className="p-4 border rounded-lg shadow-sm bg-white hover:bg-gray-50 transition-colors">
              <h2 className="text-xl font-semibold text-pink-700">{post.title}</h2>
              <p className="text-gray-600">{post.content}</p>
              <div className="flex items-center mt-2">
                {post.author?.profilePicture && (
                  <img
                    src={post.author.profilePicture}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full mr-2"
                  />
                )}
                <div className="text-sm text-gray-500">
                  By: {post.author?.name || "Anonymous"} |{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>
              {post.author._id === user?.id && (
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Post;