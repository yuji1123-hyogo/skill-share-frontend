import { useState } from "react";
import { useSharedArticleForm } from "../../../hooks/sharearticle/useSharedArticleForm";
import { useCreateSharedArticleMutation } from "../../../features/RTKQuery/apiSlice";
import { toast } from "react-toastify"; 
import ErrorMessage from "../../atoms/errors/ErrorMessage";
import TagEditor from "../TagEditor";

const SharedArticleForm = ({ eventId, onSuccess = () => {} }) => {
  const [createArticle] = useCreateSharedArticleMutation();
  const [tags, setTags] = useState([]);
  const [error, setError] = useState(null);

  const { register, handleSubmit, errors, isSubmitting, reset } = useSharedArticleForm();

  const onSubmitHandler = async (data) => {
    try {
      setError(null);
      await createArticle({
        eventId,
        articleData: {
          ...data,
          tags,
        },
      }).unwrap();
      
      reset();
      setTags([]);
      toast.success("記事を共有しました");
    } catch (err) {
      setError(err.message || "記事の共有に失敗しました");
    }
  };

  return (
    <div className="bg-dark-secondary rounded-lg  border border-dark-accent shadow-lg p-6 space-y-4">
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div className="space-y-4">
          <div>
            <input
              {...register("title")}
              placeholder="記事のタイトル"
              className="w-full p-2 border rounded"
            />
            {errors.title && (
              <ErrorMessage message={errors.title.message} />
            )}
          </div>

          <div>
            <input
              {...register("url")}
              placeholder="記事のURL"
              className="w-full p-2 border rounded"
            />
            {errors.url && (
              <ErrorMessage message={errors.url.message} />
            )}
          </div>

          <div>
            <textarea
              {...register("description")}
              placeholder="記事の説明（任意）"
              className="w-full p-2 border rounded"
              rows={4}
            />
            {errors.description && (
              <ErrorMessage message={errors.description.message} />
            )}
          </div>
        </div>

        <div className="pt-4 border-t border-dark-accent">
          <h3 className="text-gray-200 text-sm font-medium mb-3">
            タグを追加（最大5つ）
          </h3>
          <TagEditor
            selectedTags={tags}
            setSelectedTags={setTags}
            maxTags={5}
          />
        </div>

        {error && <ErrorMessage message={error} />}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {isSubmitting ? "投稿中..." : "投稿する"}
          </button>
        </div>
      </form>


    </div>
  );
};

export default SharedArticleForm; 