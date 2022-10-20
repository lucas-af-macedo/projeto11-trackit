import React, { useContext } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'

export default function HistoryPage(){
    const {userData} = useContext(MyContext)
    console.log(userData)
    return(
        <>
        <Container>

        </Container>
        </>
    )
}

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: #EBEBEB;
`