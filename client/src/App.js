import { useEffect } from "react";
import { BrowserRouter, Route, RouterProvider, Routes, useLocation } from 'react-router-dom'
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Comfirmation";
import Navbar from "./components/Navbar";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname])

  return null;
}

function App() {

  return (
    <div className="App">
      <BrowserRouter>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="item/:itemId" element={<ItemDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<Confirmation />} />
          </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
