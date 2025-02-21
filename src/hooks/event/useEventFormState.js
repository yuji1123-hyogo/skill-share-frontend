import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { eventValidationSchema } from "../../utils/validations/schemas/eventValidation";

const useEventFormState = () => {
    const [image, setImage] = useState(null);
    const [eventTags, setEventTags] = useState([]);

    
  const {reset,register, handleSubmit,  formState: { errors } } = useForm({
    resolver:yupResolver(eventValidationSchema),
    defaultValues: {
      name: "",
      description: null,
      date: null,
    },
  });

  return {
    reset,
    register,
    handleSubmit,
    errors,
    image,
    setImage,
    eventTags,
    setEventTags,
  };
};

export default useEventFormState;
