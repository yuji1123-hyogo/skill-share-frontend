import React from "react";
import { useSubmitClub } from "../../../hooks/club/useSubmitClub";
import ImageUploader from "../ImageUploader";
import TagEditor from "../TagEditor";
import { useClubFormState } from "../../../hooks/club/useClubFormState";
import LocationPicker from "../LocationPicker";

const ClubForm = ({ mode = "create", initialData = null}) => {
  const { 
    register, 
    handleSubmit, 
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
  } = useClubFormState({ initialData });

  const { handleSubmitClub, isCreating, isUpdating, createError, updateError } = useSubmitClub({ mode, initialData });

  return (
    <div className="max-w-2xl mx-auto bg-dark-secondary rounded-lg shadow-xl p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">
        {mode === "edit" ? "クラブ編集" : "クラブ作成"}
      </h2>

      <form onSubmit={handleSubmit((data) => 
        handleSubmitClub(data, image, selectedTags, setError, coordinates, address)
      )} className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="block text-gray-200 font-medium">クラブ名(必須)</label>
            <input
              {...register("name")}
              onChange={() => clearErrors("name")}
              className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block text-gray-200 font-medium">説明(任意)</label>
            <textarea
              {...register("description")}
              className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[120px] resize-y"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>

          <ImageUploader 
            image={image} 
            setImage={setImage} 
            mode="club"
            className="mb-6" 
          />

          <div className="mt-6">
            <h3 className="text-gray-200 font-medium mb-2">タグ(任意)</h3>
            <TagEditor
              selectedTags={selectedTags}
              setSelectedTags={setSelectedTags}
            />
          </div>

          <div className="mt-6">
            <h3 className="text-gray-200 font-medium mb-2">主な活動場所(必須)</h3>
            <LocationPicker
              setCoordinates={setCoordinates}
              setClubAddress={setAddress}
              clubs={initialData ? [initialData] : []}
              mode="create-or-edit"
            />
          </div>
        </div>

        {(createError || updateError) && (
          <p className="text-red-500 text-sm mt-4">
            {createError?.message || updateError?.message}
          </p>
        )}

        <button
          type="submit"
          disabled={isCreating || isUpdating}
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
        >
          {isCreating && "作成中..."}
          {isUpdating && "更新中..."}
          {!isCreating && mode === "create" && "クラブを作成"}
          {!isUpdating && mode === "edit" && "クラブ情報を更新"}
        </button>
      </form>
    </div>
  );
};

export default ClubForm;
