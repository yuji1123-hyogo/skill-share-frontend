import { useCreateFeedbackMutation } from "../../../features/RTKQuery/apiSlice";
import { useFeedbackForm } from "../../../hooks/feedback/useFeedbackForm";
import ErrorMessage from "../../atoms/errors/ErrorMessage";
import ImageUploader from "../ImageUploader";

const FeedbackForm = ({ eventId, onSuccess = () => {} }) => {
  const [createFeedback, { isLoading }] = useCreateFeedbackMutation();
  
  const {
    register,
    handleSubmit,
    fieldErrors,
    submitError,
    setSubmitError,
    mediaUrl,
    setMediaUrl,
    resetForm,
  } = useFeedbackForm();

  const onSubmit = async (data) => {
    try {
      setSubmitError(null);
      
      const feedbackData = {
        content: data.content,
        media: mediaUrl,
      };

      await createFeedback({
        eventId,
        feedbackData,
      }).unwrap();

      resetForm();
      toast.success("フィードバックを送信しました");
        
    } catch (error) {
      setSubmitError(error.message || "フィードバックの送信に失敗しました");
    }
  };

  return (
    <div className="bg-dark-secondary rounded-lg  border border-dark-accent shadow-lg p-6 space-y-4">
      <p className="text-sm font-bold text-gray-200 mb-6">フィードバックを作成する</p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <textarea
            {...register("content")}
            placeholder="フィードバックを入力"
            className="w-full p-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 placeholder-gray-500"
            rows={4}
          />
          {fieldErrors.content && (
            <ErrorMessage message={fieldErrors.content.message} />
          )}
        </div>

        <ImageUploader
          image={mediaUrl}
          setImage={setMediaUrl}
          label="画像を追加（任意）"
          mode="event"
        />

        {submitError && <ErrorMessage message={submitError} />}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "送信中..." : "送信"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm; 