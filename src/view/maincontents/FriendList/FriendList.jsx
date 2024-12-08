import React, { useContext, useEffect, useState } from 'react'
import "./FriendList.css"
import Usercard from '../../components/PrimaryComponents/Usercard/Usercard'
import { useSelector } from 'react-redux'
import { followingUserlistApiCrient } from '../../../model/httpApiCrients/userApiCrient'

function FriendList() { 
   const [friends,setFriends] = useState([])
   const currentUser = useSelector((state)=>state.user)
   const currentUserId = currentUser.userId
    

   const fetchFriendUsers = async () => {
    try {
        const response = await followingUserlistApiCrient(currentUserId);
        const friendUsers = response.data;
        setFriends(friendUsers);
    } catch (e) {
        console.error("フォロー一覧取得中エラー:", e);
    }
};

    useEffect(()=>{
      const fetchData = async () => {
        await fetchFriendUsers();
      };
      fetchData();
      console.log("Friends:", friends);
    },[])

  return (
    <div className='friendlist'>
        <h3 className='friendlist-title'>フォロー中のユーザー一覧</h3>
        <div className="friendlist-users">
          {friends.map((friend)=>{
            return <Usercard page={"FriendList"} user={friend} key={friend._id} />
          })}
        </div>
    </div>
  )
}

export default FriendList