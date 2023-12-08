export default function Point({ vals }: { vals: number[] }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: vals[1],
        left: vals[0],
        cursor: "default",
      }}
    >
      &#x2022;
    </div>
  );
}
