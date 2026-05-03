import express from "express";
import Roadmap from "../models/Roadmap.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

/* =========================
   CREATE ROADMAP
========================= */
router.post("/generate", protect, async (req, res) => {
  console.log("🔥 API HIT");

  try {
    const { goal } = req.body;
    console.log("👉 Goal received:", goal);

    if (!goal || !goal.trim()) {
      console.log("❌ No goal provided");
      return res.status(400).json({ message: "Goal is required" });
    }

    const normalizedGoal = goal.toLowerCase();
    let roadmap;

    /* =========================
       BACKEND ROADMAP
    ========================= */
    if (normalizedGoal.includes("backend")) {
      console.log("✅ Backend roadmap selected");

      roadmap = {
        title: "Backend Developer",
        skills: [
          {
            name: "Programming",
            tasks: [
              { title: "Learn JavaScript basics", done: false },
              { title: "Understand async/await", done: false },
              { title: "Practice DSA basics", done: false },
            ],
          },
          {
            name: "Backend Development",
            tasks: [
              { title: "Learn Node.js fundamentals", done: false },
              { title: "Build REST APIs using Express", done: false },
              { title: "Implement authentication", done: false },
            ],
          },
          {
            name: "Database",
            tasks: [
              { title: "Learn MongoDB basics", done: false },
              { title: "Understand schema design", done: false },
              { title: "Practice CRUD operations", done: false },
            ],
          },
          {
            name: "Deployment",
            tasks: [
              { title: "Learn Docker basics", done: false },
              { title: "Understand AWS basics", done: false },
              { title: "Deploy your backend", done: false },
            ],
          },
        ],
      };
    }

    /* =========================
       ML ROADMAP
    ========================= */
    else if (
      normalizedGoal.includes("ml") ||
      normalizedGoal.includes("machine")
    ) {
      console.log("✅ ML roadmap selected");

      roadmap = {
        title: "Machine Learning Engineer",
        skills: [
          {
            name: "Math Foundations",
            tasks: [
              { title: "Learn Linear Algebra", done: false },
              { title: "Understand Probability & Statistics", done: false },
            ],
          },
          {
            name: "Programming",
            tasks: [
              { title: "Learn Python fundamentals", done: false },
              { title: "Work with NumPy & Pandas", done: false },
            ],
          },
          {
            name: "ML Concepts",
            tasks: [
              { title: "Supervised Learning", done: false },
              { title: "Unsupervised Learning", done: false },
            ],
          },
          {
            name: "Tools",
            tasks: [
              { title: "Use Scikit-learn", done: false },
              { title: "Explore TensorFlow / PyTorch", done: false },
            ],
          },
        ],
      };
    }

    /* =========================
       DEFAULT ROADMAP
    ========================= */
    else {
      console.log("⚠️ Default roadmap used");

      roadmap = {
        title: goal,
        skills: [
          {
            name: "Fundamentals",
            tasks: [
              { title: "Learn basics", done: false },
              { title: "Build small projects", done: false },
            ],
          },
        ],
      };
    }

    /* =========================
       SAVE TO DB
    ========================= */
    console.log("💾 Saving to MongoDB...");

    const savedRoadmap = await Roadmap.create(roadmap);

    console.log("✅ Saved to DB:", savedRoadmap._id);

    return res.status(201).json(savedRoadmap);

  } catch (error) {
    console.error("❌ ERROR:", error);
    return res.status(500).json({
      message: "Error saving roadmap",
      error: error.message,
    });
  }
});


/* =========================
   GET LATEST ROADMAP
========================= */
router.get("/latest", protect, async (req, res) => {
  try {
    console.log("📥 Fetching latest roadmap...");

    const roadmap = await Roadmap.findOne().sort({ _id: -1 });

    if (!roadmap) {
      return res.status(404).json({ message: "No roadmap found" });
    }

    res.json(roadmap);
  } catch (error) {
    console.error("❌ Fetch error:", error);
    res.status(500).json({ message: "Error fetching roadmap" });
  }
});


/* =========================
   UPDATE ROADMAP (PROGRESS)
========================= */
router.put("/:id", protect, async (req, res) => {
  try {
    console.log("🔥 UPDATE API HIT");

    const updatedRoadmap = await Roadmap.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedRoadmap);
  } catch (error) {
    console.error("❌ Update error:", error);
    res.status(500).json({ message: "Error updating roadmap" });
  }
});


export default router;