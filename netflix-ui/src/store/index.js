import { API_KEY, TMDB_BASE_URL } from "../utils/contstants";

import axios from "axios";
import {
  configureStore,
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import { async } from "@firebase/util";

const initialState = {
  movie: [],
  genresLoaded: false,
  genres: [],
};

const NetflixSlice = createSlice({
  name: "Netflix",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
    builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
    builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
    builder.addCase(removeUsersLikedMovies.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
  },
});

//thunk midlware
export const getUsersLikedMovies = createAsyncThunk(
  "netflix/getLiked",
  async (email) => {
    const {
      data: { movies },
    } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
    return movies;
  }
);
export const removeUsersLikedMovies = createAsyncThunk(
  "netflix/delete",
  async ({ email, movieID }) => {
    console.log(email, movieID);
    const {
      data: { movies },
    } = await axios.put(`http://localhost:5000/api/user/delete`, {
      email,
      movieID,
    });
    return movies;
  }
);

export const getGenres = createAsyncThunk("netflix/genres", async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  // console.log(data);
  // console.log(genres)

  return genres;
});
const createArrayFromRawData = (array, movieArray, genres) => {
  console.log(array);
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genre) => {
      const name = genres.find(({ id }) => id === genre);
      if (name) movieGenres.push(name.name);
    });
    if (movie.backdrop_path) {
      movieArray.push({
        id: movie.id,
        name: movie?.original_name ? movie.original_name : movie.original_title,
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
    }
  });
};

const getRawData = async (api, genres, paging) => {
  const movieArray = [];
  for (let i = 1; movieArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ""}
      `);
    console.log(`${api}${paging ? `&page=${i}` : ""}
      `);
    console.log("results", results);
    createArrayFromRawData(results, movieArray, genres);
  }
  return movieArray;
};

export const fetchMovies = createAsyncThunk(
  "netflix/trending",
  ({ type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();

    return getRawData(
      `${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`,
      genres,
      true
    );
    // console.log(data);
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "netflix/type",
  ({ genre, type }, thunkApi) => {
    const {
      netflix: { genres },
    } = thunkApi.getState();
    console.log(genre);

    return getRawData(
      `https://api.themoviedb.org/3/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`,
      genres,
      true
    );
    // console.log("row data",data);
  }
);

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
  },
});
