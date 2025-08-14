import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Movie from "./pages/Movie.jsx";
import Search from "./pages/Search.jsx";
import RateMovie from "./pages/RateMovie.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import WishList from "./pages/WishList.jsx";
import Profile from "./pages/Profile.jsx";
import MyReviews from "./pages/MyReviews.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <WishlistProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<App />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wishlist" element={<WishList />} />
            <Route path="/my-reviews" element={<MyReviews />} />
            <Route path="movie/:id" element={<Movie />} />
            <Route path="movie/:id/rate" element={<RateMovie />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WishlistProvider>
  </StrictMode>
);
