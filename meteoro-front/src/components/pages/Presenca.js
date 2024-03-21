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


import {
    CDBBtn,
    CDBProgress,
    CDBTable,
    CDBTableHeader,
    CDBTableBody,
    CDBContainer,
    CDBLink
} from "cdbreact";


function Presenca() {
    return (

        <Container fluid className='mx-0 px-0'>
            <Row className=' mx-0 px-0'>
                <Col className=' mx-0 px-0' md="auto">
                    <Sidebar />
                </Col>

                <Col>
                    <HeaderEncautech />

                    <Row className='mx-0 px-0' >
                        <Col className='d-flex justify-content-center align-items-center'>
                            <div className="card-bg rounded-3 w-100 border d-flex flex-column">
                                <div className="p-4 d-flex flex-column h-100">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="m-0 h5 font-weight-bold text-dark">Abra seu ponto</h4>
                                        <div className="py-1 px-2 bg-grey rounded-circle"><i className="fas fa-suitcase"></i></div>
                                    </div>
                                    <FormLogin />
                                </div>
                            </div>
                        </Col>

                        <Col className='d-flex justify-content-center '>
                            <div className="card-bg rounded-3 w-100 border d-flex flex-column">
                                <div className="p-4 d-flex flex-column h-100">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h4 className="m-0 h5 font-weight-bold text-dark">Pontos abertos</h4>
                                        <div className="py-1 px-2 bg-grey rounded-circle"><i className="fas fa-suitcase"></i></div>
                                    </div>
                                    <CardPresenca />
                                </div>
                            </div>
                        </Col>

                        <Col>

                            <div className="card-bg rounded-3 w-100 border d-flex flex-column p-4" style={{ gridRow: "span 2" }}>
                                <div className="d-flex">
                                    <h6 className="h5 font-weight-bold text-dark">Ranking de horas </h6>
                                    <div className="ml-auto rounded-circle bg-grey py-1 px-2"><i className="fas fa-user"></i></div>
                                </div>

                                <CardHorasFeitas />


                            </div>
                        </Col>
                    </Row>
                    
                </Col>

            </Row>
        </Container>
    );
}

export default Presenca;

