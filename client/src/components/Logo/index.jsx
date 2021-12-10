import React from 'react';
import logo from '../../assets/logo/logo.png';
import { Container } from 'react-bootstrap';

export default function Logo() {
  return (
    <Container>
      <img src={ logo } width="240px" className="mx-auto mt-5" alt='logo' />
    </Container>
  )
}
