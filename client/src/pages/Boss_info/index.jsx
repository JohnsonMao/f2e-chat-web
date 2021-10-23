import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FloatingLabel, Container, Button } from 'react-bootstrap';

import HeaderNavbar from '../../components/HeaderNavbar';
import AvaterSelector from '../../components/Avater_selector';
import useForm from "../../utils/useFormHook";
import { updateUser } from '../../redux/actions';

export default function BossInfo() {

  const [bossForm, setBossForm] = useForm({
    avater: 'cat-1',
    name: '',
    post: '',
    info: '',
    company: '',
    salary: ''
  });


  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch( updateUser(bossForm));
  }

  const setAvater = (e) => {
    setBossForm({
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
      <HeaderNavbar title="老闆資料設定"/>
      <Container>
        <Form onSubmit={handleSubmit}>
          <AvaterSelector setAvater={setAvater} avater={bossForm.avater} />

          <FloatingLabel controlId="name" label="名稱" className="mb-3">
            <Form.Control
              name="name"
              onChange={setBossForm}
              placeholder="請輸入名稱"
            />
          </FloatingLabel>

          <FloatingLabel controlId="post" label="招聘職位" className="mb-3">
            <Form.Control
              name="post"
              onChange={setBossForm}
              placeholder="請輸入招聘職位"
            />
          </FloatingLabel>
          
          <FloatingLabel controlId="company" label="公司名稱" className="mb-3">
            <Form.Control
              name="company"
              onChange={setBossForm}
              placeholder="請輸入公司名稱"
            />
          </FloatingLabel>
          
          <FloatingLabel controlId="salary" label="職位薪資" className="mb-3">
            <Form.Control
              name="salary"
              onChange={setBossForm}
              placeholder="請輸入職位薪資"
            />
          </FloatingLabel>

          <FloatingLabel controlId="info" label="職位簡介" className="mb-3">
            <Form.Control
              as="textarea"
              name="info"
              onChange={setBossForm}
              placeholder="請輸入職位簡介"
              style={{ height: '100px' }}
            />
          </FloatingLabel>

          <Button type="submit" className="btn-primary w-100">保 存</Button>
        </Form>
      </Container>
    </>
  )
}
