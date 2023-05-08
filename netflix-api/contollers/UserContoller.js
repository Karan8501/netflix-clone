const User = require("../modals/UserModal");

module.exports.addToLikeMovies = async (req, res) => {
  try {
    console.log("Eneter");
    const { email, data } = req.body;
    console.log(email, data);
    const user = await User.findOne({ email });
    if (user) {
      console.log("akff", user);
      const { likedMovies } = user;
      console.log(likedMovies);
      const moviesAlreadyLiked = likedMovies.find(({ id }) => {
        return id === data.id;
      });
      if (!moviesAlreadyLiked) {
        await User.findByIdAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true }
        );
      } else {
        return res.json({ msg: "movie is already added to the like list" });
      }
      return res.json({ msg: "Movie Added Sccees fully" });
    } else {
      await User.create({ email, likedMovies: [data] });
    }
  } catch (err) {
    return res.json({ msg: "Error adding movie" });
  }
};

module.exports.getLikedMovies = async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    console.log(user);
    if (user) {
      res.json({ msg: "scucces", movies: user.likedMovies });
    } else {
      return res.json({ msg: "user with given modal is not found" });
    }
  } catch (err) {
    return res.json({ msg: err });
  }
};

module.exports.removeLikedMovie = async (req, res) => {
  try {
    const { email, movieID } = req.body;
    const user = await User.findOne({ email });
    // console.log("found User", user);
    if (user) {
      const { likedMovies } = user;
      console.log(movieID);
      const movieIndex = likedMovies.findIndex(({ id }) => id === movieID);
      console.log(movieIndex);
      if (!(movieIndex + 1)) {
        return res.status(400).send({ msg: "movie not found" });
      }
      likedMovies.splice(movieIndex, 1);
      await User.findByIdAndUpdate(
        user._id,
        {
          likedMovies: [...user.likedMovies],
        },
        { new: true }
      );
      return res.json({
        msg: "Movie successfully removed.",
        movies: likedMovies,
      });
    } else return res.json({ msg: "User with given email not found." });
  } catch (err) {
    console.log(err);
    return res.json({ msg: "Error deleting movie", err: err });
  }
};
