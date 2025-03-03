export const useFormSubmitHandler = (mutationHook, options = {}) => {
  const [submitFunction, { isLoading, error }] = mutationHook();
  
  const {
    successMessage = "操作が成功しました",
    errorMessage = "操作に失敗しました",
    onSuccess = null,
    onError = null,
    transformData = (formData, additionalData) => ({ ...formData, ...additionalData }),
  } = options;

  const handleSubmit = async (formData, additionalData = {}) => {
    try {
      const dataToSubmit = transformData(formData, additionalData);
      const result = await submitFunction(dataToSubmit).unwrap();
      
      // 成功時の処理
      toast.success(successMessage);
      if (onSuccess && typeof onSuccess === 'function') {
        onSuccess(result);
      }
      
      return result;
    } catch (error) {
      // エラー時の処理
      toast.error(error.message || errorMessage);
      if (onError && typeof onError === 'function') {
        onError(error);
      }
      
      throw error;
    }
  };

  return {
    handleSubmit,
    isSubmitting: isLoading,
    submitError: error,
  };
}; 