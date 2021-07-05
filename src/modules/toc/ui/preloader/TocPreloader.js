import styled, {keyframes} from 'styled-components';
import React from "react";

const changeBackground = keyframes`
  from {
    background: #f4f4f4;
  }
  50% {
    background: #e1e1e1;
  }
  to {
    background: #f4f4f4;
  }
`

const PreloaderWrapper = styled.div`
  height: 100%;
  width: 280px;
  box-sizing: border-box;
  padding: 24px 32px 0;
  border-right: 1px solid #d8d8d9;
`

const Line = styled.div`
  height: 16px;
  margin-bottom: 16px;
  animation: ${changeBackground} 3s linear infinite;
`

const LongLine = styled(Line)`
  width: 100%
`

const LineLevelOneShort = styled(Line)`
  margin-left: 16px;
  margin-right: 25px;
`
const LineLevelOne = styled(Line)`
  margin-left: 16px;
`

const LineLevelTwoShort = styled(Line)`
  margin-left: 32px;
  margin-right: 25px;
`
const LineLevelTwo = styled(Line)`
  margin-left: 32px;
`

//const lines = ['LongLine', 'LineLevelOneShort', 'LineLevelOne']

export const TocPreloader = () => {
  return (
  <PreloaderWrapper>
    <LongLine/>
    <LineLevelOneShort/>
    <LineLevelOne/>
    <LineLevelOneShort/>
    <LineLevelTwo/>
    <LineLevelTwoShort/>
    <LineLevelTwo/>
    <LineLevelTwoShort/>
    <LongLine/>
    <LongLine/>
  </PreloaderWrapper>)
}