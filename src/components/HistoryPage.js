import React, { useContext, useState } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';


export default function HistoryPage(){
    const navigate = useNavigate()
    const [dayList,setDayList] = useState([])
    const [done,setDone] = useState([])
    const [notDone,setNotDone] = useState([])
    useEffect(() => {
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily'
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const request = axios.get(URL, config)
        request.then(answer => {
            const listHabits = answer.data
            setDayList(listHabits)
            let arrayDone = []
            let arrayNotDone = []
            for(let i=0;i<listHabits.length;i++){
                let listTest = listHabits[i].habits.filter((f)=>!f.done)
                if(listTest.length>0){
                    arrayNotDone.push(listHabits[i].day)
                }else{
                    arrayDone.push(listHabits[i].day)
                }
            }
            setDone(arrayDone)
            setNotDone(arrayNotDone)
        })
        request.catch(error => {
            navigate('/')
        })
    },[setDayList, navigate]);
    let locale = 'pt'
    const [value, onChange] = useState(new Date());
    const {userData} = useContext(MyContext)
    function test (e){
        onChange(e)
        console.log(dayList)
        console.log(value.getUTCDate())
    }
    return(
        <>
        <Container>
            <CalendarDiv>
                <Calendar calendarType='US' locale='pt' onChange={test} value={value} 
                formatDay ={(locale, value) => dayjs(value).format('DD')}
                tileClassName={({ date, view }) => {
                    if(done.find(x=>x===dayjs(date).format("DD/MM/YYYY"))){
                     return  'oi'
                    }
                    if(notDone.find(x=>x===dayjs(date).format("DD/MM/YYYY"))){
                        return  'oi2'
                       }
                  }}/>
            </CalendarDiv>
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
    padding-bottom: 120px;
    display: flex;
    justify-content: center;
    h1{
        font-family: 'Lexend Deca', sans-serif;
        color: #126BA5;
        font-size: 23px;
        font-weight: 400;
    }
    h2{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 18px;
        color: #666666;;
        margin-bottom: 25px;
    }
`
const CalendarDiv = styled.div`
    border-radius: 10px;
    .react-calendar {
        border-radius: 10px;
        width: 350px;
        max-width: 100%;
        background: white;
        border: 0px;
        font-family: Arial, Helvetica, sans-serif;
        line-height: 1.125em;
    }
    .react-calendar--doubleView {
        
    }
    .react-calendar--doubleView .react-calendar__viewContainer {
        display: flex;
        margin: -0.5em;
    }
    .react-calendar--doubleView .react-calendar__viewContainer > * {
        width: 50%;
        margin: 0.5em;
    }
    .react-calendar,
    .react-calendar *,
    .react-calendar *:before,
    .react-calendar *:after {
        -moz-box-sizing: border-box;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .react-calendar button {
        margin: 0;
        border: 0;
        outline: none;
    }
    .react-calendar button:enabled:hover {
        cursor: pointer;
    }
    .react-calendar__navigation {
        display: flex;
        height: 44px;
        margin-bottom: 1em;
    }
    .react-calendar__navigation button {
        min-width: 44px;
        background: none;
    }
    .react-calendar__navigation button:disabled {
        background-color: #f0f0f0;
    }
    .react-calendar__navigation button:enabled:hover,
    .react-calendar__navigation button:enabled:focus {
        background-color: #e6e6e6;
    }
    .react-calendar__month-view__weekdays {
        text-align: center;
        text-transform: uppercase;
        font-weight: bold;
        font-size: 0.75em;
    }
    .react-calendar__month-view__weekdays__weekday {
    padding: 0.5em;
    }
    .react-calendar__month-view__weekNumbers .react-calendar__tile {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75em;
    font-weight: bold;
    }
    .react-calendar__month-view__days__day--weekend {
    color: #d10000;
    }
    
    /*.react-calendar__month-view__days__day--weekend abbr{
    padding: 10px;
    background-color: green;
    border-radius: 20PX;
    color: white;
    }
    
    .react-calendar__month-view__days__day--neighboringMonth abbr {
        background-color: transparent;
        color: #757575
    }*/
    .react-calendar__month-view__days__day--neighboringMonth {
    color: #757575;
    }
    .react-calendar__year-view .react-calendar__tile,
    .react-calendar__decade-view .react-calendar__tile,
    .react-calendar__century-view .react-calendar__tile {
    padding: 2em 0.5em;
    }
    .react-calendar__tile {
    max-width: 100%;
    height: 50px;
    padding: 10px 6.6667px;
    background: none;
    text-align: center;
    line-height: 16px;
    }
    .react-calendar__tile:disabled {
    background-color: #f0f0f0;
    }
    .react-calendar__tile:enabled:hover,
    .react-calendar__tile:enabled:focus {
    background-color: #e6e6e6;
    }
    .react-calendar__tile--now {
    background: #ffff76;
    }
    .react-calendar__tile--now:enabled:hover,
    .react-calendar__tile--now:enabled:focus {
    background: #ffffa9;
    }
    .react-calendar__tile--hasActive {
    background: #76baff;
    }
    .react-calendar__tile--hasActive:enabled:hover,
    .react-calendar__tile--hasActive:enabled:focus {
    background: #a9d4ff;
    }
    .react-calendar__tile--active {
    background: #006edc;
    color: white;
    }
    .react-calendar__tile--active:enabled:hover,
    .react-calendar__tile--active:enabled:focus {
    background: #1087ff;
    }
    .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #e6e6e6;
    }
    
    .oi abbr{
        padding: 10px;
        background-color: #8cc654;
        border-radius: 20PX;
        color: white;
    }
    .oi2 abbr{
        padding: 10px;
        color: white;
        background-color: #ea5766;
        border-radius: 20PX;
    }
`
