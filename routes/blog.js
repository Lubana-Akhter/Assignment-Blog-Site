const express =require("express");
const router = express.Router();

// middlewares
//const { requireSignin, isAdmin } =require("../middlewares/auth.js");
// controllers
const {
  create,
  remove,
  list,
  read,
  update
} =require("../controllers/blog");


router.post("/create-blog", create);
router.get("/list", list);
router.get("/read/:id", read);
router.post("/update/:id", update);
router.delete("/delete-blog/:id", remove);


module.exports= router;
