import { useState, useEffect } from "react";

function App() {
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showRoadmap, setShowRoadmap] = useState(false);

  /* =========================
     LOAD FROM LOCAL STORAGE
  ========================= */
  useEffect(() => {
    const savedRoadmap = localStorage.getItem("roadmap");
    const savedView = localStorage.getItem("showRoadmap");

    if (savedRoadmap && savedView === "true") {
      setRoadmap(JSON.parse(savedRoadmap));
      setShowRoadmap(true);
    }
  }, []);

  /* =========================
     SAVE TO LOCAL STORAGE
  ========================= */
  useEffect(() => {
    if (roadmap && showRoadmap) {
      localStorage.setItem("roadmap", JSON.stringify(roadmap));
      localStorage.setItem("showRoadmap", "true");
    }
  }, [roadmap, showRoadmap]);

  /* =========================
     GENERATE ROADMAP
  ========================= */
  const handleGenerate = async () => {
    if (!goal.trim()) return;

    try {
      setLoading(true);

      const response = await fetch(
        "http://localhost:5000/api/roadmap/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ goal }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch roadmap");
      }

      const data = await response.json();

      setRoadmap(data);
      setShowRoadmap(true);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Check backend.");
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     LOAD LAST ROADMAP (OPTIONAL)
  ========================= */
  const loadLatestRoadmap = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/roadmap/latest"
      );

      if (!res.ok) {
        alert("No previous roadmap found");
        return;
      }

      const data = await res.json();

      setRoadmap(data);
      setShowRoadmap(true);
    } catch (error) {
      console.error("Error loading roadmap:", error);
    }
  };

  /* =========================
     TOGGLE TASK + SAVE TO DB
  ========================= */
  const toggleTask = async (skillIndex, taskIndex) => {
    if (!roadmap || !roadmap._id) return;

    const updated = {
      ...roadmap,
      skills: roadmap.skills.map((skill, sIndex) =>
        sIndex === skillIndex
          ? {
              ...skill,
              tasks: skill.tasks.map((task, tIndex) =>
                tIndex === taskIndex
                  ? { ...task, done: !task.done }
                  : task
              ),
            }
          : skill
      ),
    };

    // Update UI immediately
    setRoadmap(updated);

    try {
      console.log("📡 Updating progress in DB...");

      await fetch(
        `http://localhost:5000/api/roadmap/${roadmap._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updated),
        }
      );

      console.log("✅ DB Updated");
    } catch (error) {
      console.error("❌ Update failed:", error);
    }
  };

  /* =========================
     CALCULATE PROGRESS
  ========================= */
  const calculateProgress = () => {
    if (!roadmap) return 0;

    let total = 0;
    let completed = 0;

    roadmap.skills.forEach((skill) => {
      skill.tasks.forEach((task) => {
        total++;
        if (task.done) completed++;
      });
    });

    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 p-6">

      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">
        Intelligent Learning Path Generator
      </h1>

      {/* ================= FORM ================= */}
      {!showRoadmap && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">

          <input
            type="text"
            placeholder="Enter your goal (e.g., Backend Developer)"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="w-full p-3 border rounded-md mb-4"
          />

          <button
            onClick={handleGenerate}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Roadmap"}
          </button>

          <button
            onClick={loadLatestRoadmap}
            className="mt-4 w-full text-indigo-600 underline"
          >
            Load Last Roadmap
          </button>
        </div>
      )}

      {/* ================= ROADMAP ================= */}
      {showRoadmap && roadmap && (
        <div className="mt-10 max-w-5xl mx-auto">

          {/* Back Button */}
          <button
            onClick={() => {
              setShowRoadmap(false);
              setGoal("");
              setRoadmap(null);

              localStorage.removeItem("roadmap");
              localStorage.removeItem("showRoadmap");
            }}
            className="mb-4 px-4 py-2 bg-gray-500 text-white rounded"
          >
            ← Back
          </button>

          <h2 className="text-2xl font-semibold mb-6 text-center">
            Roadmap for {roadmap.title}
          </h2>

          {/* Progress */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-600">Progress</span>
              <span className="text-sm font-semibold text-indigo-600">
                {calculateProgress()}%
              </span>
            </div>

            <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
              <div
                className="bg-indigo-600 h-4 transition-all duration-500"
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>

          {/* Skills */}
          <div className="grid md:grid-cols-3 gap-6">
            {roadmap.skills.map((skill, index) => (
              <div
                key={index}
                className="bg-white p-5 rounded-xl shadow-md"
              >
                <h3 className="font-bold text-lg mb-3 text-center">
                  {skill.name}
                </h3>

                <div className="space-y-2">
                  {skill.tasks.map((task, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => toggleTask(index, i)}
                      />

                      <span
                        className={
                          task.done
                            ? "line-through text-gray-400"
                            : "text-gray-700"
                        }
                      >
                        {task.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      )}
    </div>
  );
}

export default App;