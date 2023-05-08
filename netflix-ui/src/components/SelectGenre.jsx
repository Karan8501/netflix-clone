import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchMovies, fetchMoviesByGenre } from "../store";

function SelectGenre({ genres, type }) {
  const dispatch = useDispatch();
  return (
    <Select
      className="flex"
      onChange={(e) => {
        if (e.target.value != "All") {
          dispatch(fetchMoviesByGenre({ genre: e.target.value, type }, []));
        } else {
          dispatch(fetchMovies({ type: type }, []));
        }
      }}
    >
      <option value="All">All</option>
      {genres.map((genre) => {
        return (
          <option value={genre.id} key={genre.id} required>
            {genre.name}
          </option>
        );
      })}
    </Select>
  );
}

const Select = styled.select`
  margin-left: 2rem;
  padding: 0.5rem;
  cursor: pointer;
  font-size: 1.2rem;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border-radius: 0.4rem;
  border: 2px solid #fff;
`;

export default React.memo(SelectGenre);
