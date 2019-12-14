import React from 'react';
import Quiz from './game/Quiz';
import About from './game/About';
import styled from '@emotion/styled';


function App () {
  return (
  <AppStyle className = "app-container">
    <HeaderStyle className = "header">Movie Trivia!</HeaderStyle>
    <Quiz />
    <About className = "about" />
  </AppStyle>
  )
}

export default App;

const AppStyle = styled.div({
  background: '#282E74',
  minHeight: '100vh',
  minWidth: '100vw',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center'
})

const HeaderStyle = styled.h1({
  marginBlockStart: '0px',
  marginBlockEnd: '0px',
  position: 'absolute',
  top: '15%',
  color: 'white',
  fontFamily: 'cursive'

})
