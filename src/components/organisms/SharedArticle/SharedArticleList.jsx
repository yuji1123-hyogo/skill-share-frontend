import SharedArticleCard from "./SharedArticleCard";

const SharedArticleList = ({ articles }) => {
  return (
    <div className="space-y-4">
      {articles.map(article => (
        <SharedArticleCard key={article.id} article={article} />
      ))}
    </div>
  );
};

export default SharedArticleList; 