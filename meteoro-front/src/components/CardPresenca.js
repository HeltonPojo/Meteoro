import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { ThemeProvider, createTheme } from '@mui/material/styles';

import axios from "axios";
import { orange } from '@mui/material/colors';

import Relogio from "./Relogio";

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

const tutorInfoStyles = () => ({
  title: {
    fontFamily: family,
    color: "#4d4b5f",
    fontSize: titleFontSize,
    lineHeight: 1.2,
    fontWeight: 700,
    marginBottom: "0.125rem",
  },
  subtitle: {
    fontFamily: family,
    color: "#696c6f",
    fontWeight: 500,
    fontSize: subtitleFontSize,
    lineHeight: 1.4,
  },
});

function CardPresenca() {
  /* PARA QUANDO TIVERMOS FOTOS DOS MEMBROS
    <CardMedia
      component="img"
      alt="green iguana"
      height="140"
      image="/"
    />
  */
  const [userData, setUserData] = useState([]);

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          position => {
            setLatitude(position.coords.latitude.toFixed(3));
            setLongitude(position.coords.longitude.toFixed(3));
          },
          error => {
            setError(error.message);
          }
        );
      } else {
        setError('Geolocation is not supported by this browser.');
      }
    };
    getLocation();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://15.228.155.72:8081/membros-presentes');
      setUserData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };


  function handleSair(event) {
    if(latitude === -21.533 && longitude === -42.635){
    event.preventDefault();
    const Id = event.currentTarget.dataset.userId;
    axios.post('http://15.228.155.72:8081/marcar-saida', { Id }).then(res => {
      location.reload();
    })
      .catch(err => console.log(err));
    }else{
      alert('É necessario estar na sede')
    }
  }

  return (
    <>
      {userData.map((user) => (
        <ThemeProvider theme={theme}>
          <Card
            sx={{
              maxWidth: 300,
              maxHeight: 250,
              borderRadius: "12px",
              marginTop: 2.0,
              minWidth: 256,
              textAlign: "center",
              boxShadow:
                "0 2px 4px -2px rgba(0,0,0,0.24), 0 4px 24px -2px rgba(0, 0, 0, 0.2)",
            }}

            key={user.Id}
          >

            <Box
              display="flex"
              p={1.5}
              maxWidth={350}
              gap={1}
              sx={{ alignItems: "center", marginTop: 2.0, }}
              key={user.Id}
            >
              <Box>
                <Avatar
                  src={''}
                  sx={{ borderRadius: 3, width: 48, height: 48 }}
                >E</Avatar>
              </Box>
              <div sx={{ flex: "auto" }} useStyles={tutorInfoStyles}>
                <Typography>{user.Nome}</Typography>
                <Typography>{user.Cargo}</Typography>
              </div>
            </Box>

            <Divider light />
            <Box display={"flex"}>
              <Box
                p={1}
                flex={"auto"}
                sx={{
                  position: "relative",
                  "&:not(:last-of-type)": {
                    "&:after": {
                      content: '" "',
                      display: "block",
                      position: "absolute",
                      height: "50%",
                      width: "1px",
                      backgroundColor: "rgba(0 0 0 / 0.08)",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    fontSize: 10,
                    color: "grey.500",
                    fontWeight: 500,
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    margin: 0,
                  }}
                >
                  Horas
                </Box>
                <Box
                  component="p"
                  sx={{
                    fontSize: 14,
                    fontWeight: "bold",
                    marginBottom: 0.5,
                    letterSpacing: "1px",
                  }}
                >
                  <Typography gutterBottom variant="h3" component="div">
                    <Relogio horas={user.horas} Entrada={user.Entrada} />
                  </Typography>
                </Box>
              </Box>
              <Box
                p={1}
                flex={"auto"}
                sx={{
                  position: "relative",
                  "&:not(:last-of-type)": {
                    "&:after": {
                      content: '" "',
                      display: "block",
                      position: "absolute",
                      height: "50%",
                      width: "1px",
                      backgroundColor: "rgba(0 0 0 / 0.08)",
                      top: "50%",
                      right: 0,
                      transform: "translateY(-50%)",
                    },
                  },
                }}
              >
                <Box
                  component="p"
                  sx={{
                    fontSize: 20,
                    fontWeight: "bold",
                    marginTop: 2.0,
                    letterSpacing: "1px",
                  }}
                >
                  <Button color="primary" variant="contained" size="medium" onClick={handleSair} data-user-id={user.Id}>Sair</Button>
                </Box>
              </Box>
            </Box>
          </Card>
        </ThemeProvider>
      ))}

    </>
  );


}

export default CardPresenca;