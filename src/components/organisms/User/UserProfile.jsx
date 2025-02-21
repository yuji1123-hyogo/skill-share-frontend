import React from 'react'
import UserCard from './UserCard'
import PostList from '../Post/PostList'

function UserProfile({targetUserId, posts}) {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
      <div className="bg-dark-secondary rounded-xl shadow-xl p-6  border-dark-accent">
        <UserCard targetUserId={targetUserId}/>
      </div>
      <div className="space-y-4">
        <PostList posts={posts} />
      </div>
    </div>
  )
}

export default UserProfile