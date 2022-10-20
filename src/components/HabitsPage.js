import React, { useContext } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'

export default function HabitsPage(){
    const {userData} = useContext(MyContext)
    console.log(userData)
    return(
        <>
        </>
    )
}