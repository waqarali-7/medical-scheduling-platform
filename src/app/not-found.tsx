import Link from "next/link";

export default function Custom404() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        textAlign: "center",
        padding: "1rem 2rem",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>404</h1>
      <p style={{ fontSize: "1.25rem", marginBottom: "1.5rem", color: "#666" }}>
        Oops! Page not found.
      </p>
      <Link
        href="/dashboard"
        style={{
          display: "inline-block",
          padding: "0.5rem 1.25rem",
          backgroundColor: "#0ea5e9",
          color: "white",
          borderRadius: "8px",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
