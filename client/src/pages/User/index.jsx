import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, Button, Modal, ListGroup } from 'react-bootstrap';
import Cookies from 'js-cookie';

import { resetUser } from '../../redux/actions';

export default function User() {
  
  const [ show, setShow ] = useState(false);
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();

  const toggleShow = () => setShow(!show);
  const signOut = () => {
    Cookies.remove('userid');
    dispatch( resetUser());
  }
  
  return (
    <Container className="pb-5">
      <Card className="border-0 my-3">
        <div className="frame ratio ratio-1x1">
          <Card.Img varient="top" 
            src={require(`../../assets/avaters/${user.avater}.png`).default}
            alt={user.avater}/>
        </div>
        <Card.Body className="text-center">
          <h2 className="fs-3">{user.name}
            <span className="fs-6">{`（${user.username}）`}</span>
          </h2>
          <h3>{user.company}</h3>
        </Card.Body>
      </Card>
      <div className="mb-3">
        <h3>使用者資訊</h3>
        <ListGroup as="ul" variant="flush">
          <ListGroup.Item as="li">職位：{user.post || "未填寫"}</ListGroup.Item>
          <ListGroup.Item as="li">薪資：{user.salary || "未填寫"}</ListGroup.Item>
          <ListGroup.Item as="li">簡介：{user.info || "未填寫"}</ListGroup.Item>
        </ListGroup>
      </div>
      <Button variant="danger" className="w-100" onClick={toggleShow}>登出</Button>

      <Modal show={show} onHide={toggleShow} centered>
        <Modal.Header className="justify-content-center border-0">
          <Modal.Title>確定要登出嗎？</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="row justify-content-center">
          <Button variant="outline-primary" className="col-5" onClick={toggleShow}>
            取消
          </Button>
          <Button variant="primary" className="col-5" onClick={signOut}>
            確定
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  )
}
