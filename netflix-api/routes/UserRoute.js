const router = require("express").Router();

const {
  addToLikeMovies,
  getLikedMovies,
  removeLikedMovie,
} = require("../contollers/UserContoller");

router.post("/add", addToLikeMovies);
router.get("/liked/:email", getLikedMovies);
router.put("/delete", removeLikedMovie);

module.exports = router;
