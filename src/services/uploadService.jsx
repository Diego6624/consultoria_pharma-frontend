import api from "./apiClient.jsx";

export const uploadImage = (file, config = {}) => {
  const formData = new FormData();
  formData.append("file", file);
  return api.post("/api/admin/upload/image", formData, config);
};
