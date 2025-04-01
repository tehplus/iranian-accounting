import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'AnjomanMax';
    src: url('/fonts/AnjomanMax-Regular.woff2') format('woff2'),
         url('/fonts/AnjomanMax-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'AnjomanMax';
    src: url('/fonts/AnjomanMax-Bold.woff2') format('woff2'),
         url('/fonts/AnjomanMax-Bold.woff') format('woff');
    font-weight: bold;
    font-style: normal;
    font-display: swap;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    direction: rtl;
  }

  body {
    font-family: 'AnjomanMax', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background-color: #f8fafc;
    color: #1e293b;
    line-height: 1.5;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button {
    font-family: inherit;
  }
    .date-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e2e8f0;
  border-radius: 0.375rem;
  font-family: 'AnjomanMax';
  font-size: 0.875rem;
  color: #1e293b;
  transition: all 0.2s ease;
}

.date-input:focus {
  outline: none;
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}
`;
