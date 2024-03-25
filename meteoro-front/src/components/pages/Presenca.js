import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../Sidebar";
import FormLogin from "../FormLogin";
import CardPresenca from "../CardPresenca";
import CardHorasFeitas from "../CardHorasFeita";
import HeaderEncautech from "../HeaderEncautech";
import FooterEncautech from "../FooterEncautech";
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';

import axios from "axios";

// Componente funcional que renderiza o alerta
const AlertMessage = ({ open, severity, content, handleClose }) => (
    <Collapse in={open}>
        <Alert severity={severity} onClose={handleClose}>
            {content}
        </Alert>
    </Collapse>
);

function Presenca() {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [error, setError] = useState(null);
    const [userData, setUserData] = useState([]);
    const [loguserData, setLogUserData] = useState([]);
    const [userankData, setUserankData] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [alertSeverity, setAlertSeverity] = useState('success'); // Padrão: sucesso
    const [alertContent, setAlertContent] = useState('');

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
            setAlertContent("Problemas ao definir a Geolocalização nesse navegador");
            setAlertSeverity('error');
            setAlertOpen(true);
          }
        };
        getLocation();
        fetchData();
        fetchAttData();
    }, [userData, loguserData]);

    const fetchData = async () => {
        try {
            const response = await axios.get('https://meteoro.encautech.com:8081/membros-presentes');
            setUserData(response.data);
        } catch (error) {
            setAlertContent("Problemas ao buscar os membros presentes na API");
            setAlertSeverity('error');
            setAlertOpen(true);
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const fetchAttData = async () => {
        try {
            const response = await axios.get('https://meteoro.encautech.com:8081/ranking-membros');
            setUserankData(response.data);
        } catch (error) {
            setAlertContent("Problemas ao buscar os membros na API");
            setAlertSeverity('error');
            setAlertOpen(true);
            console.error('Erro ao buscar dados da API:', error);
        }
    };

    const handleCloseAlert = () => {
        setAlertOpen(false);
    };

    const addUserData = (email, senha) => {
        if(latitude === -21.533 && longitude === -42.635){
        axios.post('https://meteoro.encautech.com:8081/marcar-presenca', { email, senha })
            .then(res => {
                const newUser = res.data; // ou qualquer outra resposta da sua API que contenha os dados do usuário que entrou
                // Verifica se a resposta do servidor é "Informações incorretas"
                if (res.data === "Informações incorretas") {
                    setAlertContent("As informações fornecidas estão incorretas. Este usuário já está logado");
                    setAlertSeverity('error');
                    setAlertOpen(true);
                } else {
                    setAlertOpen(true);
                    setAlertContent("Login com sucesso");
                    setAlertSeverity('success');
                    setLogUserData(newUser);
                }
            })
            .catch(err => console.log(err));
        }else{
            setAlertContent("É necessario estar presente na sede para realizar o login");
            setAlertSeverity('error');
            setAlertOpen(true);
        }

    };

    const subUserData = (Id) => {
        if(latitude === -21.533 && longitude === -42.635){
        axios.post('https://meteoro.encautech.com:8081/marcar-saida', { Id }).then(res => {
            setUserData(userData.filter(user => user.Id !== Id));
        })
            .catch(err => console.log(err));
        }else{
          alert('É necessario estar na sede')
        }
    };

    return (
        <Container fluid className='mx-0 px-0'>
            <Row className=' mx-0 px-0'>
                <Col className=' mx-0 px-0' md="auto">
                    <Sidebar />
                </Col>

                <Col>
                    <HeaderEncautech />
                    <AlertMessage
                        open={alertOpen}
                        severity={alertSeverity}
                        content={alertContent}
                        handleClose={handleCloseAlert}
                    />

                    <Row className='mx-0 px-0' >

                        <Col className='d-flex justify-content-center align-items-start'>
                            <div className="card-bg rounded-3 w-100 border d-flex flex-column">
                                <div className="p-4 d-flex flex-column h-100">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="m-0 h5 font-weight-bold text-dark">Abra seu ponto</h4>
                                        <div className="py-1 px-2 bg-grey rounded-circle"><i className="fas fa-suitcase"></i></div>
                                    </div>
                                    <FormLogin addUserData={addUserData} />
                                </div>
                            </div>
                        </Col>

                        <Col className='d-flex justify-content-center align-items-start '>
                            <div className="overflow-scroll card-bg rounded-3 w-100 border d-flex flex-column" style={{ height: '86vh' }}>
                                <div className="p-4 d-flex flex-column h-100">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="m-0 h5 font-weight-bold text-dark">Pontos abertos</h4>
                                        <div className="py-1 px-2 bg-grey rounded-circle"><i className="fas fa-suitcase"></i></div>
                                    </div>
                                    <CardPresenca userData={userData} subUserData={subUserData} />
                                </div>
                            </div>
                        </Col>

                        <Col className='d-flex justify-content-center align-items-start '>
                            <div className="overflow-scroll card-bg rounded-3 w-100 border d-flex flex-column" style={{ height: '86vh' }}>
                                <div className="p-4 d-flex flex-column h-100">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h6 className="m-0 h5 font-weight-bold text-dark">Ranking de horas </h6>
                                        <div className=" rounded-circle bg-grey py-1 px-2"><i className="fas fa-user"></i></div>
                                    </div>
                                </div>
                                <CardHorasFeitas userankData={userankData} />
                            </div>
                        </Col>
                    </Row>

                </Col>

            </Row>
        </Container>
    );
}

export default Presenca;

