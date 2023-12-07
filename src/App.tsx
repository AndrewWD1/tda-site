import { useState } from "react";
import "./styles.css";

export default function App() {
  const [state, updateState] = useState([] as number[][]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <div
        style={{
          width: "400px",
          height: "400px",
          border: "1px solid black",
        }}
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
      ></div>
      {state.map((point) => (
        <div key={point[0].toString()}>{point}</div>
      ))}
    </div>
  );
}
