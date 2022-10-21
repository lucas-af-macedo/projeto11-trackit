import React from "react"
import styled from "styled-components"
export default function Week({f,index, daysList, setDaysList, disabled, selectedList, setSelectedList}){
    function selectDay(){
        if(selectedList[index]){
            let list = daysList.filter((f)=>f!==index)
            setDaysList(list)
            let array = [...selectedList]
            array[index] = false
            setSelectedList(array)
        }else{
            let list = [...daysList]
            const position = list.findIndex((f)=>f>index)
            if(position===-1){
                setDaysList([...list, index])
            }else{
                let list = [...daysList.slice(0,position),index,...daysList.slice(position)]
                setDaysList(list)
            }
            let array = [...selectedList]
            array[index] = true
            setSelectedList(array)
        }
    }
    return(
        <>
        <Day disabled={disabled} type="button" selected={selectedList[index]} onClick={selectDay} >{f}</Day>
        </>
    )
}
const Day = styled.button`
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
    cursor: pointer;

`