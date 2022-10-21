import styled from "styled-components"
import HabitsWeek from "./HabitsWeek"
import trash from '../assets/img/trash2.png'
import axios from "axios"
import React, { useContext, useState, useEffect } from 'react'
import MyContext from '../contexts/myContext'
import { useNavigate } from "react-router-dom";

export default function Habits({f, weekList}){
    const [isShure,setIsShure] = useState(false)
    const navigate = useNavigate()
    const {userData} = useContext(MyContext)
    function removeHabit(){
        setIsShure(false)
        const URL = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${f.id}`
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const request = axios.delete(URL, config)
        request.then(answer => {
            console.log(answer.data)
        })
        request.catch(error => {
            navigate('/')
        })
    }
    return(
        <>
        <Container>
            <h3>{f.name}</h3>
            <HabitBox>
            {weekList.map((day,index)=><HabitsWeek days={f.days} day={day} index={index}/>)}
            </HabitBox>
            <img src={trash} onClick={()=>setIsShure(true)} alt='remove'/>
        </Container>
        {isShure&&<Shure onClick={()=>setIsShure(false)}>
            <ShureDiv onClick={(e) => e.stopPropagation()}>
                <h3>Tem Certeza</h3>
                <div>
                    <Yes onClick={removeHabit}>Sim</Yes>
                    <No onClick={()=>setIsShure(false)}>Não</No>
                </div>
            </ShureDiv>
        </Shure>}
        </>
    )
}
const Container = styled.div`
    width: 100%;
    height: 91px;
    background-color: white;
    border-radius: 5px;
    margin-top: 10px;
    padding: 15px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    z-index: 1;
    h3{
        font-family: 'Lexend Deca', sans-serif;
        font-size: 20px;
    }
    img{
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }
`
const HabitBox = styled.div`
    display: flex;
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
    background-color: #126BA5;
    border-radius: 5px;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 38px;
    justify-content: space-between;
    h3{
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 30px;
    }
    div{
        width: 100%;
        display: flex;
        justify-content: space-around;
    }
`
const Yes = styled.button`
    height: 40px;
    width: 90px;
    border: 0px;
    color: white;
    background-color: red;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;

`

const No = styled.button`
    height: 40px;
    width: 90px;
    border: 0px;
    color: blue;
    background-color: white;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
`