import React from 'react';
import styled from '@emotion/styled';


export default () => (
  <About className='about'>
    <p>
      Movie Trivia game created by Blake Prouty using React and Redux.  Questions generated from
      <StyledLink href = "https://opentdb.com/" target = "__blank" rel ="noopener" classname="link-db">Open Trivia Database</StyledLink>
    </p>
  </About>
)

const About = styled.div({
  color: 'white',
  position: 'absolute',
  fontFamily: 'sans-serif',
  bottom: 0,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
})

const StyledLink = styled.a({
  textDecoration: 'underline',
  color: 'white',
  marginLeft: '5px'
})