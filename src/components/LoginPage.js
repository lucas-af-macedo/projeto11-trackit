import styled from 'styled-components' 
import logo from '../assets/img/logo.png'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import React, { useContext } from 'react'
import MyContext from '../contexts/myContext'

export default function LoginPage(){
    const { setUserData} = useContext(MyContext)
    const [disabled,setDisabled] = useState(false)
    function PostLogin(event){
        setDisabled(true)
        event.preventDefault();
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login`
        const body = {...form}
        const request = axios.post(URL, body);
        request.then(answer => {
            setUserData(answer.data)
            navigate('/hoje')
		});
        request.catch(erro => {
            setDisabled(false)
            if(erro.response.data.details){
                if (erro.response.data.details[0]==='"email" must be a valid email'){
                    alert('Email invalido')
                }else{
                    alert(erro.response.data.details[0])
                }
            }else{
                alert(erro.response.data.message)
            }
		});
    }
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    function handleForm (e) {
        setForm({
        ...form,
        [e.target.name]: e.target.value,
        }) 
    }
    const navigate = useNavigate();
    function goToRegister(){
        navigate('/cadastro')
    }
    return(
        <Container>
            <img src={logo} alt = 'logo'/>
            <form onSubmit={PostLogin}>
                <input placeholder='email' type='email' name='email' required value={form.email} onChange={handleForm} disabled={disabled}/>
                <input placeholder='senha' type='password' name='password' required value={form.password} onChange={handleForm} disabled={disabled}/>
                <button data-identifier="reservation-btn" type="submit" disabled={disabled}>{disabled
                ?<ThreeDots 
                    height="17" 
                    width="290" 
                    radius="9"
                    color="white" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                 />
                 :<p>Entrar</p>}</button>
		    </form>
                <h1 onClick={goToRegister} >Não tem uma conta? Cadastre-se!</h1>
        </Container>
    )
}

const Container = styled.div`
    width: 303px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: white;
    img{
        width: 180px;
        margin-top: 68px;
    }
    button{
        width: 303px;
        height: 45px;
        background: #52B6FF;
        border-radius: 4px;
        border: 0px;
        color: white;
        margin-top: 6px;
        font-size: 21px;
        font-family: 'Lexend Deca', sans-serif;
        cursor: pointer;
    }
    input{
        margin-top: 6px;
        width: 303px;
        height: 45px;
        border-radius: 4px;
        border: 0px;
        border: 1px solid #D5D5D5;
        padding: 13px;
        font-size: 20px;
        outline: 0px;
        font-family: 'Lexend Deca', sans-serif;
    }
    input::placeholder{
        color: #DBDBDB;
        font-size: 20px;
        font-family: 'Lexend Deca', sans-serif;
    }
    h1{
        font-family: 'Lexend Deca', sans-serif;
        color: #52B6FF;
        font-size: 14px;
        text-decoration: underline;
        margin-top: 25px;
        cursor: pointer;
    }
    h1:hover{
        filter: brightness(1.2);
    }
    button:hover{
        transition: ease 0.1s;
        filter: brightness(1.1);
    }
`