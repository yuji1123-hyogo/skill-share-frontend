import { toast } from "react-toastify";
import { useCreateEventMutation } from "../../features/RTKQuery/apiSlice";

const useCreateEvent = ({reset,setImage,setEventTags}) => {
  const [createEvent, { isLoading : isCreating}] = useCreateEventMutation();

  const handleCreateEvent = async (eventData) => {
    console.log("eventdata",eventData)
    try{
      await createEvent(eventData).unwrap();
      toast.success(`イベントを作成しました：${eventData.name}`);
    }catch(err){
      toast.error(err.message ||"イベントの作成に失敗しました");
    }
    // フォームのリセット処理
    reset();          // React Hook Form のリセット
    setImage(null);   // 画像のリセット
    setEventTags([]); // タグのリセット
  };

  return { handleCreateEvent, isCreating };
};

export default useCreateEvent;
