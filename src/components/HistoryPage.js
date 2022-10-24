import React, { useContext, useState } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import Calendar from 'react-calendar';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';



export default function HistoryPage(){
    const {userData} = useContext(MyContext)
    const [value, onChange] = useState(new Date());
    const [dayList,setDayList] = useState([])
    const [done,setDone] = useState([])
    const [notDone,setNotDone] = useState([])
    const [habitsInADay,setHabitsInADay] = useState([])
    
    const navigate = useNavigate()
    let locale = 'pt'

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

    
    function test (e){
        onChange(e)
        let indexDate = dayList.findIndex((f)=>f.day===dayjs(e).format("DD/MM/YYYY"))
        if(indexDate!==-1){
            console.log(dayList[indexDate])
            setHabitsInADay(dayList[indexDate].habits)
        }else{
            setHabitsInADay([])
        }
    }

    return(
        <>
        <Container>
            <CalendarDiv>
                <Calendar calendarType='US' locale='pt' onChange={test} value={value} 
                formatDay ={(locale, value) => dayjs(value).format('DD')}
                tileClassName={({ date, view }) => {
                    if(done.find(x=>x===dayjs(date).format("DD/MM/YYYY"))){
                     return  'done'
                    }
                    if(notDone.find(x=>x===dayjs(date).format("DD/MM/YYYY"))){
                        return  'not-done'
                       }
                  }}/>
            </CalendarDiv>
            {habitsInADay.length?<InfoDay>
                    <HabitsDoneTitle>Dia {dayjs(value).format("DD/MM")}</HabitsDoneTitle>
                        {habitsInADay.map((f)=>
                            <HabitsPast done={f.done}>{f.done?
                                <ion-icon name="checkmark-circle"></ion-icon>
                                :<ion-icon name="close-circle"></ion-icon>}
                                <h3>{f.name}</h3>
                            </HabitsPast>)}
                    <Describe>
                        <DescribeDone>
                            <ion-icon name="checkmark-circle"></ion-icon>
                            <h3>Concluído</h3>
                        </DescribeDone>
                        <DescribeNotDone>
                            <ion-icon name="close-circle"></ion-icon>
                            <h3>Não Concluído</h3>
                        </DescribeNotDone>
                    </Describe>
                </InfoDay>:null}
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
    flex-direction: column;
    align-items: center;
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
        border: 0px;
    }
    .react-calendar__tile {
    height: 50px;
    }
    
    .done abbr{
        padding: 10px;
        background-color: #8cc654;
        border-radius: 20PX;
        color: white;
    }
    .not-done abbr{
        padding: 10px;
        color: white;
        background-color: #ea5766;
        border-radius: 20PX;
    }
`
const InfoDay = styled.div`
    width: 350px;
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
    padding: 20px;
`
const HabitsDoneTitle = styled.h3`
    font-family: 'Lexend Deca', sans-serif;
    color: #126BA5;
    font-size: 23px;
    font-weight: 400;
    margin-bottom: 20px;
`
const HabitsPast = styled.div`
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    margin-bottom: 10px;
    color: ${props=>props.done?'#8cc654':'#ea5766'};
    display: flex;
    align-items: center;
    ion-icon{
        margin-right: 5px;
        width: 24px;
        height: 24px;
    }
`
const Describe = styled.div`
    margin-top: 15px;
    width: 100%;
    display: flex;

    justify-content: space-evenly;
    background-color: #EFEFEF;
    border-radius: 5px;
    div{
        display: flex;
        align-items: center;
    }
    h3{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 15px;
    }
`
const DescribeDone = styled.div`
    display: flex;
    align-items: center;
    ion-icon{
        color: #8cc654;
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
`
const DescribeNotDone = styled.div`
    display: flex;
    align-items: center;
    ion-icon{
        color: #ea5766;
        width: 24px;
        height: 24px;
        margin-right: 5px;
    }
`
