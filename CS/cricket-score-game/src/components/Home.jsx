import React from "react";
import "./Home.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
  return (
    <div className="home-container">
      {/* Hero Section */}
      <header className="hero">
        <h1>Welcome to Our Platform</h1>
        <p>Connecting you with the best services effortlessly.</p>
        <button className="btn" onClick={()=> navigate("/play")}>Get Started</button>
      </header>

      {/* Features Section */}
      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>🚀 Fast & Reliable</h3>
            <p>Experience seamless and efficient services.</p>
          </div>
          <div className="card">
            <h3>🖥️ User-Friendly</h3>
            <p>Designed with simplicity for easy navigation.</p>
          </div>
          <div className="card">
            <h3>💬 24/7 Support</h3>
            <p>We're here to help you anytime.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Your Company. All Rights Reserved.</p>
        <div className="social-links">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
