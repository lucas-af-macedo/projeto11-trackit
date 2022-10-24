import React, { useContext } from 'react'
import MyContext from '../contexts/myContext'
import styled from 'styled-components'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from "react-router-dom";

export default function NavBar(){
    const navigate = useNavigate()
    const {userData, today} = useContext(MyContext)
    return(
        <>
            {userData?
                <>
                    <Header>
                        <Logo onClick={()=>navigate('/hoje')}>TrackIt</Logo>
                        <div>
                            <img data-identifier="avatar" src={userData.image} alt='User'/>
                        </div>
                    </Header>
                    <Footer>
                        <h1 data-identifier="habit-page-action" onClick={()=>navigate('/habitos')}>Hábitos</h1>
                        <Circle onClick={()=>navigate('/hoje')}>
                            <CircularProgressbar
                                value={today}
                                text='Hoje'
                                background
                                backgroundPadding={6}
                                styles={buildStyles({
                                backgroundColor: "#52B6FF",
                                textColor: "#fff",
                                pathColor: "#fff",
                                trailColor: "transparent"
                                })}
                            />
                        </Circle>
                        <h1 data-identifier="historic-page-action" onClick={()=>navigate('/historico')}>Histórico</h1>
                    </Footer>
                </>
            :null}
        </>
    )
}

const Header = styled.div`
    position: fixed;
    height: 70px;
    width: 100%;
    top: 0px;
    left: 0px;
    background: #126BA5;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    h1{
        margin: 22px;
        color: white;
        font-size: 39px;
        font-family: 'Playball', cursive;
    }
    div{
        margin: 22px;
        width: 51px;
        height: 51px;
        border-radius: 26px;
        overflow: hidden;
    }img{
        height: 51px;
        margin-left: 50%;
        transform: translateX(-50%);
    }
`
const Footer = styled.div`
    position: fixed;
    height: 70px;
    width: 100%;
    background: white;
    bottom: 0px;
    left: 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 5;
    h1{
        color: #52B6FF;
        font-weight: 400;
        font-size: 18px;
        font-family: 'Lexend Deca', sans-serif;
        margin: 22px;
        cursor: pointer;
    }
`
const Circle = styled.div`
    width: 91px;
    height: 91px;
    margin-bottom: 50px;
    font-family: 'Lexend Deca', sans-serif;
    font-size: 18px;
    border-radius: 45px;
    background-color: azure;
    svg{
       cursor: pointer;
    }
`

const Logo = styled.h1`
    cursor: pointer;
`