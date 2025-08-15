export default function Navbar() {
  return (
    <>
      <style>{`
        nav {
          background: rgba(223, 36, 36, 0.7);
          color: black;
          padding: 1rem 2rem;
          font-family: 'Poppins', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-weight: 700;
          font-size: 1.75rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.3);
          position: sticky;
          top: 0;
          z-index: 1000;

          border: 3px solid black;   /* Rounded black border */
          border-radius: 15px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          user-select: none;
        }

        .nav-center {
          flex: 1;
          text-align: center;
          font-size: 1.75rem;
          font-weight: 800;
          font-family: 'Poppins', sans-serif;
          letter-spacing: 2px;
          color: black;
          user-select: none;
        }

        .nav-icon {
          width: 36px;
          height: 36px;
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.5rem;
          user-select: none;
        }

        .heart-icon path {
          fill: black;
        }
      `}</style>

      <nav>
        {/* Left React Emoji */}
        <div className="nav-icon" aria-label="React Emoji" role="img" title="React">
          ⚛️
        </div>

        {/* Center Text */}
        <div className="nav-center">Doctors' Stroke Prediction</div>

        {/* Right Human Heart SVG Icon */}
        <svg
          className="nav-icon heart-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          aria-label="Human Heart Icon"
          role="img"
          fill="black"
          stroke="black"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ width: "36px", height: "36px" }}
        >
          {/* Simplified human heart shape SVG */}
          <path d="M32 58s26-15.5 26-35.5S44 4 32 20 6 9 6 22.5 32 58 32 58z" />
          <path d="M32 30c-3-8-15-10-15 2" fill="none" />
          <path d="M32 30c3-8 15-10 15 2" fill="none" />
        </svg>
      </nav>
    </>
  );
}
