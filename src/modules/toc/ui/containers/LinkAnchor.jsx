import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const levelPadding = 16
const contentPadding = 32

const LinkAnchorStyle = styled.li`
	position: relative;
	min-height: 32px;
	width: 100%;
	padding-top: 8px;
	padding-bottom: 8px;
	/*background: #f4f4f4;*/
	background: #eee;
	padding-right: ${contentPadding}px;
	padding-left: ${props => (props.level + 1) * levelPadding + contentPadding}px;
	font-size: 14px;
	line-height: 1.2;
	cursor: pointer;
	box-sizing: border-box;
	:hover {
	 background: #e9e9e9;
	}
`

export const LinkAnchor = ({data, level}) => {
	return (<LinkAnchorStyle level={level}>{data.title}</LinkAnchorStyle>)
}

LinkAnchor.propTypes = {
	data: PropTypes.object.isRequired,
	level: PropTypes.number.isRequired
}