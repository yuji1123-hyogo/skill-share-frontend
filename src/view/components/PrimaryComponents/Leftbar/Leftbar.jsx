import React, { useContext } from 'react'
import "./Leftber.css"
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutActionCreater } from '../../../../model/redux/currentUserSlice'


function Leftbar() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state)=>state.user)
  const favoriteClub = currentUser.favoriteClub
  const hundleLogout =async()=>{
      dispatch(logoutActionCreater());
  }

  

  return (
    <aside className="leftbar">
        <nav className="leftbar__nav">

            <Link to="/" style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">ユーザーホーム</strong>
            </Link>

            <Link to="/search" style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">検索</strong>
            </Link>

            <Link to="/clubs" style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">クラブ作成/一覧</strong>
            </Link>
            
            <Link to={`/profile?query=${currentUser.userId}`} style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">プロフィール</strong>
            </Link>

            <Link to="/settings" style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">プロフィール編集</strong>
            </Link>
            {
              favoriteClub && (
                <Link to={`/clubHome/${favoriteClub._id}`} style={{textDecoration:"none"}}>
                <strong  className="leftbar__nav__item">クラブ:{favoriteClub.name}</strong>
              </Link>
              )
            }

            <Link to="/friends" style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">フレンド</strong>
            </Link>

            <Link to="/chatlist" style={{textDecoration:"none"}}>
              <strong  className="leftbar__nav__item">チャット一覧</strong>
            </Link>
            
            <strong className="leftbar__nav__item" onClick={hundleLogout}>🔚 ログアウト</strong>
        </nav>
    </aside>
  )
}

export default Leftbar