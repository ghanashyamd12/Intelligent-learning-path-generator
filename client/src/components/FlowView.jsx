import ReactFlow, {
  Controls,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

const FlowView = ({ roadmap }) => {
  // 🎨 Node styling
  const styledNodes = roadmap.nodes.map((node) => ({
    ...node,
    style: {
      background: node.data?.done ? "#16a34a" : "#1e293b",
      color: "#fff",
      border: "1px solid #6366f1",
      borderRadius: "12px",
      padding: "10px",
      fontSize: "12px",
      width: 180,
      textAlign: "center",
      boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
      cursor: "pointer",
    },
  }));

  return (
    <div
      style={{
        width: "100%",
        height: "80vh", // 🔥 big canvas
        background: "#020617",
        borderRadius: "12px",
      }}
    >
      <ReactFlow
        nodes={styledNodes}
        edges={roadmap.edges}
        fitView

        // 🔥 UX IMPROVEMENTS
        panOnDrag={true}
        panOnScroll={true}
        zoomOnScroll={false}
        zoomOnPinch={true}
        zoomOnDoubleClick={true}

        minZoom={0.5}
        maxZoom={1.5}

        nodesDraggable={false}

        // 🔥 Click handler (you’ll upgrade this next)
        onNodeClick={(e, node) => {
          console.log("Clicked:", node.data.label);
        }}
      >
        <Background gap={20} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default FlowView;