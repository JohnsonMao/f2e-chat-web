import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

import avaters from '../../assets/avaters';

AvaterSelector.propTypes = {
  setAvater: PropTypes.func.isRequired,
  avater: PropTypes.string.isRequired
}

export default function AvaterSelector(props) {

  const { avater, setAvater } = props;

  const checkedAvater = (e) => {
    setAvater({avater: e.target.getAttribute('data-avater')})
  }

  const avatersList = avaters.map((item, index) => (
    <Col key={`avater-${index}`}>
      <Card 
        className={`h-100 justify-content-end border-4 bg-light px-2 pt-1 
          ${item.src === avater ? `border-primary` : `border-light`}`}
        onClick={checkedAvater}
        data-avater={item.src}>
        <Card.Img variant="top" 
          src={require(`../../assets/avaters/${item.src}.png`).default} 
          alt={item.src} 
          data-avater={item.src}/>
        <Card.Title 
          className="text-center m-0 pt-1"
          data-avater={item.src}>
          {item.name}
        </Card.Title>
      </Card>
    </Col>
  ))

  return (
    <>
      <p className="p-2 mb-0">請選擇虛擬形象</p>
      <Row xs={4} className="g-0 mb-2">
        { avatersList }
      </Row>
    </>
  )
}
