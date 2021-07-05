import styled from 'styled-components';
import React from "react";

const Wrapper = styled.div`
    height: 70px;
    width: 100%;
    border-bottom: 1px solid #d8d8d9;
    padding: 24px 32px;
    font-size: 18px;
    font-weight: 600;
    line-height: 1.2;
    box-sizing: border-box;
`

export const Header = () => {
    return (<Wrapper>Header</Wrapper>)
}