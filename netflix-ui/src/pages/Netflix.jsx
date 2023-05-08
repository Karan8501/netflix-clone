import React, { useEffect, useState } from "react";
import { useActionData } from "react-router-dom";
import Navbar from "../components/Navbar";
import backgroundImg from "../assets/home.jpg";
import movieLogo from "../assets/homeTitle.webp";
import { useNavigate } from "react-router-dom";
import { FaPlay } from "react-icons/fa";
import { AiOutlineInfoCircle } from "react-icons/ai";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { fetchMovies, getGenres } from "../store";
import Slider from "../components/Slider";

function Netflix() {
  const navigate = useNavigate();

  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);
  const genres = useSelector((state) => state.netflix.genres);
  const movies = useSelector((state) => state.netflix.movie);

  const [isScrolled, setIsScrolled] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, []);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ type: "all" }));
    }
  }, [genresLoaded]);
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  return (
    <Container>
      <Navbar isScrolled={isScrolled} />
      <div className="hero">
        <img src={backgroundImg} alt="background" className="background-img" />
        <div className="container">
          <div className="logo">
            <img src={movieLogo} alt="movie-log" />
          </div>
          <div className="buttons flex">
            <button
              className="flex j-center a-center"
              onClick={() => {
                navigate("/player");
              }}
            >
              <FaPlay></FaPlay>
              Play
            </button>
            <button className="flex j-center a-center">
              <AiOutlineInfoCircle></AiOutlineInfoCircle>
              More Info
            </button>
          </div>
        </div>
      </div>

      <Slider movies={movies} />
    </Container>
  );
}

const Container = styled.div`
  background-color: black;
  .hero {
    position: relative;
    .background-img {
      filter: brightness(60%);
    }
    img {
      height: 100vh;
      width: 100vw;
    }
    .container {
      position: absolute;
      bottom: 5rem;
      .logo {
        img {
          width: 100%;
          height: 100%;
          margin-left: 5rem;
        }
      }
      .buttons {
        margin: 5rem;
        gap: 2rem;
        button {
          font-size: 1.5rem;
          gap: 1rem;
          border-radius: 0.2rem;
          padding: 0.5rem;
          padding-left: 2rem;
          padding-right: 2rem;
          border: none;
          cursor: pointer;
          transition: 0.3s ease-in-out;
          &:hover {
            opacity: 0.8;
          }
          &:nth-of-type(2) {
            background-color: rgba(109, 109, 110, 0.7);
            color: white;
            svg {
              font-size: 1.5rem;
            }
          }
        }
      }
    }
  }
`;
export default Netflix;
