import { createApi } from "@reduxjs/toolkit/query/react";



import { getUserClubsAPI, getPublicUserAPI, toggleFollowUserAPI, updateUserAPI, getFollowListAPI } from "../clients/userApi.js";
import { getEventByIdAPI, createEventAPI, participateInEventAPI, updateEventStatusAPI, determineMVPAPI, voteForMVPAPI, distributeExpAPI } from "../clients/eventApi.js";
import { getHomePostsAPI, getUserPostsAPI, getClubPostsAPI, createPostAPI, getPostDetailsAPI } from "../clients/postApi.js";
import { getCommentsByPostIdAPI, getCommentByIdAPI, createCommentAPI, getCommentsByTargetAPI } from "../clients/commentApi.js";
import {getClubDetailAPI,joinClubAPI,updateClubAPI,getClubMembersAPI,getClubEventsAPI, createClubAPI} from "../clients/clubApi.js";
import { formatQueryFnResponse } from "./formatQueryFnUtils.js";
import { 
  createSharedArticleAPI,
  getSharedArticlesByEventAPI,
  getSharedArticleByIdAPI 
} from "../clients/sharedArticleApi.js";
import {
  createFeedbackAPI,
  getFeedbacksByEventAPI,
  getFeedbackByIdAPI
} from "../clients/feedbackApi.js";
import { store } from "../../states/store/store.js";


export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: () => ({ data: null }),
  tagTypes: ["MyFollowList","User", "MyClubList", "Club", "EventList", "Event", "HomePostList", "ProfilePostList", "ClubPostList", "Post", "CommentList", "Comment", "CommentList_Post", "CommentList_Article", "CommentList_Feedback", "EventArticles", "SharedArticle", "EventFeedbacks", "Feedback"],
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
      queryFn: (clubId) => formatQueryFnResponse(() => getClubDetailAPI(clubId)), 
      providesTags: (result, error, clubId) => [{ type: "Club", id: clubId }],
    }),
    // 🔹 クラブに参加
    joinClub: builder.mutation({
      queryFn: ( clubId ) => formatQueryFnResponse(() => joinClubAPI(clubId)), 
      invalidatesTags: (result, error, clubId) => [{ type: "Club", id: clubId },{ type: "User",id:result?.data?.userId},{type:"MyClubList"}]
    }),
    // 🔹 クラブの更新
    updateClub: builder.mutation({
      queryFn: ({clubId,updateData}) => formatQueryFnResponse(() => updateClubAPI(clubId,updateData)), 
      invalidatesTags: (result, error,{ clubId}) => [{ type: "Club", id: clubId }],
    }),
    // 🔹 クラブのメンバー一覧を取得
    getClubMembers: builder.query({
      queryFn: (clubId) => formatQueryFnResponse(() => getClubMembersAPI(queryArg)), 
      providesTags: (result, error, clubId) => [{ type: "Club", id: clubId }],
    }),
    // 🔹 クラブのイベント一覧を取得
    getClubEvents: builder.query({
      queryFn: (clubId ) => formatQueryFnResponse(() => getClubEventsAPI(clubId)), 
      providesTags: (result, error, clubId) => [{ type: "EventList", id: clubId }],
    }),


    // 🔹 イベント関連
    // 🔹 イベントの詳細を取得
    getEventDetail: builder.query({
      queryFn: (eventId) => formatQueryFnResponse(() => getEventByIdAPI(eventId)), 
      providesTags: (result, error, eventId) => [{ type: "Event", id: eventId }],
    }),
    // 🔹 イベントを作成
    createEvent: builder.mutation({
      queryFn: (event) => formatQueryFnResponse(() => createEventAPI(event)), 
      invalidatesTags: (result, error, event) => [{ type: "EventList", id: event.club }],
    }),
    // 🔹 イベントに参加
    participateInEvent: builder.mutation({
      queryFn: (eventId) => formatQueryFnResponse(() => participateInEventAPI(eventId)), 
      invalidatesTags: (result, error, eventId) => [{ type: "Event", id: eventId }],
    }),
    // 🔹 イベントのステータスを更新
    updateEventStatus: builder.mutation({
      queryFn: (eventId) => formatQueryFnResponse(() => updateEventStatusAPI(eventId)), 
      invalidatesTags: (result, error, eventId) => [
        { type: "Event", id: eventId },
        { type: "EventList", id: result.event.club }
      ],
    }),
    // 🔹 MVP の決定
    determineMVP: builder.mutation({
      queryFn: (eventId) => formatQueryFnResponse(() => determineMVPAPI(eventId)), 
      invalidatesTags: (result, error, eventId) => [{ type: "Event", id: eventId }],
    }),
    // 🔹 MVP 投票
    voteForMVP: builder.mutation({
      queryFn: ({ eventId,candidateId }) => formatQueryFnResponse(() => voteForMVPAPI({eventId,candidateId})), 
      invalidatesTags: (result, error,{ eventId}) =>
         {
          console.log("invalidates in vote for mvp",eventId)
          return [{ type: "Event", id: eventId }]
         }
    }),

      // 🔹 経験値の分配
      distributeExp: builder.mutation({
        queryFn: (eventId) => formatQueryFnResponse(() => distributeExpAPI(eventId)), 
      
        invalidatesTags: (result, error, eventId) => {
          if (error || !result) {
            console.warn("Error in distributeExp or empty response:", error);
            return [{ type: "Event", id: eventId }];
          }
        
          const { updatedUsers = [], updatedClub } = result; // デフォルト値を設定
        
          if (updatedUsers.length === 0 && !updatedClub) {
            return [{ type: "Event", id: eventId }];
          }
        
          return [
            ...updatedUsers.map(userId => ({ type: "User", id: userId })),
            ...(updatedClub ? [{ type: "Club", id: updatedClub }] : []),
            { type: "Event", id: eventId },
          ];
        }
      }),



    // 🔹 ポスト
    createPost: builder.mutation({
      queryFn: (postData) => formatQueryFnResponse(() => createPostAPI(postData)), 
      invalidatesTags: (result, error, { club :clubId}) => {
        const logedInuserId = store.getState().auth.userId;
        const tags = [{type:"User", id : logedInuserId}];
        if (clubId) {
          tags.push({ type: "Club", id: clubId });
        }
        return tags;
      },
    }),
    getPostDetails: builder.query({
      queryFn: (postId) => formatQueryFnResponse(() => getPostDetailsAPI(postId)), 
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
      queryFn: (targetUserId) => formatQueryFnResponse(() => getPublicUserAPI(targetUserId)), 
      providesTags: (result, error,targetUserId) => [{ type: "User", id: targetUserId }],
    }),
    // 🔹 フォロー / フォロー解除
    toggleFollowUser: builder.mutation({
      queryFn: (targetUserId) => formatQueryFnResponse(() => toggleFollowUserAPI(targetUserId)), 
      invalidatesTags: (result, error) => [{type:"MyFollowList"},{type:"User",id:result.user.id}], 
    }),
    // 🔹 ユーザー情報の更新
    updateUser: builder.mutation({
      queryFn: (updateUser) => formatQueryFnResponse(() => updateUserAPI(updateUser)), 
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
  