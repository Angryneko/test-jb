import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
    body {
    font-family: 'Arial';
    font-size: 14px;
    color: #333;
  }

  li, ul {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  
  input, textarea {
    outline: none;
  }
  
  button {
    border: 0;
    outline: none;
  }
  
  html, body {
    margin: 0;
    padding: 0;
    background: #F5F6FA;
    width: 100%;
  }
  
  h1 {
    font-size: 40px;
		font-weight: 800;
		line-height: 1.2;
		margin: 0 0 40px;
  }
  
  h2, h3, h4 {
    font-weight: 600;
		line-height: 1.2;
		margin: 40px 0 20px;
  }
  
  h2 {
		font-size: 31px;
  }
  
  h3 {
    font-size: 20px;
  }
  
  h4 {
    font-size: 16px;
  }
`;