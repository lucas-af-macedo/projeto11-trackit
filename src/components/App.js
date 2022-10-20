import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GlobalStyle from '../assets/css/GlobalStyle'
import styled from 'styled-components' 
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import MyContext from '../contexts/myContext'
import NavBar from './NavBar'
import HabitsPage from './HabitsPage'

export default function App(){
    const [userData,setUserData] = React.useState('')
    const [today,setToday] = React.useState("")
    return (
        <MyContext.Provider value = {{userData, setUserData, today, setToday}}>
            <BrowserRouter>
                <GlobalStyle/>
                <Body>
                    <NavBar/>
                    <Routes>
                        <Route path='/' element = {<LoginPage/>} />
                        <Route path='/cadastro' element = {<RegisterPage/>} />
                        <Route path="/habitos" element = {<HabitsPage/>}/>
                    </Routes>
                </Body>
            </BrowserRouter>
        </MyContext.Provider>
    )
}

const Body = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
`