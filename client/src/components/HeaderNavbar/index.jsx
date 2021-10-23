import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HeaderNavbar(props) {
  return (
    <Navbar fixed="top" variant="light" bg="primary">
      <Container className="justify-content-center">
        { 
          props.prev ?
          (<Button className="position-absolute start-0 text-light ps-3"
            onClick={props.prev}>
            <FontAwesomeIcon icon="chevron-left"/>
          </Button>) : null
        }
        <Navbar.Brand href="#home" className="text-light fw-bold m-0">
          {props.title}
        </Navbar.Brand>
      </Container>
    </Navbar>
  )
}
