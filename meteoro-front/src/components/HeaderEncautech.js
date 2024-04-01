import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Logo from '../img/file.jpeg'

function HeaderEncautech() {
  return (
    <>
      <Navbar  className='d-flex justify-content-center align-items-center'>
        
          <Navbar.Brand> 
            <img
              alt='Logo'
              src={Logo}
              width="140"
              height="60"
              className="d-inline-block align-top"
            />{' '}
          </Navbar.Brand>
       
      </Navbar>
    </>
  );
}

export default HeaderEncautech;