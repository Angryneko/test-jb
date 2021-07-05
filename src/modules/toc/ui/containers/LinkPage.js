import styled from 'styled-components';
import React from "react";

const levelPadding = 16
const contentPadding = 32

const LinkPageStyle = styled.li`
	position: relative;
	min-height: 32px;
	width: 100%;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-right: ${contentPadding}px;
	padding-left: ${props => (props.level + 1) * levelPadding + contentPadding}px;
	font-size: 14px;
	font-weight: ${props => props.selected ? '600': '400'};
	background: ${props => props.selected ? '#eee': 'none'};
	line-height: 1.2;
	cursor: pointer;
	box-sizing: border-box;
	transition: background .1s ease-in;
	:hover {
	 background: #e9e9e9;
	 transition: background .1s ease-in;
	}
`

const TocIcon = styled.svg`
	width: 20px;	
	position: absolute;
	left: ${props => (props.level) * levelPadding - 6 + contentPadding}px;
	top: 6px;
	transform: ${props => (props.isActive)? 'rotate(90deg)' : 'rotate(0deg)'};
	transition: transform .15s ease-in;
`

export const LinkPage = ({data, togglePage, isActive, isSelectedPage}) => {

	return (<LinkPageStyle level={data.level} selected={isSelectedPage} onClick={() => togglePage(data)}>
		{data?.pages &&
		<TocIcon viewBox="-5 -3 24 24" level={data.level} isActive={isActive}>
			<path d="M11 9l-6 5.25V3.75z"/>
		</TocIcon>}
		{data.title}
	</LinkPageStyle>)
}