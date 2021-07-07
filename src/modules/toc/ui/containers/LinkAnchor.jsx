import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from 'react-router-dom';

const levelPadding = 16
const contentPadding = 32

const LiAnchorStyle = styled.li`
	position: relative;
	min-height: 32px;
	width: 100%;
	background: #f4f4f4;
	font-size: 14px;
	line-height: 1.2;
	cursor: pointer;
	box-sizing: border-box;
	:hover {
	 background: #e9e9e9;
	}
`

const LinkStyle = styled(Link)`
	display: block;
	color: #333;
	text-decoration: none;
	padding-top: 8px;
	padding-bottom: 8px;
	padding-right: ${contentPadding}px;
	padding-left: ${props => (props['level-page'] + props['level-anchor'] + 1) * levelPadding + contentPadding}px;
`

export const LinkAnchor = ({anchor, level, toggleAnchor}) => {
	return (<LiAnchorStyle
			data-toc-scroll={anchor.id}
			onClick={() => toggleAnchor(anchor)}>
			<LinkStyle to={anchor.url + anchor.anchor} level-page={level} level-anchor={anchor.level}>
				{anchor.title}
			</LinkStyle>
	</LiAnchorStyle>)
}

LinkAnchor.propTypes = {
	anchor: PropTypes.object.isRequired,
	level: PropTypes.number.isRequired,
	toggleAnchor: PropTypes.func.isRequired
}