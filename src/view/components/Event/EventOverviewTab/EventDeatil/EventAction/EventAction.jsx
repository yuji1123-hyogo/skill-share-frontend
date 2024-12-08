import React from 'react';
import { determineMVP, distributeExperience, joinEvent, updateEventStatus, voteForMVP } from '../../../../../../model/httpApiCrients/eventApiClient';
import './EventAction.css';
import { useDispatch, useSelector } from 'react-redux';
import { tagLevelUpActionCreater } from '../../../../../../model/redux/currentUserSlice';

function EventAction({ club, event, currentUserId, setEvent, setEventsList, events, setClub }) {
    const currentUser = useSelector((state)=>state.user)
    const isHost = event.participants[0]?.user._id === currentUser.userId;
    const dispatch = useDispatch();
    // イベントを開始する
    const handleStartEvent = async (eventId) => {
        try {
            const updatedEvent = await updateEventStatus(eventId);
            console.log(`イベント ${eventId} を開始しました`, updatedEvent);
            setEventsList((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === updatedEvent._id ? updatedEvent : event
                )
            );
        } catch (error) {
            console.error('イベント開始エラー:', error);
            alert('イベントの開始に失敗しました。');
        }
    };
    
    //おまけ
    const calcExpchange = ({ oldtagInfo, updatetagInfo }) => {
        const experienceChangedTags = oldtagInfo
          .filter((tag) => {
            const updatedTag = updatetagInfo.find((updatetag) => updatetag.tagname === tag.tagname);
            return updatedTag && updatedTag.currentExperience !== tag.currentExperience;
          })
          .map((oldtag) => {
            const updatedTagDetail = updatetagInfo.find((updatetag) => updatetag.tagname === oldtag.tagname);
            return {
              tagname: oldtag.tagname,
              oldLevel: oldtag.level,
              oldExp: oldtag.currentExperience,
              newLevel: updatedTagDetail.level,
              newExp: updatedTagDetail.currentExperience,
            };
          });
      
        const formattedOutput = experienceChangedTags.map((tag) => 
          `タグ: ${tag.tagname}\nレベル: ${tag.oldLevel} → ${tag.newLevel}\n経験値: ${tag.oldExp} → ${tag.newExp}`
        ).join("\n\n");
      
        return formattedOutput;
      };



    // イベントを終了する
    const handleEndEvent = async () => {
        try {
            // 1. MVP決定
            if (!event.mvp) {
                throw new Error('MVPの確定を行ってください');
            }
            // 2. 経験値分配
            const updatedEvent = await distributeExperience({ eventId: event._id });
            console.log('経験値が分配されました', updatedEvent);

            alert(`イベント ${event.name} を終了しました`, updatedEvent);
            setEventsList((prevEvents) =>
                prevEvents
                    .map((event) => (event._id === updatedEvent._id ? updatedEvent : event))
                    .filter((event) => event._id !== updatedEvent._id)
            );

            //おまけ
            try{
                const currentUserInUpdateEvent = updatedEvent.participants.find((participant)=>participant.user._id === currentUser.userId)
                const oldtagInfo = currentUser.hobbies.map((tag)=>{
                    return{
                    tagname:tag.name,
                    currentExperience:tag.currentExperience,
                    level:tag.level
                    }
                })
                const updatetagInfo = currentUserInUpdateEvent.user.hobbies.map((tag)=>{
                    return{
                    tagname:tag.name,
                    currentExperience:tag.currentExperience,
                    level:tag.level
                    }
                })
                const result = calcExpchange({oldtagInfo,updatetagInfo})
                console.log(result)
                if(result){
                    alert(`ユーザータグ経験値:${result}`)
                }
                dispatch(tagLevelUpActionCreater(currentUserInUpdateEvent.user))
            }catch(e){
                console.log(e)
            }
            try{
                const oldtagInfo = club.tags.map((tag)=>{
                    return{
                    tagname:tag.name,
                    currentExperience:tag.currentExperience,
                    level:tag.level
                    }
                })
                const updatetagInfo = updatedEvent.club.tags.map((tag)=>{
                    return{
                    tagname:tag.name,
                    currentExperience:tag.currentExperience,
                    level:tag.level
                    }
                })
                const result = calcExpchange({oldtagInfo,updatetagInfo})
                console.log(result)
                if(result){
                    alert(`クラブタグ経験値:${result}`)
                }
            }catch(e){
                console.log(e)
            }
            setClub(updatedEvent.club)
        } catch (error) {
            console.error('イベント終了エラー:', error);
            alert(error.message || 'イベントの終了に失敗しました。');
        }

    };

    // イベントに参加する
    const handleJoinEvent = async (eventId) => {
        try {
            const updatedEvent = await joinEvent(eventId);
            alert(`イベント ${event.name} に参加しました`, updatedEvent);
            console.log('イベントに参加しました', updatedEvent);
            setEvent(updatedEvent);
        } catch (error) {
            console.error('イベント参加エラー:', error);
            alert('イベントへの参加に失敗しました。');
        }
    };

    // MVPに投票する
    const handleVoteForMVP = async (eventId, candidateId) => {
        try {
            const updatedEvent = await voteForMVP(eventId, candidateId);
            console.log(`イベント ${eventId} で MVP に ${candidateId} を投票しました`, updatedEvent);
            setEvent(updatedEvent);
        } catch (error) {
            console.error('MVP投票エラー:', error);
            alert('MVP投票に失敗しました。');
        }
    };

    // MVPを確定する
    const handleDetermineMVP = async () => {
        try {
            const updatedEvent = await determineMVP(event._id);
            console.log('MVP決定:', updatedEvent);
            setEventsList((prevEvents) =>
                prevEvents.map((event) =>
                    event._id === updatedEvent._id ? updatedEvent : event
                )
            );
        } catch (error) {
            console.error('MVP決定エラー:', error);
            alert(error.message || 'MVPの決定に失敗しました');
        }
    };

    return (
        <div className="event-options">
            {isHost && event.status === 'upcoming' && (
                <button
                    className="event-start-button"
                    onClick={() => handleStartEvent(event._id)}
                >
                    イベントを開始する
                </button>
            )}
            {isHost && event.status === 'ongoing' && event.mvp && (
                <button className="event-end-button" onClick={handleEndEvent}>
                    イベントを終了する
                </button>
            )}
            {(event.status === 'upcoming' || event.status === 'ongoing') &&
                !event.participants.some(
                    (participant) => participant.user._id === currentUserId
                ) && (
                    <button onClick={() => handleJoinEvent(event._id)}>
                        イベントに参加する
                    </button>
                )}

            {/* 開催中かつ参加済みかつ未投票のイベントなら投票可能 */}
            {event.status === 'ongoing' &&
                event.participants.some(
                    (participant) => participant.user._id === currentUserId
                ) &&
                !event.votes.some((vote) => vote.voter === currentUserId) && (
                    <select
                        onChange={(e) => handleVoteForMVP(event._id, e.target.value)}
                        defaultValue=""
                    >
                        <option value="" disabled>
                            MVPを投票する
                        </option>
                        {event.participants.map((participant) => (
                            <option key={participant.user._id} value={participant.user._id}>
                                {participant.user.username}
                            </option>
                        ))}
                    </select>
                )}

            {/* 投票済みなら投票先を表示 */}
            {event.votes.some((vote) => vote.voter === currentUserId) && (
                <p key="voted-info">
                    <strong>投票済みです</strong>{' '}
                    投票先:{' '}
                    {event.votes
                        .filter((vote) => vote.voter === currentUserId)
                        .map((vote) => (
                            <span key={vote._id}>{vote.candidate?.username}</span>
                        ))}
                </p>
            )}

            {!event.mvp && event.votes && event.status !== 'completed' && (
                <p>現在の投票数: {event.votes.length}</p>
            )}
            {isHost && !event.mvp && event.votes && event.status !== 'completed' && (
                <button onClick={handleDetermineMVP}>MVPを確定する</button>
            )}
        </div>
    );
}

export default EventAction;
