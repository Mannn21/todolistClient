import styled from 'styled-components'

export const Container = styled.div`
    height: 100px;
    width: 100%;
    box-sizing: border-box;
    margin-top: 50px;
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
`

export const HeaderText = styled.h1`
    color: #0E7490;
    font-size: 60px;
    font-family: 'Raleway', sans-serif;
    font-weight: 800;
`

export const GreetName = styled.span`
    font-family: 'Raleway', sans-serif;
    font-weight: 600;
    font-size: 32px;
    color: #0E7490;
`