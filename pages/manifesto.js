import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function Manifesto() {
    return (
        <div className="manifesto-container">
            <Navbar />

            <div className="coming-soon">
                <h1>🚀 Coming Soon</h1>
                <p>We’re working hard to bring you something inspiring.<br /> Stay tuned!</p>
            </div>

            <Footer />

            <style jsx>{`
        .manifesto-container {
          font-family: "Arial", sans-serif;
          background: linear-gradient(135deg, #ffe6f0, #f8d7da);
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .coming-soon {
          text-align: center;
          padding: 6rem 2rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          animation: fadeIn 1.2s ease-in-out;
        }

        .coming-soon h1 {
          font-size: 3rem;
          font-weight: bold;
          color: #d63384;
          margin-bottom: 1rem;
        }

        .coming-soon p {
          font-size: 1.3rem;
          color: #333;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
        </div>
    );
}
