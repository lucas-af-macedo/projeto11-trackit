import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import GlobalStyle from '../assets/css/GlobalStyle'
import styled from 'styled-components' 
import LoginPage from './LoginPage'
import RegisterPage from './RegisterPage'
import MyContext from '../contexts/myContext'
import NavBar from './NavBar'
import HabitsPage from './HabitsPage'
import TodayPage from './TodayPage'
import HistoryPage from './HistoryPage'

export default function App(){
    const [userData,setUserData] = React.useState('')
    const [today,setToday] = React.useState(0)
    return (
        <MyContext.Provider value = {{userData, setUserData, today, setToday}}>
            <BrowserRouter>
                <GlobalStyle/>
                <Body>
                    <NavBar/>
                    <Routes>
                        <Route path='/' element = {<LoginPage/>} />
                        <Route path='/cadastro' element = {<RegisterPage/>} />
                        <Route path="/hoje" element = {<TodayPage/>}/>
                        <Route path="/habitos" element = {<HabitsPage/>}/>
                        <Route path="/historico" element = {<HistoryPage/>}/>
                    </Routes>
                </Body>
            </BrowserRouter>
        </MyContext.Provider>
    )
}

const Body = styled.div`
    width: 100vw;
    min-height: 100vh;
    height: 100%;
    display: flex;
    justify-content: center;
`