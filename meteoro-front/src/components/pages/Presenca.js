import React, { useState, useEffect } from "react";
import { Layout } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from "axios";
import Sidebar from "../Sidebar";
import FormLogin from "../FormLogin";


const { Header, Sider } = Layout;

function Presenca() {
    const [userData, setUserData] = useState([]);
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    useEffect(() => {
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
    function handelSubmit(event) {
        event.preventDefault();
        axios.post('http://localhost:8081/marcar-presenca', { email, senha })
            .then(res => {
                console.log(res);
                location.reload();
            })
            .catch(err => console.log(err));
    }

    function handleSair(event) {
        event.preventDefault();
        const Id = event.currentTarget.dataset.userId;
        axios.post('http://localhost:8081/marcar-saida', {Id}).then(res => {
            console.log(res);
            location.reload();
        })
        .catch(err => console.log(err));
    }

    if(userData.length >0 ){
    return (
        <Layout>
            <Sider>
                <div className='d-flex justify-content-center align-items-center'>

                    <form onSubmit={handelSubmit}>
                        <div className='mb-3'>
                            <label htmlFor="email">Email</label>
                            <input type="email" placeholder='Email' className='form-control' onChange={e => setEmail(e.target.value)}></input>
                        </div>
                        <div className='mb-3'>
                            <label htmlFor="senha">Senha</label>
                            <input type="password" placeholder='Senha' className='form-control' onChange={e => setSenha(e.target.value)}></input>
                        </div>
                        <button className='btn btn-success'>Entrar</button>
                    </form>

                </div>
            </Sider>
            <div>
                <h1>Informações do Usuário</h1>
                {userData.map((user) => (
                    <div key={user.Id}>
                        <h4>{user.Id}</h4>
                        <h4>{user.Email}</h4>
                        <h4>{user.Cargo}</h4>
                        <h4>{user.horas}</h4>
                        <h4>{user.Entrada}</h4>
                        <button onClick={handleSair} data-user-id={user.Id}> Sair </button>
                    </div> 
                ))}
            </div>
        </Layout>
    );}else{
        return (
            <>
                
                <Row>
                    <Sidebar/>

                    <Col className='d-flex justify-content-center align-items-center'>
                        <FormLogin/>
                    </Col>

                    <Col>
                        <div>
                            <h1>Informações do Usuário</h1>
                            {userData.map((user) => (
                                <div key={user.Id}>
                                    <h4>{user.Id}</h4>
                                    <h4>{user.Email}</h4>
                                    <h4>{user.Cargo}</h4>
                                    <h4>{user.horas}</h4>
                                    <h4>{user.Entrada}</h4>
                                    <button onClick={handleSair} data-user-id={user.Id}> Sair </button>
                                </div> 
                            ))}
                        </div>
                    </Col>

                    <Col>
                    <h1>Horas ja feita</h1>
                    </Col>
                </Row>

            </>
        );
    }
}

export default Presenca;
