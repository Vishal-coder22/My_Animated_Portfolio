export default function NoiseOverlay() {
  return (
    <div
      className="noise-overlay pointer-events-none"
      style={{ contain: "strict" }}
      aria-hidden="true"
    />
  );
}
