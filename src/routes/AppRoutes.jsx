import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedLayout from "../layout/ProtectedLayout";
import SearchPage from "../pages/SearchPage";
import EventSharedArticlesPage from "../pages/EventSharedArticlesPage";
import EventFeedbackPage from "../pages/EventFeedbackPage";
import GeoLocationPage from "../pages/GeoLocationPage";

// ✅ 遅延ロード (Lazy Loading)
const HomePage = lazy(() => import("../pages/HomePage"));
const AuthPage = lazy(() => import("../pages/AuthPage"));
const ProfilePage = lazy(() => import("../pages/ProfilePage"));
const FollowingListPage = lazy(() => import("../pages/FollowingListPage")); 
const ClubManagementPage = lazy(() => import("../pages/ClubManagementPage")); 
const ClubDetailPage = lazy(() => import("../pages/ClubDetailPage")); // ✅ クラブ詳細ページを追加

const AppRoutes = () => (
  <Routes>
    <Route path="/auth" element={<AuthPage />} />
    {/* ログイン時の Redux アクションで userId がセットされれば遷移可能に */}
    <Route element={<ProtectedRoute/>}>
      <Route element={<ProtectedLayout/>}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile/:userId" element={<ProfilePage />} /> 
        <Route path="/following/:userId" element={<FollowingListPage />} />
        <Route path="/clubManagement" element={<ClubManagementPage />} />
        <Route path="/club/:clubId" element={<ClubDetailPage />} /> {/* ✅ クラブ詳細ページのルートを追加 */}
        <Route path="/search" element={<SearchPage />} /> 
        <Route path="/events/:eventId/articles" element={<EventSharedArticlesPage />} />
        <Route path="/events/:eventId/feedbacks" element={<EventFeedbackPage />} />
        <Route path="/geoLocation" element={<GeoLocationPage />} />
      </Route>
    </Route>
    {/* 404 Not Found */}
    <Route path="*" element={<AuthPage />} />
  </Routes>
);

export default AppRoutes;
