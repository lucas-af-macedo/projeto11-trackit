import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import React, { useContext, useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import Week from './Week';
import Habits from './Habits';
import {ThreeDots} from 'react-loader-spinner'

export default function HabitsPage(){
    const [disabled,setDisabled] = useState(false)
    const navigate = useNavigate()
    const {userData} = useContext(MyContext)
    const [addHabit,setAddHabit] = useState(false)
    const [daysList, setDaysList] = useState([])
    const [inputValue,setInputValue] = useState('')
    const [habitsList, setHabitsList] = useState([])
    const weekList = ['D','S','T','Q','Q','S','S']
    const [selectedList,setSelectedList] = useState(weekList.map(()=>false))
    const response = useCallback(()=>{
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const request = axios.get(URL, config)
        request.then(answer => {
            setHabitsList(answer.data)
        })
        request.catch(error => {
            navigate('/')
        })
    },[setHabitsList, userData,navigate])
    useEffect(() => {
        response()
    },[response]);

    function wipe(){
        setAddHabit(false)
        setInputValue('')
    }
    function wipe2(){
        setSelectedList(weekList.map(()=>false))
        setDaysList([])
        setInputValue('')
    }
    function submit(event){
        setDisabled(true)
        const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits'
        event.preventDefault();
        const body = {
            name: inputValue,
            days: daysList
        }
        const config = {
            headers: {
                Authorization: `Bearer ${userData.token}`
            }
        }
        const request = axios.post(URL, body, config)
        request.then(answer => {
            setDisabled(false)
            response()
            wipe2()
        })
        request.catch(error => {
            setDisabled(false)
            response()
            wipe2()
        })
    }

    return(
        <>
        <Container>
            <MyHabit>
                <h1>Meus hábitos</h1>
                <div onClick={()=>setAddHabit(true)}><h3>+</h3></div>
            </MyHabit>
           {addHabit?<AddHabitBox >
                <form onSubmit={submit}>
                    <input disabled={disabled} value={inputValue} onChange={(e)=>setInputValue(e.target.value)} placeholder='nome do hábito' type='text' required/>
                    <WeekBox>
                        {weekList.map((f,index)=><Week selectedList={selectedList} setSelectedList={setSelectedList} disabled={disabled} key={index} f={f} index={index} daysList={daysList} setDaysList={setDaysList} />)}
                    </WeekBox>
                    <WeekButtons>
                        <h3 onClick={wipe}>Cancelar</h3>
                        <button disabled={disabled} type='submit'>{disabled?<ThreeDots 
                    height="10" 
                    width="84" 
                    radius="9"
                    color="white" 
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClassName=""
                    visible={true}
                 />:<>Salvar</>}</button>
                    </WeekButtons>
                </form>
            </AddHabitBox>:null}
            {habitsList.length
            ?habitsList.map((f)=><Habits response={response} key={f.id} f={f} weekList={weekList}></Habits>)
            :<h2>Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!</h2>}
           
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
const MyHabit = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 17px;
    div{
        width: 40px;
        height: 35px;
        border-radius: 5px;
        background-color: #52B6FF;
        font-family: 'Lexend Deca', sans-serif;
        font-size: 27px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        cursor: pointer;
    }
    h3{
        margin-bottom: 3px;
    }
`
const AddHabitBox = styled.div`
    width: 100%;
    height: 180px;
    background-color: white;
    margin-bottom: 17px;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    input{
        width: 100%;
        height: 45px;
        border-radius: 5px;
        border: 1px solid #D5D5D5;
        outline: 0px;
        padding: 10px;
        font-size: 20px;
        font-family: 'Lexend Deca', sans-serif;
    }
    input::placeholder{
        font-size: 20px;
        font-family: 'Lexend Deca', sans-serif;
        color: #DBDBDB;

    }
`
const WeekBox = styled.div`
    display: flex;
    margin-top: 10px;
    margin-bottom: 20px;
`
const WeekButtons = styled.div`
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    h3{
        font-size: 16px;
        font-family: 'Lexend Deca', sans-serif;
        color: #52B6FF;
        margin-right: 25px;
        cursor: pointer;
    }
    button{
        width: 84px;
        height: 35px;
        background-color: #52B6FF;
        color: white;
        font-family: 'Lexend Deca', sans-serif;
        border: 0px;
        border-radius: 5px;
        font-size: 16px;
        cursor: pointer;
    }
`