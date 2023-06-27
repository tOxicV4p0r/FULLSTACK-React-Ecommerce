import MainCarousel from "../../components/MainCarousel";
import ShoppingList from "../../components/ShoppingList";
import Subscribe from "../../components/Subscribe";

const Home = () => {
    return (
        <div className="home">
            <MainCarousel />
            <ShoppingList />
            <Subscribe />
        </div>
    )
};

export default Home;