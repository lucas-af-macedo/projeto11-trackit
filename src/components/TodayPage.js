import React, { useContext } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import dayjs from 'dayjs'

export default function TodayPage(){
    const {userData, today, setToday} = useContext(MyContext)
    console.log(userData)
    const now = dayjs()
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
        console.log(weekDay)
        return(weekDay+', '+now.format('DD/MM'))
    }
    return(
        <>
        <Container today={today}>
            <h1>{getDay()}</h1>
            {today? <h2>{today}% dos hábitos concluídos</h2>:<h2>Nenhum hábito concluído ainda</h2>}
            <Habit>
                <HabitBox>
                    <h3>Fazer algo</h3>
                    <RecordBox>
                        <h4>Sequência atual: 3 dias</h4>
                        <h4>Seu recorde: 5 dias</h4>
                    </RecordBox>
                </HabitBox>
                <CheckBox></CheckBox>
            </Habit>
        </Container>
        </>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #EBEBEB;
    padding: 18px;
    padding-top: 90px;
    padding-bottom: 120px;
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
const Habit = styled.div`
    margin-top: 10px;
    height: 94px;
    width: 100%;
    background-color: white;
    border-radius: 5px;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    h3{
        color: #666666;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
    }
    h4{
        color: #666666;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 13px;
    }
`
const HabitBox = styled.div`
    height: 70px;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
`
const RecordBox = styled.div`
    margin: 0px;
`
const CheckBox = styled.div`
    width: 70px;
    height: 70px;
    background-color: #EBEBEB;
    border: 1px solid #E7E7E7;
    border-radius: 5px;
    cursor: pointer;
`