import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { updateUserSchema } from "../../utils/validations/schemas/userValidation";

export const useUserFormState = ({ initialData = null }) => {
  const [selectedTags, setSelectedTags] = useState(initialData?.tags.map(tag => tag.name) || []);
  const [image, setImage] = useState(initialData?.profilePicture || null);

  // ✅ `react-hook-form` の設定
  const { 
    register, 
    handleSubmit, 
    setError, 
    clearErrors, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(updateUserSchema),
    defaultValues: {
      username: initialData?.username || "",
      bio: initialData?.bio || null,
    },
  });

  return {
    register,
    handleSubmit,  
    setError,
    clearErrors,
    errors,
    image,
    setImage,
    selectedTags,
    setSelectedTags,
  };
};
