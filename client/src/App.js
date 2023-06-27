import { useEffect } from "react";
import { BrowserRouter, Route, RouterProvider, Routes, useLocation } from 'react-router-dom'
import Home from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import Checkout from "./pages/Checkout";
import Confirmation from "./pages/Comfirmation";
import Navbar from "./components/Navbar";
import CartMenu from "./components/CartMenu";
import { Typography } from "@mui/material";
import Item from "./components/Item";
import Footer from "./components/Footer";

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
          <Route path="/" element={<Checkout />} />
          <Route path="item/:itemId" element={<ItemDetails />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="checkout/success" element={<Confirmation />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
