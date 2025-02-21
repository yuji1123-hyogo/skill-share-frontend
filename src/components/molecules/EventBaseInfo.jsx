import React from 'react'
import TagList from './TagList'

const EventBaseInfo = ({ event }) => {
  console.log("event in event base info",event)
  return (
    <section className="bg-dark-primary p-6 rounded-lg border border-dark-accent">
      <h2 className="text-2xl font-bold text-white mb-6">イベント基本情報</h2>
      
      {/* イベント名と説明 */}
      <div className="space-y-2 mb-6">
        <h3 className="text-xl font-bold text-white">{event.name}</h3>
        {event.description && (
          <p className="text-gray-300 text-sm">{event.description}</p>
        )}
      </div>

      {/* イベント詳細情報グリッド */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* 開催情報 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-gray-400 text-sm">開催日時</span>
            <p className="text-gray-200">
              {event.date ? new Date(event.date).toLocaleString('ja-JP') : '未定'}
            </p>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400 text-sm">開催場所</span>
            <p className="text-gray-200">{event.location || '未定'}</p>
          </div>
        </div>

        {/* 主催者・参加者情報 */}
        <div className="space-y-4">
          <div className="space-y-1">
            <span className="text-gray-400 text-sm">主催者</span>
            <div className="flex items-center gap-2">
              <img
                src={event.host?.profilePicture || '/logo192.png'}
                alt={event.host?.username || 'ホスト'}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-gray-200">{event.host?.username || 'ホスト'}</span>
            </div>
          </div>
          <div className="space-y-1">
            <span className="text-gray-400 text-sm">参加者数</span>
            <p className="text-gray-200">{event.participants?.length || 0}人</p>
          </div>
        </div>
      </div>

      {/* ステータス表示 */}
      <div className="mb-6">
        <span className={`inline-block px-3 py-1 rounded-full text-sm ${
          event.status === 'upcoming' ? 'bg-blue-500/20 text-blue-300' :
          event.status === 'ongoing' ? 'bg-green-500/20 text-green-300' :
          'bg-purple-500/20 text-purple-300'
        }`}>
          {event.status === 'upcoming' ? '開催予定' :
           event.status === 'ongoing' ? '開催中' : '終了'}
        </span>
      </div>

      {/* イベントタグ */}
      {event.eventtags && event.eventtags.length > 0 && (
        <div className="space-y-2">
          <span className="text-gray-400 text-sm">イベントタグ</span>
          <TagList tags={event.eventtags} variant="simple" />
        </div>
      )}
    </section>
  )
}

export default EventBaseInfo