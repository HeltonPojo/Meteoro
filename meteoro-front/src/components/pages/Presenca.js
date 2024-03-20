import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from "../Sidebar";
import FormLogin from "../FormLogin";
import CardPresenca from "../CardPresenca";


function Presenca() {
    return (
        <>
            <Row>
                <Sidebar />

                <Col className='d-flex justify-content-center align-items-center'>
                    <FormLogin />
                </Col>

                <Col>
                    <CardPresenca />
                </Col>

                <Col>
                    <h1>Horas ja feita</h1>
                </Col>
            </Row>

        </>
    );
}

export default Presenca;

