import { createContext, useContext } from "react";
import { useDetermineMVPMutation, useDistributeExpMutation, useGetEventDetailQuery, useParticipateInEventMutation, useUpdateEventStatusMutation, useVoteForMVPMutation } from "../../../../api/RTKQuery/apiSlice";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";



const EventCardContext = createContext(null);


//抽象化のためのカスタムフック
export const useEventCard = ()=>{
    const context = useContext(EventCardContext);
    if(!context){
        console.error("このcontextはEventCardProvider内で使用してください", new Error().stack);
        // デフォルト値を返すことでエラーを防止
        return {
            event: null,
            isLoading: false,
            error: null,
            isUpcoming: false,
            isOngoing: false, 
            isCompleted: false,
            isParticipant: false,
            isOwner: false,
            isVoted: false,
            actions: {
                joinEvent: () => console.warn("Provider外でactionsは使用できません"),
                startEvent: () => console.warn("Provider外でactionsは使用できません"),
                completeEvent: () => console.warn("Provider外でactionsは使用できません"),
                voteForMVP: () => console.warn("Provider外でactionsは使用できません"),
                distributeExp: () => console.warn("Provider外でactionsは使用できません"),
                determineMVP: () => console.warn("Provider外でactionsは使用できません"),
                navigateToFeedback: () => console.warn("Provider外でactionsは使用できません")
            }
        };
    }
    return context;
}


export const EventCardProvider =({eventId,children})=>{
    console.log("EventCardProvider received eventId:", eventId);
    
    const {
        data:eventData,
        isLoading:isEventLoading,
        error:eventError,
    } = useGetEventDetailQuery(eventId);
    
    console.log("EventData from API:", eventData);
    console.log("Event object:", eventData?.event);
    console.log("Event participants:", eventData?.event?.participants);
    console.log("Error from API:", eventError);

    const [participateInEvent, { isLoading: isJoining }] = useParticipateInEventMutation();
    const [updateEventStatus, { isLoading: isUpdatingStatus }] = useUpdateEventStatusMutation();
    const [voteForMVP, { isLoading: isVoting }] = useVoteForMVPMutation();
    const [distributeExp, { isLoading: isDistributing }] = useDistributeExpMutation();
    const [determineMVP, { isLoading: isDetermining }] = useDetermineMVPMutation();

    const currentUserId = useSelector(state => state.auth.userId);

    const isLoading = isJoining || isUpdatingStatus || isVoting || isDistributing || isDetermining || isEventLoading;

    // ユーザーがイベント参加者かどうかの判定をコンテキストレベルで実施
    const isParticipant = useMemo(() => {
        if (!eventData?.event?.participants) return false;
        return eventData.event.participants.some(p => p.id === currentUserId);
    }, [eventData?.event?.participants, currentUserId]);

    // ユーザーがMVP投票済みかどうかの判定
    const isVoted = useMemo(() => {
        if (!eventData?.event?.votes) return false;
        return eventData.event.votes.some(v => v.voter === currentUserId);
    }, [eventData?.event?.votes, currentUserId]);

    console.log("isVoted:", eventData?.event?.votes);

    // ユーザーがイベントオーナーかどうかの判定をコンテキストレベルで実施
    const isOwner = useMemo(() => {
        if (!eventData?.event?.participants) return false;
        return eventData.event.participants[0].id === currentUserId;
    }, [eventData?.event?.participants, currentUserId]);

    // イベントのステータスに関する判定
    const isUpcoming = eventData?.event?.status === 'upcoming';
    const isOngoing = eventData?.event?.status === 'ongoing';
    const isCompleted = eventData?.event?.status === 'completed';

    //イベント関連アクション
    const handleStartEvent = async()=>{
        try{
            await updateEventStatus(eventId);
            toast.success("イベントを開始しました");
        }catch(error){
            console.error("イベント開始に失敗しました",error);
            toast.error("イベント開始に失敗しました");
        }
    }


    const handleJoinEvent = async()=>{
        try{
            await participateInEvent(eventId);
            toast.success("イベントに参加しました");
        }catch(error){
            console.error("イベント参加に失敗しました",error);
            toast.error("イベント参加に失敗しました");
        }
    }

    const handleCompleteEvent = async()=>{
        try{
            await updateEventStatus(eventId);
            toast.success("イベントを完了しました");
        }catch(error){
            console.error("イベント完了に失敗しました",error);
            toast.error("イベント完了に失敗しました");
        }
    }

    const handleVoteForMVP = async()=>{
        try{
            await voteForMVP(eventId);
            toast.success("MVP投票しました");
        }catch(error){
            console.error("MVP投票に失敗しました",error);
            toast.error("MVP投票に失敗しました");
        }
    }

    const handleDetermineMVP = async()=>{
        try{
            await determineMVP(eventId);
            toast.success("MVPを確定しました");
        }catch(error){
            console.error("MVP確定に失敗しました",error);
            toast.error("MVP確定に失敗しました");
        }
    }

    const handleDistributeExp = async()=>{
        try{
            await distributeExp(eventId);
            toast.success("経験値分配しました");
        }catch(error){
            console.error("経験値分配に失敗しました",error);
            toast.error("経験値分配に失敗しました");
        }
    }

    const navigate = useNavigate();
    const handleNavigateToFeedback = async()=>{
        try{
            navigate(`/events/${eventId}/feedbacks`);
        }catch(error){
            console.error("フィードバックページに遷移に失敗しました",error);
            toast.error("フィードバックページに遷移に失敗しました");
        }
    }

    const value = {
        event: eventData?.event || null,
        isLoading,
        error: eventError,
        isUpcoming,
        isOngoing,
        isCompleted,
        isParticipant,
        isOwner,
        isVoted,
        actions: {
            joinEvent: handleJoinEvent,
            startEvent: handleStartEvent,
            completeEvent: handleCompleteEvent,
            voteForMVP: handleVoteForMVP,
            distributeExp: handleDistributeExp,
            determineMVP: handleDetermineMVP,
            navigateToFeedback: handleNavigateToFeedback
        }
    }


    
    return(
        <EventCardContext.Provider value={value}>
            {children}
        </EventCardContext.Provider>
    )
    }


