import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';

import axios from "axios";


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ffa500',
    },
    secondary: {
      main: '#db562b',
    },
  },
  props: {
    MuiButton: {
      size: 'large',
    },
    MuiButtonGroup: {
      size: 'large',
    },
    MuiCheckbox: {
      size: 'large',
    },
    MuiFab: {
      size: 'large',
    },
    MuiFormControl: {
      margin: 'dense',
      size: 'large',
    },
    MuiFormHelperText: {
      margin: 'dense',
    },
    MuiIconButton: {
      size: 'large',
    },
    MuiInputBase: {
      margin: 'dense',
    },
    MuiInputLabel: {
      margin: 'dense',
    },
    MuiRadio: {
      size: 'large',
    },
    MuiSwitch: {
      size: 'large',
    },
    MuiTextField: {
      margin: 'dense',
      size: 'large',
    },
  },
  shape: {
    borderRadius: 16,
  },
});

// Componente funcional que renderiza o alerta
const AlertMessage = ({ open, severity, content, handleClose }) => (
  <Collapse in={open}>
    <Alert severity={severity} onClose={handleClose}>
      {content}
    </Alert>
  </Collapse>
);



function Formlogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success'); // Padrão: sucesso
  const [alertContent, setAlertContent] = useState('');


  //const [latitude, setLatitude] = useState(null);
  //const [longitude, setLongitude] = useState(null);
  //const [error, setError] = useState(null);
//
//  //useEffect(() => {
//  //  const getLocation = () => {
//  //    if (navigator.geolocation) {
  //      navigator.geolocation.getCurrentPosition(
  //        position => {
  //          setLatitude(position.coords.latitude.toFixed(3));
  //          setLongitude(position.coords.longitude.toFixed(3));
  //        },
  //        error => {
  //          setError(error.message);
  //        }
  //      );
  //    } else {
  //      setError('Geolocation is not supported by this browser.');
  //    }
  //  };
//
  //  getLocation();
  //}, []);

  const handleCloseAlert = () => {
    setAlertOpen(false);
  };

  function handelEntrar(event) {
    //if(latitude === -21.533 && longitude === -42.635){
    event.preventDefault();
    axios.post('http://15.228.155.72:8081/marcar-presenca', { email, senha })
      .then(res => {
        location.reload();
        
          var res = res.data;
          // Verifica se a resposta do servidor é "Informações incorretas"
          if (res === "Informações incorretas") {

            alert("As informações fornecidas estão incorretas. Este usuário já está logado");
            // setAlertContent("As informações fornecidas estão incorretas. Este usuário já está logado");
            // setAlertSeverity('error');
            // setAlertOpen(true);
          } else {
            alert("Login com sucesso");
            // setAlertContent("Login com sucesso");
            // setAlertSeverity('success');
            // setAlertOpen(true);
          }
      })
      .catch(err => console.log(err));
    //}else{
    //  alert('É necessario estar na sede')
    //}
  }

  return (
    <>
    <AlertMessage
        open={alertOpen}
        severity={alertSeverity}
        content={alertContent}
        handleClose={handleCloseAlert}
      /> 
    <Container component="main" maxWidth="xs">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >


          <Box component="form" noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              type='email'
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              autoFocus
              onChange={e => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              name="Senha"
              type='password'
              required
              fullWidth
              id="Senha"
              label="Senha"
              autoFocus
              onChange={e => setSenha(e.target.value)}
            />

            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, paddingTop: 2, paddingBottom: 2, }}
              onClick={handelEntrar}
            >
              Entrar
            </Button>
          </Box>
        </Box>
      </ThemeProvider>
    </Container>
    </>
  );
}

export default Formlogin;