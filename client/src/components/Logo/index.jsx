import React from 'react';
import logo from '../../assets/logo/logo.png';
import { Container } from 'react-bootstrap';

export default function Logo() {
  return (
    <Container className="text-center">
      <img src={ logo } width="240px" alt='logo'/>
    </Container>
  )
}
