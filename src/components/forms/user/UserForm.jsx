import React from 'react'
import { useSelector } from 'react-redux';
import { useGetPublicUserQuery } from '../../../features/RTKQuery/apiSlice';
import { useSubmitUser } from '../../../hooks/user/useSubmitUser';
import { useUserFormState } from '../../../hooks/user/useUserFormState';
import ImageUploader from '../ImageUploader';
import TagEditor from '../TagEditor';


function UserForm({setActiveTab}) {
    const currentUserId = useSelector(state => state.auth.userId)
    const { data, error, isLoading } = useGetPublicUserQuery(currentUserId);

    const { 
        register,
        handleSubmit,  
        clearErrors,
        errors,
        image,
        setImage,
        selectedTags,
        setSelectedTags,
    } = useUserFormState({ initialData:data.user });
   
    const {
        handleSubmitUser, 
        isUpdating, 
        updateError 
    } = useSubmitUser();
   
    if (isLoading) return <p>ロード中...</p>;
    if (error) return <p>エラー: {error.message}</p>;

     return (
        <div className="max-w-2xl mx-auto  mt-4 bg-dark-secondary rounded-lg shadow-xl p-6 space-y-6">
            <div className="space-y-4">
                <ImageUploader
                    image={image}
                    setImage={setImage}
                    className="mb-6"
                    mode='post'
                />
                
                <TagEditor
                    selectedTags={selectedTags}
                    setSelectedTags={setSelectedTags}
                    className="mb-6"
                />

                <div className="space-y-2">
                    <label className="block text-gray-200 font-medium">ユーザー名</label>
                    <input
                        {...register("username")}
                        onChange={() => clearErrors("username")}
                        className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="block text-gray-200 font-medium">説明</label>
                    <textarea
                        {...register("bio")}
                        className="w-full px-4 py-2 bg-dark-primary border border-dark-accent rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                    />
                    {errors.bio && (
                        <p className="text-red-500 text-sm">{errors.bio.message}</p>
                    )}
                </div>
            </div>

            {updateError && (
                <p className="text-red-500 text-sm">{updateError.message}</p>
            )}

            <form onSubmit={handleSubmit(async (data) => handleSubmitUser({data, image, selectedTags}))}>
                <button
                    type="submit"
                    disabled={isUpdating}
                    className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                    {isUpdating && "更新中..."}
                    {!isUpdating && "ユーザー情報を更新"}
                </button>
            </form>
        </div>
     );
   };

export default UserForm