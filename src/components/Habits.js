import styled from "styled-components"
import HabitsWeek from "./HabitsWeek"
import trash from '../assets/img/trash2.png'
import axios from "axios"
import React, { useContext, useState } from 'react'
import MyContext from '../contexts/myContext'
import { useNavigate } from "react-router-dom";

export default function Habits({f, response,weekList}){
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
            response()
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
            {weekList.map((day,index)=><HabitsWeek key={index} days={f.days} day={day} index={index}/>)}
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
        font-size: 33px;
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
    font-weight: 500;
    font-size: 18px;
    color: white;
    background-color: #CF0000;
    border-radius: 5px;
    font-family: 'Lexend Deca', sans-serif;
    cursor: pointer;
    &:hover{
        transition: ease 0.1s;
        filter: brightness(1.1);
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
    &:hover{
        transition: ease 0.1s;
        filter: brightness(1.1);
    }
`