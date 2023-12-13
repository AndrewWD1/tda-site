import { useState } from "react";
import Point from "./components/Point";
import "./styles.css";

export default function App() {
  const [state, updateState] = useState([] as number[][]);
  const [img, setImg] = useState("");

  return (
    <div className="App">
      <p>
        Click to add points to your scatter plot. Then click submit to get a
        persistance diagram for your plot.
      </p>
      <div
        className="Plot"
        onClick={(e: React.MouseEvent<HTMLElement>) => {
          // rect finds the absolute position of the box
          const rect = e.currentTarget.getBoundingClientRect();

          // Find the relative position of point within the box
          const left = Number(e.clientX - rect.left - 3);
          const top = Number(400 - (e.clientY - rect.top + 9));

          updateState([...state, [left, top]]);
        }}
      >
        {state.map((point, index) => (
          <Point vals={point} key={index} />
        ))}
      </div>
      <div className="ButtonHolder">
        <button
          onClick={async () => {
            const res = await fetch(
              "https://tda-api-andrewdoumont.replit.app/",
              {
                method: "POST",
                body: JSON.stringify(state),
                headers: {
                  "Content-Type": "application/json",
                },
              },
            );
            const imBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imBlob);
            setImg(imageObjectURL);
          }}
        >
          Submit
        </button>
        <button
          onClick={() => {
            updateState([]);
            setImg("");
          }}
        >
          {" "}
          Clear
        </button>
      </div>
      {img && (
        <div
          style={{
            border: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <h2>Persistance Diagram</h2>
          <img src={img} />
        </div>
      )}
    </div>
  );
}
