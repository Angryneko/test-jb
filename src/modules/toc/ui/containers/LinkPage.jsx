import styled from 'styled-components';
import React from "react";
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const levelPadding = 16
const contentPadding = 32

const LiPageStyle = styled.li`
	position: relative;
	min-height: 32px;
	width: 100%;
	font-size: 14px;
	font-weight: ${props => props.selected ? '600': '400'};
	background: ${props => props.selected && props.withAnchors ? '#f4f4f4': 'none'};
	line-height: 1.2;
	cursor: pointer;
	box-sizing: border-box;
	transition: background .1s ease-in;
	:hover {
	 background: #f4f4f4;
	 transition: background .1s ease-in;
	}
`

const LinkStyle = styled(Link)`
	display: block;
	color: #333;
	text-decoration: none;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-right: ${contentPadding}px;
	padding-left: ${props => (props.level + 1) * levelPadding + contentPadding}px;
`

const TocIcon = styled.svg`
	width: 20px;	
	position: absolute;
	left: ${props => (props.level) * levelPadding - 6 + contentPadding}px;
	top: 6px;
	transform: ${props => (props.isActive)? 'rotate(90deg)' : 'rotate(0deg)'};
	transition: transform .15s ease-in;
`

const NotLinkStyle = styled.div`
	display: block;
	color: #333;
	text-decoration: none;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-right: ${contentPadding}px;
	padding-left: ${props => (props.level + 1) * levelPadding + contentPadding}px;
`

export const LinkPage = ({page, togglePage, isActive, isSelectedPage}) => {
	return (<LiPageStyle
		selected={isSelectedPage}
		data-toc-scroll={page.id}
		withAnchors={page.anchors && page.anchors.length > 0}
		onClick={() => togglePage(page)}>
		{page?.pages &&
			<TocIcon viewBox="-5 -3 24 24" level={page.level} isActive={isActive}>
				<path d="M11 9l-6 5.25V3.75z"/>
			</TocIcon>}
			{page.url ?
				<LinkStyle to={page.url} level={page.level}>
					{page.title}
				</LinkStyle> :
				<NotLinkStyle withoutLink={!page.url} level={page.level}>
					{page.title}
				</NotLinkStyle>}
	</LiPageStyle>)
}

LinkPage.propTypes = {
	page: PropTypes.object.isRequired,
	togglePage: PropTypes.func.isRequired,
	isActive: PropTypes.bool.isRequired,
	isSelectedPage: PropTypes.bool.isRequired
}