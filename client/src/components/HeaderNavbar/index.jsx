import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HeaderNavbar(props) {
  return (
    <Navbar variant="light" bg="primary" className="position-absolute top-0 start-0 end-0 shadow">
      <Container className="justify-content-center">
        { 
          props.prev ?
          (<Button className="text-light"
            onClick={props.prev}>
            <FontAwesomeIcon icon="chevron-left"/>
          </Button>) : null
        }
        <Navbar.Brand href="#" className="text-light text-line text-line-1 mb-0 mx-auto">
          {props.title}
          <span className="fs-6">{props.subtitle}</span>
        </Navbar.Brand>
        { 
          props.toggleShow ?
          (<Button className="text-light"
            onClick={props.toggleShow}>
            <FontAwesomeIcon icon="clipboard"/>
          </Button>) : null
        }
      </Container>
    </Navbar>
  )
}
