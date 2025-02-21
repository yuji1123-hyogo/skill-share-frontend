import { EVENT_STATUS } from "../../constants/eventStatus";

/**
 * イベントが技術記事を共有可能な状態かチェック
 * @param {Object} event - イベント情報
 * @returns {boolean} 共有可能な場合はtrue
 */
export const canShareArticle = (event) => {
  return [EVENT_STATUS.UPCOMING, EVENT_STATUS.ON_GOING].includes(event.status);
};

/**
 * イベントがフィードバックを作成可能な状態かチェック
 * @param {Object} event - イベント情報
 * @returns {boolean} 作成可能な場合はtrue
 */
export const canCreateFeedback = (event) => {
  return event.status === EVENT_STATUS.COMPLETED;
};

/**
 * ユーザーがイベントの参加者かチェック
 * @param {Object} event - イベント情報
 * @param {string} userId - ユーザーID
 * @returns {boolean} 参加者の場合はtrue
 */
export const isEventParticipant = (event, userId) => {
  return event.participants.some(participant => 
    participant.toString() === userId.toString()
  );
}; 