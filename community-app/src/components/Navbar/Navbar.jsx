import './Navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
    
    const handleGetStarted = () => {
        navigate('/login'); // Navigate to the login page
      };

  return (
    <div className='nav'>
        <div className='nav-logo'>Clean-Yuva</div>
        <ul  className='nav-menu'>
            <li className='nav-item'>About</li>
            <li className='nav-item'>Services</li>
            <li className='nav-item'>Tips</li>
            <li className='nav-item'>Contact us</li>
            <li onClick={()=>navigate('/admin')} className='nav-item'>Admin Pannel</li>
            <li onClick={handleGetStarted} className='nav-item'>
              <button className='nav-sign'>
                Sign in
              </button>
              
              </li>
        </ul>
    </div>
  )
}

export default  Navbar;