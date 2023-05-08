import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { fetchMovies, getGenres } from "../store";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import Notavialable from "../components/Notavialable";
import SelectGenre from "../components/SelectGenre";
function TvShows() {
  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const genres = useSelector((state) => state.netflix.genres);
  const movies = useSelector((state) => state.netflix.movie);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "tv" }));
    }
  }, [genresLoaded]);

  // window.onscroll =()=>{
  //   setIsScrolled(window.pageYOffset === 0?false:true);
  //   return ()=>(window.onscroll) = null;
  // }

  //  onAuthStateChanged(firebaseAuth,(currentUser)=>{
  //     // if(currentUser) naviaget("/")
  //   })

  return (
    <Container>
      <div className="navbar">
        <Navbar />
      </div>
      <div className="data">
        {<SelectGenre genres={genres} type="tv" />}
        {movies.length ? <Slider movies={movies} /> : <Notavialable />}
      </div>
    </Container>
  );
}

const Container = styled.div`
  .data {
    margin-top: 8rem;
    .not-avialable {
      text-align: center;
      color: white;
      margin-top: 4rem;
    }
  }
`;

export default React.memo(TvShows);
