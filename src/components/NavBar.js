import React, { useContext } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'

export default function NavBar(){
    const {userData} = useContext(MyContext)
    return(
        <>
            {userData?
            <Header></Header>:null}
        </>
    )
}

const Header = styled.div`
    position: fixed;
    height: 70px;
    width: 100%;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
`