const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const router = express.Router();

router.use(protect);
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

module.exports = router;
