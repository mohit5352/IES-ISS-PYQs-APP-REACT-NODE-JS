// Header.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const navigate = useNavigate();

  const routeToHome = () => {
    navigate('/');
  }

  return (
    <div className='header'>
      <img src='../../public/UPSC_IES_ISS_LOGO.jfif' alt="StatEco PaperStack Logo" className="app-logo-image" onClick={routeToHome}/>
      <h3 className='app-title'>StatEco PaperStack</h3>
    </div>
  );
};

export default Header;
