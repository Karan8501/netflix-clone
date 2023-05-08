import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Netflix from "./pages/Netflix";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Player from "./components/Player";
import Movies from "./pages/Movies";
import TvShows from "./pages/TvShows";
import UserLiked from "./pages/UserLiked";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/" element={<Netflix />} />
          <Route exact path="/player" element={<Player />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/tv" element={<TvShows />} />
          <Route exact path="/my-list" element={<UserLiked />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
