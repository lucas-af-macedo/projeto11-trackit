import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GlobalStyle from '../assets/css/GlobalStyle'
import styled from 'styled-components' 
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'

export default function App(){
    return (
        <BrowserRouter>
            <GlobalStyle/>
            <Body>
            <Routes>
                <Route path='/' element = {<LoginPage/>} />
                <Route path='/cadastro' element = {<RegisterPage/>} />
            </Routes>
            </Body>
        </BrowserRouter>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`