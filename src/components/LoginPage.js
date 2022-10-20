import styled from 'styled-components' 
import logo from '../assets/img/logo.png'
import { useNavigate } from "react-router-dom";
import { useState } from 'react';

export default function LoginPage(){
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
            <form >
                <input placeholder='email' type='email' name='email' required value={form.email} onChange={handleForm}/>
                <input placeholder='senha' type='password' name='password' required value={form.password} onChange={handleForm}/>
                <button data-identifier="reservation-btn" type="submit">Entrar</button>
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