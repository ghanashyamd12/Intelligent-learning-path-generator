import { useState, useEffect } from "react";
import FlowView from "./components/FlowView";

const BASE_URL = "http://localhost:5000";

function App() {
  const [user, setUser] = useState(null);
  const [isLogin, setIsLogin] = useState(true);

  const [roadmap, setRoadmap] = useState(null);
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [showForm, setShowForm] = useState(true);

  const [authData, setAuthData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [formData, setFormData] = useState({
    goal: "",
    level: "Beginner",
  });

  /* ================= AUTH ================= */
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(true);
  }, []);

  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleAuthSubmit = async () => {
    console.log("LOGIN CLICKED");

    const url = isLogin
      ? `${BASE_URL}/api/auth/login`
      : `${BASE_URL}/api/auth/register`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
      });

      const data = await res.json();
      console.log("AUTH RESPONSE:", data);

      if (!res.ok) {
        return alert(data.message || "Auth failed");
      }

      if (isLogin) {
        localStorage.setItem("token", data.token);
        setUser(true);
      } else {
        alert("Registered successfully. Please login.");
        setIsLogin(true);
      }

      setAuthData({ name: "", email: "", password: "" });

    } catch (err) {
      console.error("AUTH ERROR:", err);
      alert("Server error");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setShowForm(true);
    setShowRoadmap(false);
    setRoadmap(null);
  };

  /* ================= GENERATE ROADMAP ================= */
  const handleGenerate = async () => {
    console.log("GENERATE CLICKED");

    if (!formData.goal.trim()) {
      return alert("Enter a goal");
    }

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Session expired. Please login again.");
        handleLogout();
        return;
      }

      const res = await fetch(`${BASE_URL}/api/roadmap/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("ROADMAP RESPONSE:", data);

      if (res.status === 401) {
        alert("Session expired. Please login again.");
        handleLogout();
        return;
      }

      if (!res.ok) {
        return alert(data.message || "Failed to generate roadmap");
      }

      setRoadmap(data);
      setShowForm(false);
      setShowRoadmap(true);

    } catch (err) {
      console.error("GENERATE ERROR:", err);
      alert("Error generating roadmap");
    }
  };

  /* ================= LOGIN PAGE ================= */
  if (!user) {
    return (
      <div className="min-h-screen bg-[#0B1120] flex flex-col">

        {/* NAVBAR */}
        <div className="flex justify-between items-center px-8 py-4 border-b border-white/10">
          <h1 className="text-white text-lg font-semibold">SkillPath</h1>

          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-sm text-gray-300 hover:text-white"
          >
            {isLogin ? "Register" : "Login"}
          </button>
        </div>

        {/* CENTER */}
        <div className="flex flex-1 items-center justify-center px-4">
          <div className="w-full max-w-md bg-[#111827] p-8 rounded-xl shadow-lg border border-white/10">

            <h2 className="text-white text-xl font-semibold mb-6 text-center">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>

            {!isLogin && (
              <input
                name="name"
                placeholder="Full Name"
                value={authData.name}
                onChange={handleAuthChange}
                autoComplete="off"
                className="input"
              />
            )}

            <input
              name="email"
              placeholder="Email"
              value={authData.email}
              onChange={handleAuthChange}
              autoComplete="off"
              className="input"
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={authData.password}
              onChange={handleAuthChange}
              autoComplete="off"
              className="input mb-4"
            />

            <button
              type="button"
              onClick={handleAuthSubmit}
              className="btn-primary w-full"
            >
              {isLogin ? "Login" : "Register"}
            </button>

          </div>
        </div>
      </div>
    );
  }

  /* ================= MAIN APP ================= */
  return (
    <div className="min-h-screen bg-[#0B1120]">

      {/* NAVBAR */}
      <div className="fixed top-0 left-0 w-full border-b border-white/10 bg-[#0B1120] z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

          <h1
            onClick={() => {
              setShowForm(true);
              setShowRoadmap(false);
            }}
            className="text-white font-semibold text-lg cursor-pointer"
          >
            SkillPath
          </h1>

          <div className="flex gap-6 text-sm text-gray-300">

            <button
              onClick={() => {
                setShowForm(true);
                setShowRoadmap(false);
              }}
              className="hover:text-white"
            >
              New Roadmap
            </button>

            <button
              onClick={handleLogout}
              className="hover:text-red-400"
            >
              Logout
            </button>

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-20 px-6">

        {/* FORM */}
        {showForm && (
          <div className="max-w-2xl mx-auto mt-10 bg-[#111827] p-8 rounded-xl border border-white/10 shadow-lg">

            <h2 className="text-white text-xl mb-6 text-center">
              Build Your Roadmap
            </h2>

            <input
              placeholder="Goal (e.g., Backend Developer)"
              value={formData.goal}
              onChange={(e) =>
                setFormData({ ...formData, goal: e.target.value })
              }
              className="input mb-4"
            />

            <select
              value={formData.level}
              onChange={(e) =>
                setFormData({ ...formData, level: e.target.value })
              }
              className="input mb-6"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>

            <button
              onClick={handleGenerate}
              className="btn-primary w-full"
            >
              Generate Roadmap
            </button>
          </div>
        )}

        {/* GRAPH */}
        {showRoadmap && roadmap && (
          <div className="max-w-6xl mx-auto mt-10">

            <h2 className="text-white text-2xl mb-4 text-center">
              {roadmap.title}
            </h2>

            <FlowView roadmap={roadmap} />
          </div>
        )}

      </div>
    </div>
  );
}

export default App;