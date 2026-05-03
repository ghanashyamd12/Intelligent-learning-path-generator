export const generateRoadmap = (goal) => {
  const normalizedGoal = goal.toLowerCase();

  if (normalizedGoal.includes("backend")) {
    return {
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
            { title: "Setup CI/CD pipeline", done: false },
          ],
        },
      ],
    };
  }

  if (normalizedGoal.includes("ml") || normalizedGoal.includes("machine")) {
    return {
      title: "Machine Learning Engineer",
      skills: [
        {
          name: "Math Foundations",
          tasks: [
            { title: "Learn Linear Algebra basics", done: false },
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
            { title: "Learn supervised learning", done: false },
            { title: "Learn unsupervised learning", done: false },
          ],
        },
        {
          name: "Tools",
          tasks: [
            { title: "Use Scikit-learn", done: false },
            { title: "Explore TensorFlow/PyTorch", done: false },
          ],
        },
      ],
    };
  }

  // Default fallback
  return {
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
};