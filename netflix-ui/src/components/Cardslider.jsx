import React, { useRef, useState } from "react";
import styled from "styled-components";
import Card from "./Card";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

function Cardslider({ data, title }) {
  const [showControls, setShowControls] = useState(false);
  const listRef = useRef();
  const [position, setPostion] = useState(0);
  const handleDirection = (direction) => {
    let distance = listRef.current.getBoundingClientRect().left;
    if (direction === "left" && position > 0) {
      listRef.current.style.transform = `translateX(${230 + distance}px)`;
      setPostion(position - 1);
    }
    if (direction === "right" && position < 4) {
      listRef.current.style.transform = `translateX(${-230 + distance - 64}px)`;
      setPostion(position + 1);
    }
  };
  return (
    <Container
      className="flex column"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <h1>{title}</h1>
      <div className="wrapper">
        <div
          className={`slider-action left ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineLeft onClick={() => handleDirection("left")} />
        </div>

        <div className="slider flex" ref={listRef}>
          {data.map((movie, index) => {
            return <Card movieData={movie} key={movie.id} index={index} />;
          })}
        </div>
        <div
          className={`slider-action right ${
            !showControls ? "none" : ""
          } flex j-center a-center`}
        >
          <AiOutlineRight onClick={() => handleDirection("right")} />
        </div>
      </div>
    </Container>
  );
}

const Container = styled.div`
  gap: 1rem;
  padding: 2rem 0;
  h1 {
    margin-left: 2rem;
  }
  .wrapper {
    position: relative;
    .slider {
      width: max-content;
      gap: 1rem;
      transform: translateX(0px);
      transition: 0.3s ease-in-out;
      margin-left: 2rem;
    }
    .slider-action {
      z-index: 99;
      height: 100%;
      position: absolute;
      top: 0;
      bottom: 0;
      width: 2rem;
      transition: 0.3s ease-in-out;
      svg {
        font-size: 2rem;
        cursor: pointer;
      }
    }
    .none {
      display: none;
    }
    .left {
      left: 0;
    }
    .right {
      right: 0;
    }
  }
`;

export default React.memo(Cardslider);
