import axios from '../api/axios';


export const getPosts = async () => {
  try {
    const response = await axios.get("/posts"); // ruta relativa
    return response.data; // Devuelve el array de posts
  } catch (error) {
    console.error("Error fetching posts", error);
    throw error;
  }
};

export const createPost = async (post) => {
  try {
    const response = await axios.post("/posts", post); // ruta relativa
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error creating post", error);
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const response = await axios.delete(`/posts/${postId}`); // Ruta relativa con el ID del post
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error deleting post", error);
    throw error;
  }
};

export const updatePost = async (postId, post) => {
  try {
    const response = await axios.put(`/posts/${postId}`, post); // Ruta relativa con el ID del post
    return response.data; // Devuelve la respuesta del servidor
  } catch (error) {
    console.error("Error updating post", error);
    throw error;
  }
}


