import PropertyCarousel from "../components/PropertyDetails/PropertyCarousel";
import NewsFeed from "./NewsFeed";

function Dashboard() {
  return (
    <>
      <PropertyCarousel />
      <NewsFeed numberOfArticles={4} />
    </>
  );
}

export default Dashboard;
