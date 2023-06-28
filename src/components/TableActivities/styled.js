import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin-top: 20px;
    padding: 10px 60px;
`

export const Wrapper = styled.div`
    height: 100%;
    width: 100%;
    border-top: 1px solid #888;
`

export const FilterWrapper = styled.div`
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 5px 12px;
`

export const DropdownWrapper = styled.div`
    height: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
`

export const Label = styled.label`
    font-size: 15px;
    letter-spacing: 1.1px;
    font-family: 'Poppins', sans-serif;
`

export const Select = styled.select`
    height: 100%;
    border: none;
    outline: none;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
`

export const Option = styled.option`
    font-size: 13px;
    font-family: 'Poppins', sans-serif;
`



