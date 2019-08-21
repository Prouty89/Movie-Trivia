import React from 'react';
import Quiz from './game/Quiz'
import About from './components/About'
import './App.scss';


function App () {
  return (
  <div className = "app-container">
    <h1 className = "header">Movie Trivia!</h1>
    <Quiz />
    <About className = "about" />
  </div>
  )
}

export default App;