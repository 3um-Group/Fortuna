import PropertyCarousel from "../components/PropertyDetails/PropertyCarousel";
import NewsFeed from "../components/News/NewsFeed";

function Dashboard() {
  return (
    <>
      <PropertyCarousel />
      <NewsFeed numberOfArticles={4} />
    </>
  );
}

export default Dashboard;
