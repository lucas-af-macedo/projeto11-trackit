import React, { useContext, useState } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import check from '../assets/img/check.png'
import axios from 'axios'

export default function HabitContainer({f,index, listHabits, setListHabits}){
    const {userData,  setToday} = useContext(MyContext)
    const [disa,setDisa] = useState(false)
    function reflash(){
        setDisa(false)
    }

    function done(){
        setDisa(true)
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        if(listHabits[index].done){
            let aux = [...listHabits]
            aux[index].done=false
            if(aux[index].highestSequence===aux[index].currentSequence)
                aux[index].highestSequence=aux[index].highestSequence-1
            aux[index].currentSequence=aux[index].currentSequence-1
            setToday((aux.filter((f)=>f.done).length/aux.length)*100)
            setListHabits(aux)
            let URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${listHabits[index].id}/uncheck`
            let request = axios.post(URL,'',config)
            request.then(answer => {
                reflash()
            })
            request.catch(error => {
                reflash()
            })

        }else{
            let aux = [...listHabits]
            aux[index].done=true
            if(aux[index].highestSequence===aux[index].currentSequence)
                aux[index].highestSequence=aux[index].highestSequence+1
            aux[index].currentSequence=aux[index].currentSequence+1
            setToday((aux.filter((f)=>f.done).length/aux.length)*100)
            setListHabits(aux)
            let URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${listHabits[index].id}/check`
            let request = axios.post(URL,'',config)
            request.then(answer => {
                reflash()
            })
            request.catch(error => {
                reflash()
            })
        }
    }
    return(
        <Habit key={f.id}>
            <HabitBox>
                <h3>{f.name}</h3>
                <RecordBox>
                    <h4>Sequência atual: {f.currentSequence} dias</h4>
                    <h4>Seu recorde: {f.highestSequence} dias</h4>
                </RecordBox>
            </HabitBox>
            <CheckBox  onClick={done} done={f.done} disabled={disa}>
                <img src={check} alt='check'/>
            </CheckBox>
        </Habit>
    )
}

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
const CheckBox = styled.button`
    width: 70px;
    height: 70px;
    background-color: ${props=>props.done?'#8FC549':'#EBEBEB'};
    border:  ${props=>props.done?'0px':'1px solid #E7E7E7'};
    border-radius: 5px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
`