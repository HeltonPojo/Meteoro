import React, { useState, useEffect } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import axios from "axios";
import { orange } from '@mui/material/colors';

import Relogio from "./Relogio";

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
            const response = await axios.get('http://localhost:8081/membros-presentes');
            setUserData(response.data);
        } catch (error) {
            console.error('Erro ao buscar dados da API:', error);
        }
    };


    function handleSair(event) {
        event.preventDefault();
        const Id = event.currentTarget.dataset.userId;
        axios.post('http://localhost:8081/marcar-saida', { Id }).then(res => {
            location.reload();
        })
            .catch(err => console.log(err));
    }

    return (
        <>
            {userData.map((user) => (
                <Card sx={{ maxWidth: 300 }} key={user.Id}>
                    <CardHeader
                        avatar={
                            <Avatar sx={{ bgcolor: orange }} aria-label="recipe">
                                E
                            </Avatar>
                        }
                        title={user.Email}
                        subheader={user.Cargo}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                            <Relogio horas={user.horas} Entrada={user.Entrada} />
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="medium" onClick={handleSair} data-user-id={user.Id}>Sair</Button>
                    </CardActions>
                </Card>
            ))}
        </>
    );
}

export default CardPresenca;