import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Home from './view/maincontents/Home/Home';
import FriendList from './view/maincontents/FriendList/FriendList';
import DirectMessage from './view/maincontents/DirectMessage/DirectMessage';

import ProfilePage from './view/maincontents/Profile/Profile';
import Registerpage from './view/pages/Registerpage/Registerpage';

import ApplicationLayout from './view/pages/ApplicationLayout/ApplicationLayout';
import PageLoading from './view/pages/PageLoading/PageLoading';
import AppSettings from './view/maincontents/AppSettings/AppSettings';
import {fetchLoggedInUserActionCreater } from './model/redux/currentUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import ChatList from './view/maincontents/ChatList/ChatList';
import Search from './view/maincontents/Search/Search';
import Loginpage from './view/pages/Loginpage/Loginpage';
import ClubHome from './view/maincontents/ClubHome/ClubHome';
import ClubManagementPage from './view/maincontents/ClubManagementPage/ClubManagementPage';

function App() {
    const dispatch = useDispatch()
    const currentUser = useSelector((state)=>state.user)
    useEffect(()=>{
        dispatch(fetchLoggedInUserActionCreater());
    },[])

    return (
        <>     
            <Router>
                <Routes>
                   {/* レイアウトにchildrenプロップスを渡したい場合routesの中に直接レイアウトコンポーネントを持ってくるのは不可 */}
                   {/* Routesの中は必ずroute */}
                   {/* 画面リロード時setUserInfoの実行に少し間があるためログインにnavigateされてしまわないようにページローディングを設置 */}
                   <Route element={currentUser.username ? <ApplicationLayout/> :<Navigate to="/login"/>}>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<ProfilePage />} />
                        <Route path="/chatlist" element={<ChatList />} />
                        <Route path="/friends" element={<FriendList />} />
                        <Route path="/dm" element={<DirectMessage />} />
                        <Route path="/clubs" element={<ClubManagementPage />} />
                        <Route path="/settings" element={<AppSettings />} />
                        <Route path="/search" element={<Search/>} />
                        <Route path="/clubHome/:clubId" element={<ClubHome/>} />
                    </Route>
                        <Route path="/login" element={
                            currentUser.username ? <Navigate to="/"/>:<Loginpage />} />
                        <Route path="/register" element={<Registerpage />} />
                </Routes>
            </Router>
        </>
    );
}

export default App;

