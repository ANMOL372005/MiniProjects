import React from 'react';
import { Link , useNavigate} from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="navbar">
      <div className="nav-brand" onClick={()=> navigate('/')} >CricketScore</div>
      <div className="nav-links">
        <Link to="/play">Play</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar; 