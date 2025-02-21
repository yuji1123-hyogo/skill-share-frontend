import FeedbackCard from "./FeedbackCard";

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="space-y-6">
      {feedbacks.map(feedback => (
        <FeedbackCard key={feedback.id} feedback={feedback} />
      ))}
    </div>
  );
};

export default FeedbackList; 