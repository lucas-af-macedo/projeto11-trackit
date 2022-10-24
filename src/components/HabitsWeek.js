import React from "react"
import styled from "styled-components"
export default function HabitsWeek({days,day, index}){
    const selected = days.findIndex((f)=>f===index)!==-1
    return(
        <>
        <Day data-identifier="week-day-btn" selected={selected}>{day}</Day>
        </>
    )
}
const Day = styled.div`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Lexend Deca', sans-serif;
    background-color: ${props=>props.selected? '#CFCFCF':'#FFFFFF'};
    border: 1px solid ${props=>props.selected? '#CFCFCF':'#D5D5D5'};
    border-radius: 5px;
    color: ${props=>props.selected? '#FFFFFF':'#DBDBDB'};
    font-size: 20px;
    margin-right: 4px;

`