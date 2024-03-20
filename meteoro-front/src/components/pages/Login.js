import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Formlogin from '../FormLogin';

function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const navigate = useNavigate()

    function handelSubmit(event){
        event.preventDefault();
        axios.post('http://localhost:8081/login', {email, senha})
        .then(res => {
            console.log(res);
            if (res.data.isAdmin) {
                navigate('admin');
            } else {
                navigate('membro');
            }
        })
        .catch(err => console.log(err));
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center'>
            <div className='p-3 w-25'>
                <Formlogin/>
            </div>
        </div>

    )
}

export default Login;