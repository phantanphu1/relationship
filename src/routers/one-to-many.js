const express = require("express");
const router = express.Router();
const OneToMany = require('../controllers/one-to-many')

router.post("/api/createCategory",OneToMany.createCategory);
router.post("/api/createComment",OneToMany.createComment);
router.post("/api/createTutorial",OneToMany.createTutorial);
router.get("/api/getTutorialById/:id",OneToMany.getTutorialById);
router.get("/api/getAllTutorial",OneToMany.getAllTutorial);

// chạy tutorial -> comment->category
module.exports = router