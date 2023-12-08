import { useState } from "react";
import "./styles.css";

function Point({ vals }: { vals: number[] }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: vals[1],
        left: vals[0],
      }}
    >
      &#x2022;
    </div>
  );
}

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
      <div className="ButtonHolder">
        <button
          onClick={async () => {
            const res = await fetch("https://tda-api.andrewdoumont.repl.co/", {
              method: "POST",
              body: JSON.stringify(state),
              headers: {
                "Content-Type": "application/json",
              },
            });
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
      {img && <img src={img} />}
    </div>
  );
}
