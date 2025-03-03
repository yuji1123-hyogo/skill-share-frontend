import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ProtectedLayout from "../layout/ProtectedLayout";
import SearchPage from "../pages/SearchPage";
import EventSharedArticlesPage from "../pages/EventSharedArticlesPage";
import EventFeedbackPage from "../pages/EventFeedbackPage";
import GeoLocationPage from "../pages/GeoLocationPage";

//遅延ロード
const HomePage = lazy(() => import("../pages/HomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const FollowingListPage = lazy(() => import("../pages/FollowingListPage")); 
const ClubManagementPage = lazy(() => import("../pages/ClubManagementPage")); 
const ClubDetailPage = lazy(() => import("../pages/ClubDetailPage")); 



const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    {/* ログイン時の Redux アクションで userId がセットされれば遷移可能に */}
      <Route element={<ProtectedLayout/>}> {/*アプリケーションのメインコンテンツページのレイアウト */}
        <Route path="/" element={<HomePage />} />                             {/*フォロー中のユーザーと自身の投稿一覧*/}
        <Route path="/profile/:userId" element={<ProfilePage />} />           {/*プロフィール＋プロフィール編集*/}
        <Route path="/following/:userId" element={<FollowingListPage />} />   {/*フォロー中のユーザー一覧*/}
        <Route path="/clubManagement" element={<ClubManagementPage />} />     {/*クラブ作成＋参加中のクラブ一覧*/}
        <Route path="/club/:clubId" element={<ClubDetailPage />} />           {/*クラブ詳細(メンバー一覧,イベント一覧,クラブ投稿一覧,クラブ編集)*/}
        <Route path="/search" element={<SearchPage />} />                     {/*ユーザー検索またはクラブ検索*/}
        <Route path="/events/:eventId/articles" element={<EventSharedArticlesPage />} />  {/*技術記事共有*/}
        <Route path="/events/:eventId/feedbacks" element={<EventFeedbackPage />} />       {/*イベントのフィードバック*/}
        <Route path="/geoLocation" element={<GeoLocationPage />} />                       {/*地図検索*/}
      </Route>
    {/* 404 Not Found */}
    <Route path="*" element={<AuthPage />} />
  </Routes>
);

export default AppRoutes;
