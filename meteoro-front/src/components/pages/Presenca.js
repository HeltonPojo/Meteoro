import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../Sidebar";
import FormLogin from "../FormLogin";
import CardPresenca from "../CardPresenca";
import HeaderEncautech from "../HeaderEncautech";


function Presenca() {
    return (
        
        <Container fluid className='mx-0 px-0'>
            <Row >
                <Col md="auto">
                    <Sidebar />
                </Col>

                <Col>
                    <HeaderEncautech/>

                    <Row >
                        <Col className='d-flex justify-content-center align-items-center'>
                            <FormLogin />
                        </Col>

                        <Col className='d-flex justify-content-center'>
                            <CardPresenca />
                        </Col>

                        <Col className='d-flex justify-content-center'>
                            <h1>Horas ja feita</h1>
                        </Col>
                    </Row>
                 
                </Col>

            </Row>
        </Container>
    );
}

export default Presenca;

