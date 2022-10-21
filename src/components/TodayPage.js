import React, { useContext, useState, useEffect } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import dayjs from 'dayjs'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import HabitContainer from './HabitContainer'

export default function TodayPage(){
    const navigate = useNavigate()
    const {userData, today, setToday} = useContext(MyContext)
    const [listHabits,setListHabits] = useState([])
    const now = dayjs()
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today'
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const request = axios.get(URL, config)
        request.then(answer => {
            setListHabits(answer.data)
            setToday((answer.data.filter((f)=>f.done).length/answer.data.length)*100)
        })
        request.catch(error => {
            navigate('/')
        })
    },[setListHabits, navigate]);

    function getDay(){
        let weekDay = ''
        switch(now.day()){
            case 0:
                weekDay='Domingo'
                break
            case 1:
                weekDay="Segunda"
                break
            case 2:
                weekDay="Terça"
                break
            case 3:
                weekDay="Quarta"
                break
            case 4:
                weekDay="Quinta"
                break
            case 5:
                weekDay="Sexta"
                break
            case 6:
                weekDay="Sabado"
                break
            default:
                break
        }
        return(weekDay+', '+now.format('DD/MM'))
    }
    return(
        <>
        <Container today={today}>
            <h1>{getDay()}</h1>
            {today? <h2>{Math.round(today)}% dos hábitos concluídos</h2>:<h2>Nenhum hábito concluído ainda</h2>}
            {listHabits.map((f,index) => (
                <HabitContainer key={f.id} f={f} index={index} listHabits={listHabits} setListHabits={setListHabits}/>
            ))}
        </Container>
        </>
    )
}

const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    height: 100%;
    background: #EBEBEB;
    padding: 18px;
    padding-top: 90px;
    padding-bottom: 115px;
    h1{
        font-family: 'Lexend Deca', sans-serif;
        color: #126BA5;
        font-size: 23px;
        font-weight: 400;
    }
    h2{
        margin-top: 4px;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: ${props=>props.today? '#8FC549':'#BABABA'};
        margin-bottom: 25px;
    }
`