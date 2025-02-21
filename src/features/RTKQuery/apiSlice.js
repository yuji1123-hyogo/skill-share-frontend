import { createApi } from "@reduxjs/toolkit/query/react";



import { getUserClubsAPI, getPublicUserAPI, toggleFollowUserAPI, updateUserAPI, getFollowListAPI } from "../../api/clients/userApi.js";
import { getEventByIdAPI, createEventAPI, participateInEventAPI, updateEventStatusAPI, determineMVPAPI, voteForMVPAPI, distributeExpAPI } from "../../api/clients/eventApi.js";
import { getHomePostsAPI, getUserPostsAPI, getClubPostsAPI, createPostAPI, getPostDetailsAPI } from "../../api/clients/postApi.js";
import { getCommentsByPostIdAPI, getCommentByIdAPI, createCommentAPI, getCommentsByTargetAPI } from "../../api/clients/commentApi.js";
import {getClubDetailAPI,joinClubAPI,updateClubAPI,getClubMembersAPI,getClubEventsAPI, createClubAPI} from "../../api/clients/clubApi.js";
import { formatQueryFnResponse } from "./formatQueryFnUtils.js";
import { 
  createSharedArticleAPI,
  getSharedArticlesByEventAPI,
  getSharedArticleByIdAPI 
} from "../../api/clients/sharedArticleApi.js";
import {
  createFeedbackAPI,
  getFeedbacksByEventAPI,
  getFeedbackByIdAPI
} from "../../api/clients/feedbackApi.js";


export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: () => ({ data: null }),
  tagTypes: ["MyFollowList","User", "MyClubList", "ClubDetail", "EventList", "EventDetail", "HomePostList", "ProfilePostList", "ClubPostList", "Post", "CommentList", "Comment", "CommentList_Post", "CommentList_Article", "CommentList_Feedback", "EventArticles", "SharedArticle", "EventFeedbacks", "Feedback"],
  endpoints: (builder) => ({
    
    // 🔹 クラブ関連
    // 🔹 クラブの作成
    createClub: builder.mutation({
      queryFn: (club) => formatQueryFnResponse(() => createClubAPI(club)), 
      invalidatesTags:(result, error) => [{ type: "User",id:result.userId},{type:"MyClubList"}]
    }), 
    // 🔹 ユーザーが参加しているクラブ一覧
    getUserClubs: builder.query({
      queryFn: () => formatQueryFnResponse(getUserClubsAPI),
        providesTags: [{type:"MyClubList"}],
    }),
    // 🔹 クラブの詳細を取得
    getClubDetail: builder.query({
      queryFn: (clubId) => formatQueryFnResponse(() => getClubDetailAPI(clubId)), // ✅ 修正
      providesTags: (result, error, clubId) => [{ type: "ClubDetail", id: clubId }],
    }),
    // 🔹 クラブに参加
    joinClub: builder.mutation({
      queryFn: ( clubId ) => formatQueryFnResponse(() => joinClubAPI(clubId)), // ✅ 修正
      invalidatesTags: (result, error, clubId) => [{ type: "ClubDetail", id: clubId },{ type: "User",id:result?.data?.userId},{type:"MyClubList"}]
    }),
    // 🔹 クラブの更新
    updateClub: builder.mutation({
      queryFn: ({clubId,updateData}) => formatQueryFnResponse(() => updateClubAPI(clubId,updateData)), // ✅ 修正
      invalidatesTags: (result, error,{ clubId}) => [{ type: "ClubDetail", id: clubId }],
    }),
    // 🔹 クラブのメンバー一覧を取得
    getClubMembers: builder.query({
      queryFn: (clubId) => formatQueryFnResponse(() => getClubMembersAPI(queryArg)), // ✅ 修正
      providesTags: (result, error, clubId) => [{ type: "ClubDetail", id: clubId }],
    }),
    // 🔹 クラブのイベント一覧を取得
    getClubEvents: builder.query({
      queryFn: (clubId ) => formatQueryFnResponse(() => getClubEventsAPI(clubId)), // ✅ 修正
      providesTags: (result, error, clubId) => [{ type: "EventList", id: clubId }],
    }),


    // 🔹 イベント関連
    // 🔹 イベントの詳細を取得
    getEventDetail: builder.query({
      queryFn: (eventId) => formatQueryFnResponse(() => getEventByIdAPI(eventId)), 
      providesTags: (result, error, eventId) => [{ type: "EventDetail", id: eventId }],
    }),
    // 🔹 イベントを作成
    createEvent: builder.mutation({
      queryFn: (event) => formatQueryFnResponse(() => createEventAPI(event)), 
      invalidatesTags: (result, error, event) => [{ type: "EventList", id: event.club }],
    }),
    // 🔹 イベントに参加
    participateInEvent: builder.mutation({
      queryFn: (eventId) => formatQueryFnResponse(() => participateInEventAPI(eventId)), 
      invalidatesTags: (result, error, eventId) => [{ type: "EventDetail", id: eventId }],
    }),
    // 🔹 イベントのステータスを更新
    updateEventStatus: builder.mutation({
      queryFn: (eventId) => formatQueryFnResponse(() => updateEventStatusAPI(eventId)), 
      invalidatesTags: (result, error, eventId) => [
        { type: "EventDetail", id: eventId },
        { type: "EventList", id: result.event.club }
      ],
    }),
    // 🔹 MVP の決定
    determineMVP: builder.mutation({
      queryFn: (eventId) => formatQueryFnResponse(() => determineMVPAPI(eventId)), // ✅ 修正
      invalidatesTags: (result, error, eventId) => [{ type: "EventDetail", id: eventId }],
    }),
    // 🔹 MVP 投票
    voteForMVP: builder.mutation({
      queryFn: ({ eventId,candidateId }) => formatQueryFnResponse(() => voteForMVPAPI({eventId,candidateId})), // ✅ 修正
      invalidatesTags: (result, error,{ eventId}) =>
         {
          console.log("invalidates in vote for mvp",eventId)
          return [{ type: "EventDetail", id: eventId }]
         }
    }),

      // 🔹 経験値の分配
      distributeExp: builder.mutation({
        queryFn: (eventId) => formatQueryFnResponse(() => distributeExpAPI(eventId)), 
      
        invalidatesTags: (result, error, eventId) => {
          if (error || !result) {
            console.warn("Error in distributeExp or empty response:", error);
            return [{ type: "EventDetail", id: eventId }];
          }
        
          const { updatedUsers = [], updatedClub } = result; // デフォルト値を設定
        
          if (updatedUsers.length === 0 && !updatedClub) {
            return [{ type: "EventDetail", id: eventId }];
          }
        
          return [
            ...updatedUsers.map(userId => ({ type: "User", id: userId })),
            ...(updatedClub ? [{ type: "ClubDetail", id: updatedClub }] : []),
            { type: "EventDetail", id: eventId },
          ];
        }
      }),



    // 🔹 ポスト
    getHomePosts: builder.query({
      queryFn: () => formatQueryFnResponse(() => getHomePostsAPI()), 
      providesTags: [{type:"HomePostList"}],
    }),
    getUserPosts: builder.query({
      queryFn: (userId) => formatQueryFnResponse(() => getUserPostsAPI(userId)), 
      providesTags: (result, error, userId) => [{ type: "ProfilePostList", id: userId }],
    }),
    getClubPosts: builder.query({
      queryFn: (clubId) => formatQueryFnResponse(() => getClubPostsAPI(clubId)), 
      providesTags: (result, error, clubId) => [{ type: "ClubPostList", id: clubId }],
    }),
    createPost: builder.mutation({
      queryFn: (postData) => formatQueryFnResponse(() => createPostAPI(postData)), 
      invalidatesTags: (result, error, {club}) => {
        const tags = [{type:"HomePostList"}, { type: "ProfilePostList", id: result.post.author.id }];
        if (club) {
          tags.push({ type: "ClubPostList", id: club });
        }
        return tags;
      },
    }),
    getPostDetails: builder.query({
      queryFn: (postId) => formatQueryFnResponse(() => getPostDetailsAPI(postId)), // ✅ 修正
      providesTags: (result, error, postId) => [{ type: "Post", id: postId }],
    }),

    //コメント関連
    getCommentsByTarget: builder.query({
      queryFn: ({ targetType, targetId }) => 
        formatQueryFnResponse(() => getCommentsByTargetAPI(targetType, targetId)),
      providesTags: (result, error, { targetType, targetId }) => [
        { type: `CommentList_${targetType}`, id: targetId }
      ],
    }),
    getCommentById: builder.query({
      queryFn: (commentId) => 
        formatQueryFnResponse(() => getCommentByIdAPI(commentId)),
      providesTags: (result, error, commentId) => [
        { type: "Comment", id: commentId }
      ],
    }),
    createComment: builder.mutation({
      queryFn: ({ targetType, targetId, content }) => 
        formatQueryFnResponse(() => createCommentAPI(targetType, targetId, content)),
      invalidatesTags: (result, error, { targetType, targetId }) => [
        { type: `CommentList_${targetType}`, id: targetId }
      ],
    }),


    // 🔹 ユーザー関連
    // 🔹 特定ユーザーの公開情報を取得
    getPublicUser: builder.query({
      queryFn: (targetUserId) => formatQueryFnResponse(() => getPublicUserAPI(targetUserId)), // ✅ 修正
      providesTags: (result, error,targetUserId) => [{ type: "User", id: targetUserId }],
    }),
    // 🔹 フォロー / フォロー解除
    toggleFollowUser: builder.mutation({
      queryFn: (targetUserId) => formatQueryFnResponse(() => toggleFollowUserAPI(targetUserId)), // ✅ 修正
      invalidatesTags: (result, error) => [{type:"MyFollowList"},{type:"User",id:result.user.id}], 
    }),
    // 🔹 ユーザー情報の更新
    updateUser: builder.mutation({
      queryFn: (updateUser) => formatQueryFnResponse(() => updateUserAPI(updateUser)), // ✅ 修正
      invalidatesTags: (result, error) => [{ type: "User", id: result.user.id }],
    }),
    // 🔹 フォローリスト取得
    getFollowList: builder.query({
      queryFn: () => formatQueryFnResponse(getFollowListAPI),
      providesTags: [{type:"MyFollowList"}],
    }),

    // 🔹 技術記事共有関連
    createSharedArticle: builder.mutation({
      queryFn: ({ eventId, articleData }) => 
        formatQueryFnResponse(() => createSharedArticleAPI(eventId, articleData)),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "EventArticles", id: eventId }
      ],
    }),

    getSharedArticlesByEvent: builder.query({
      queryFn: ({ eventId, page, limit }) => 
        formatQueryFnResponse(() => getSharedArticlesByEventAPI(eventId, { page, limit })),
      providesTags: (result, error, { eventId }) => [
        { type: "EventArticles", id: eventId }
      ],
    }),

    getSharedArticleById: builder.query({
      queryFn: (articleId) => 
        formatQueryFnResponse(() => getSharedArticleByIdAPI(articleId)),
      providesTags: (result, error, articleId) => [
        { type: "SharedArticle", id: articleId }
      ],
    }),

    // 🔹 フィードバック関連
    createFeedback: builder.mutation({
      queryFn: ({ eventId, feedbackData }) => 
        formatQueryFnResponse(() => createFeedbackAPI(eventId, feedbackData)),
      invalidatesTags: (result, error, { eventId }) => [
        { type: "EventFeedbacks", id: eventId }
      ],
    }),

    getFeedbacksByEvent: builder.query({
      queryFn: ({ eventId, page, limit }) => 
        formatQueryFnResponse(() => getFeedbacksByEventAPI(eventId, { page, limit })),
      providesTags: (result, error, { eventId }) => [
        { type: "EventFeedbacks", id: eventId }
      ],
    }),

    getFeedbackById: builder.query({
      queryFn: (feedbackId) => 
        formatQueryFnResponse(() => getFeedbackByIdAPI(feedbackId)),
      providesTags: (result, error, feedbackId) => [
        { type: "Feedback", id: feedbackId }
      ],
    }),
  }),
});

export const {
    //クラブ
    useCreateClubMutation,
    useGetUserClubsQuery,
    useGetClubDetailQuery,
    useJoinClubMutation,
    useUpdateClubMutation,
    useGetClubMembersQuery,
    useGetClubEventsQuery,
    //イベントイベント
    useGetEventDetailQuery,
    useCreateEventMutation,
    useParticipateInEventMutation,
    useUpdateEventStatusMutation,
    useDetermineMVPMutation,
    useVoteForMVPMutation,
    useDistributeExpMutation,
    //ポスト
    useGetHomePostsQuery,
    useGetUserPostsQuery,
    useGetClubPostsQuery,
    useCreatePostMutation,
    useGetPostDetailsQuery,
    //コメント
    useGetCommentsByTargetQuery,
    useGetCommentByIdQuery,
    useCreateCommentMutation,
    //ユーザー
    useGetPublicUserQuery,
    useToggleFollowUserMutation,
    useUpdateUserMutation,
    useGetFollowListQuery,
    // 技術記事共有関連
    useCreateSharedArticleMutation,
    useGetSharedArticlesByEventQuery,
    useGetSharedArticleByIdQuery,
    // フィードバック関連
    useCreateFeedbackMutation,
    useGetFeedbacksByEventQuery,
    useGetFeedbackByIdQuery,
  } = apiSlice;
  