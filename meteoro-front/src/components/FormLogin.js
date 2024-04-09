import React, { useState, useRef } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';


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





function Formlogin({ addUserData }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [atividade, setAtividade] = useState('');
  const [departamento, setDepartamento] = useState('');
  const [open, setOpen] = useState(false);

  function handelEntrar(event) {
    event.preventDefault();
    addUserData(email, senha, atividade, departamento);
  }

  return (
    <>
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
              <FormControl required fullWidth autoFocus>
                <InputLabel id="dpto">Departamento</InputLabel>
                <Select
                  id="Departamento"
                  label="Departamento"
                  labelId="dpto"
                  autoComplete="Departamento"
                  onChange={(e) => setDepartamento(e.target.value)}
                  open={open}
                  value={departamento}
                  onOpen={() => setOpen(true)}
                  onClose={() => setOpen(false)}
                >
                  <MenuItem value="Comercial">Comercial</MenuItem>
                  <MenuItem value="Financeiro">Financeiro</MenuItem>
                  <MenuItem value="Gestão de Pessoas">Gestão de Pessoas</MenuItem>
                  <MenuItem value="Marketing">Marketing</MenuItem>
                  <MenuItem value="Projetos">Projetos</MenuItem>
                  <MenuItem value="Conselho">Conselho</MenuItem>
                  <MenuItem value="Não Relacionado a Encautech">Não Relacionado a Encautech</MenuItem>
                </Select>
              </FormControl>
              <TextField
                margin="normal"
                type='text'
                required
                fullWidth
                id="Atividade"
                label="Atividade"
                name="Atividade"
                autoComplete="Atividade"
                autoFocus
                onChange={e => setAtividade(e.target.value)}
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