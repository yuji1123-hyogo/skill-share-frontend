import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { clubValidationSchema } from "../../utils/validations/schemas/clubValidation";

export const useClubFormState = ({ initialData = null }) => {
  const [selectedTags, setSelectedTags] = useState(initialData?.tags.map(tag => tag.name) || []);
  const [image, setImage] = useState(initialData?.themeImage || null);
  const [coordinates, setCoordinates] = useState(initialData?.location?.coordinates || null);
  const [address, setAddress] = useState(initialData?.location?.address || null);

  // ✅ `react-hook-form` の設定
  const { 
    register, 
    handleSubmit, 
    setError, 
    clearErrors, 
    formState: { errors } 
  } = useForm({
    resolver: yupResolver(clubValidationSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || null,
    },
  });

  return {
    register,
    handleSubmit,  // ✅ `useClubMutation` で使用
    setError,
    clearErrors,
    errors,
    image,
    setImage,
    selectedTags,
    setSelectedTags,
    coordinates,
    setCoordinates,
    address,
    setAddress,
  };
};
