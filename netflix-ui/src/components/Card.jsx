import React from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BiChevronDown } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../utils/firebase-config";
import video from "../assets/test.mp4";
import { removeUsersLikedMovies } from "../store";

function Card({ movieData, isLiked = false }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  // console.log(movieData);
  //backend
  const [email, setEmail] = useState(undefined);
  onAuthStateChanged(firebaseAuth, (currentUser) => {
    if (currentUser) {
      setEmail(currentUser.email);
    } else {
      navigate("/login");
    }
  });

  const addToList = async () => {
    try {
      console.log("adding movie");
      await axios.post("http://localhost:5000/api/user/add", {
        email,
        data: movieData,
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="movie"
      />

      {isHovered && (
        <div className="hover">
          <div className="image-video-container">
            <img
              src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
              alt="movie"
              onClick={() => navigate("/player")}
            />
            <video
              src={video}
              autoPlay
              loop
              muted
              onClick={() => navigate("/player")}
            ></video>
          </div>
          <div className="info-container flex column">
            <h3 className="name" onClick={() => navigate("/player")}>
              {movieData.name}
            </h3>
            <div className="icons flex j-between">
              <div className="controls flex">
                <IoPlayCircleSharp
                  title="Play"
                  onClick={() => navigate("/player")}
                />
              </div>
              <RiThumbUpFill title="Like" />
              <RiThumbDownFill title="Dislike" />
              {isLiked ? (
                <BsCheck
                  title="Remove from List"
                  onClick={() => {
                    dispatch(
                      removeUsersLikedMovies({ email, movieID: movieData.id })
                    );
                  }}
                />
              ) : (
                <AiOutlinePlus title="Add to my list" onClick={addToList} />
              )}
            </div>
            <div className="info">
              <BiChevronDown title="More Info" />
            </div>
            <div className="genres flex">
              <ul className="flex">
                {movieData.genres.map((genre) => {
                  return <li key={genre}>{genre}</li>;
                })}
              </ul>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
    max-width:230px;
    width:230px;
    height:100%;
    cursor: pointer;
    position:relative;
    img{
        border-radius:0.2rem;
        width:100%;
        height:100%;
        z-index:10;
    }
    .hover{
        z-index:90;
        height:max-content;
        width:20rem;
        position:absolute;
        top:-18vh;
        left:0;
        border-radius:0.3rem;
        box-shadow:rgba(0,0,0,0.75) 0px 3px 10px;
        background-color:#181818;
        transition: 0.3s ease-in-out;
        .image-video-container{
            position:relative;
            height: 140px;
            img{
                width:100%;
                height:140px;
                object-fit:cover;
                border-radius:0.3rem;
                top:0;
                left:0;
                z-index:4;
                position:absolute:
            }
            video {
                width: 100%;
                height: 140px;
                object-fit: cover;
                border-radius: 0.3rem;
                top: 0;
                left:0;
                z-index: 5;
                position: absolute;
            }

        }
        .info-container{
          padding:1rem;
          gap:1rem;
        }
        .icons{
          .controls{
            display:flex;
            gap:1rem;
          }
          svg{
            font-size:2rem;
            cursor:pointer;
            transition: 0.3s ease-in-out;
            &:hover{
              color:#b8b8b8;
            }
          }
        }
        .genres{
          ul{
            gap:1rem;
            li{
              padding-right:0.7rem;
              &:first-of-type{
                list-style-type:none;
              }
            }
          }
        }
    }

`;

export default React.memo(Card);
