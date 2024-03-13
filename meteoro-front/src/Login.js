import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    function handelSubmit(event){
        event.preventDefault();
    }

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
            <div className='p-3 bg-white w-25'>
                <form onSubmit={handelSubmit}>
                    <div className='mb-3'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='Email' className='form-control' onChange={e => setEmail(e.target.value)}></input>
                    </div>
                    <div className='mb-3'>
                    <label htmlFor="senha">Senha</label>
                        <input type="senha" placeholder='Senha' className='form-control' onChange={e => setSenha(e.target.value)}></input>
                    </div>
                    <button className='btn btn-success'>Entrar</button>
                </form>
            </div>

        </div>

    )
}

export default Login;