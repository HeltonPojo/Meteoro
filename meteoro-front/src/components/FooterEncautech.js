import React from 'react';

const FooterEncautech = () => {
  return (
    <footer style={footerStyle} className='d-flex justify-content-center align-items-center'>
      <p style={textStyle}>Todos os direitos reservados a Encautech©</p>
    </footer>
  );
}

const footerStyle = {
  backgroundColor: 'transparent',
  position: 'fixed',
  bottom: 0,
  width: '100%',
  textAlign: 'center',
  padding: '10px 0',
}

const textStyle = {
  color: 'gray',
}

export default FooterEncautech;
