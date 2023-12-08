import { useState } from "react";
import "./styles.css";

function Point({ vals }: { vals: number[] }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: vals[1],
        left: vals[0],
        width: "1px",
        height: "1px",
        border: " 1px solid black",
      }}
    ></div>
  );
}

export default function App() {
  const [state, updateState] = useState([] as number[][]);

  return (
    <div className="App">
      <h1>TDA Tester</h1>
      <p>
        Click to add points to your scatter plot. Then run we can create a
        persistance diagram for this data
      </p>
      <div
        className="Plot"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          const rect = e.currentTarget.getBoundingClientRect();
          updateState([
            ...state,
            [
              Number(e.clientX - rect.left),
              Number(400 - (e.clientY - rect.top)),
            ],
          ]);
        }}
      >
        {state.map((point, index) => (
          <Point vals={point} key={index} />
        ))}
      </div>
    </div>
  );
}
