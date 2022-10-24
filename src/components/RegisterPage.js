import styled from 'styled-components' 
import logo from '../assets/img/logo.png'
import { useNavigate } from "react-router-dom";
import { useState, useContext } from 'react';
import axios from 'axios';
import {ThreeDots} from 'react-loader-spinner'
import MyContext from '../contexts/myContext'


export default function RegisterPage(){
    const [message,setMessage] = useState('')
    const [isShure,setIsShure] = useState(false)
    const [disabled,setDisabled] = useState(false)
    const { setUserData} = useContext(MyContext)
    const [form, setForm] = useState({
        email: "",
        name: "",
        image: "",
        password: ""
      });
    const navigate = useNavigate();

    const getUser = localStorage.getItem("user") 
    if(getUser!==null){
        setUserData(JSON.parse(getUser))
        navigate('/hoje')
    }
    function PostRegister(event){
        setDisabled(true)
        event.preventDefault();
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up`
        const body = {...form}
        const request = axios.post(URL, body);
        request.then(answer => {
            navigate('/')
		});
        request.catch(erro => {
            setDisabled(false)
            if(erro.response.data.details){
                if (erro.response.data.details[0]==='"email" must be a valid email'){
                    setIsShure(true)
                    setMessage('Email invalido')
                }else{
                    setIsShure(true)
                    setMessage(erro.response.data.details[0])
                }
            }else{
                setIsShure(true)
                setMessage(erro.response.data.message)
            }
		});
    }
    function handleForm (e) {
        setForm({
          ...form,
          [e.target.name]: e.target.value,
        })
      }
    function goToLogin(){
        navigate('/')
    }
    return(
        <Container>
            <img src={logo} alt = 'logo'/>
            <form onSubmit={PostRegister}>
                <input placeholder='email' name='email' type='email' required value={form.email} onChange={handleForm} disabled={disabled}/>
                <input placeholder='senha' type='password' name='password' required value={form.password} onChange={handleForm} disabled={disabled}/>
                <input placeholder='nome' type='text' name='name'  required value={form.name} onChange={handleForm} disabled={disabled}/>
                <input placeholder='foto' type='url' name='image' required value={form.image} onChange={handleForm} disabled={disabled}/>
                <button type="submit" disabled={disabled}>{disabled
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
                 
                :<p>Cadastrar</p>
                }</button>
		    </form>
                <h1 onClick={goToLogin} >Já tem uma conta? Faça login!</h1>
            {isShure&&<Shure onClick={()=>setIsShure(false)}>
                <ShureDiv onClick={(e) => e.stopPropagation()}>
                    <h3>{message}</h3>
                    <div>
                        <No onClick={()=>setIsShure(false)}>OK</No>
                    </div>
                </ShureDiv>
            </Shure>}
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

const Shure = styled.div`
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    z-index: 7;
    left: 0;
    top: 0;
`
const ShureDiv = styled.div`
    height: 200px;
    width: 300px;
    background-color: white;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 38px;
    justify-content: space-between;
    h3{
        color: #126BA5;
        font-weight: 500;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 25px;
        text-align: center;
    }
    div{
        width: 60%;
        display: flex;
        justify-content: space-around;
    }
`


const No = styled.button`
    height: 40px;
    width: 90px;
    border: 0px;
    font-weight: 500;
    font-size: 18px;
    color: white;
    background-color: #52B6FF;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
`