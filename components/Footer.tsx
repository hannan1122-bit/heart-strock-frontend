export default function Footer() {
  return (
    <>
      <style>{`
        footer {
          margin-top: 3rem;
          padding: 1.5rem;
          text-align: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: #fff;
          font-weight: 700;
          font-size: 1rem;
          background-color: rgb(179, 38, 26); /* Dark red background */
          box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.3);
          border-radius: 8px 8px 0 0;
          user-select: none;
        }
      `}</style>

      <footer>
        &copy; {new Date().getFullYear()} Stroke Predictor. All rights reserved.
      </footer>
    </>
  );
}
