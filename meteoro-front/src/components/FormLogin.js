import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider,createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#ec8135',
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


function Formlogin(){
    return(
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
              required
              fullWidth
              id="Email"
              label="Email"
              name="Email"
              autoComplete="Email"
              autoFocus
            />
            <TextField
                margin="normal"
                name="Senha"
                required
                fullWidth
                id="Senha"
                label="Senha"
                autoFocus
              />
            
            <Button
              type="submit"
              color="primary"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, paddingTop: 2, paddingBottom:2, }}
            >
              Entrar
            </Button>
          </Box>
        </Box>
        </ThemeProvider>
      </Container>  
    );
}

export default Formlogin