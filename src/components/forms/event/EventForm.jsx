import React from "react";
import useCreateEvent from "../../../hooks/event/useCreateEvent";
import TagEditor from "../TagEditor";
import useEventFormState from "../../../hooks/event/useEventFormState";
import ImageUploader from "../ImageUploader";
import LocationPicker from "../LocationPicker";



const EventForm = ({clubId}) => {
    
    const { 
        reset,
        register,
        handleSubmit,
        errors,
        image,
        setImage,
        eventTags,
        setValue,
        setEventTags 
      } = useEventFormState();
    const { handleCreateEvent, isCreating } = useCreateEvent({reset,setImage,setEventTags});

    const handleLocationSelect = ({ address }) => {
        setValue('location', address);
    };

  return (
    <div className="max-w-2xl mx-auto bg-dark-secondary rounded-lg shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">イベント作成</h2>

      <ImageUploader 
        image={image} 
        setImage={setImage} 
        mode="event"
        className="mb-6" 
      />

      <div className="mb-6">
        <h3 className="text-gray-200 font-medium mb-2">タグ</h3>
        <TagEditor
          selectedTags={eventTags}
          setSelectedTags={setEventTags}
        />
      </div>

      <form onSubmit={handleSubmit((data)=> {handleCreateEvent({...data,club:clubId,picture:image,eventtags:eventTags|| []})})} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-gray-200 font-medium">イベント名</label>
          <input
            {...register("name")}
            className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="block text-gray-200 font-medium">説明</label>
          <textarea
            {...register("description")}
            className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-gray-200 font-medium">日付</label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
        </div>

        {/* <div className="space-y-2">
          <label className="block text-gray-200 font-medium">場所</label>
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </div> */}

        {errors.club && <p className="text-red-500 text-sm">{errors.club.message}</p>}

        <button
          type="submit"
          disabled={isCreating}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 mt-6"
        >
          {isCreating ? "作成中..." : "作成"}
        </button>
      </form>
    </div>
  );
};

export default EventForm;
