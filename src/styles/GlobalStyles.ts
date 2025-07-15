import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --primary-color: #000000;
    --secondary-color: #333333;
    --text-color: #000000;
    --background-color: #FFFFFF;
    --background-secondary: #F5F5F5;
    --border-color: #E0E0E0;
    --accent-color: #555555;
    --danger-color: #D32F2F;
    --success-color: #388E3C;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }

  body {
    background-color: var(--background-color);
    color: var(--text-color);
    font-size: 16px;
    line-height: 1.5;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, select {
    font-family: inherit;
  }

  ul, ol {
    list-style: none;
  }
`;

export default GlobalStyles; 