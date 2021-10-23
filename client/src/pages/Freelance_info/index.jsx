import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FloatingLabel, Container, Button } from 'react-bootstrap';

import HeaderNavbar from '../../components/HeaderNavbar';
import AvaterSelector from '../../components/Avater_selector';
import useForm from "../../utils/useFormHook";
import { updateUser } from '../../redux/actions';

export default function FreelanceInfo() {

  const [freelanceForm, setFreelanceForm] = useForm({
    avater: 'cat-1',
    name: '',
    post: '',
    info: ''
  });

  const dispatch = useDispatch();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch( updateUser(freelanceForm));
  }

  const setAvater = (e) => {
    setFreelanceForm({
      target: {
        name: "avater",
        value: e.avater
      }
    })
  }
  
  // 重新指定路由
  const { name, userType } = useSelector(state => state.user);
  if (name) return <Redirect to={"/" + userType}/>

  return (
    <>
      <HeaderNavbar title="接案者資料設定"/>
      <Container>
        <Form onSubmit={handleSubmit}>
          <AvaterSelector setAvater={setAvater} avater={freelanceForm.avater} />

          <FloatingLabel controlId="name" label="名稱" className="mb-3">
            <Form.Control
              name="name"
              onChange={setFreelanceForm}
              placeholder="請輸入名稱"
            />
          </FloatingLabel>

          <FloatingLabel controlId="post" label="求職職位" className="mb-3">
            <Form.Control
              name="post"
              onChange={setFreelanceForm}
              placeholder="請輸入求職職位"
            />
          </FloatingLabel>

          <FloatingLabel controlId="info" label="自我簡介" className="mb-3">
            <Form.Control
              as="textarea"
              name="info"
              onChange={setFreelanceForm}
              placeholder="請輸入自我簡介"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Button type="submit" className="btn-primary w-100">保 存</Button>
        </Form>
      </Container>
    </>
  )
}
