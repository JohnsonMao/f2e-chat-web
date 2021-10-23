import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, FloatingLabel, Container, Button } from "react-bootstrap";

import { login } from "../../redux/actions";
import HeaderNavbar from "../../components/HeaderNavbar";
import Logo from "../../components/Logo";
import useForm from "../../utils/useFormHook";

export default function Login() {
  
  const [signInForm, setSignInForm] = useForm({
    username: "",
    password: "",
  });

  // 取出 msg
  const msg = useSelector(state => state.user.msg);
  // 取出 redirectTo
  const redirectTo = useSelector(state => state.user.redirectTo);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch( login(signInForm));
  };

  // 重新指定路由
  if (redirectTo) return <Redirect to={redirectTo}/>

  return (
    <>
      <HeaderNavbar title="接案平台"/>
      <Logo />
      <Container>
        <Form onSubmit={handleSubmit}>
          <FloatingLabel controlId="username" label="帳號" className="mb-3">
            <Form.Control
              name="username"
              onChange={setSignInForm}
              placeholder="帳號"
            />
          </FloatingLabel>

          <FloatingLabel controlId="password" label="密碼" className="mb-3">
            <Form.Control
              type="password"
              name="password"
              onChange={setSignInForm}
              placeholder="密碼"
            />
          </FloatingLabel>

          <div className="d-flex justify-content-between align-items-center">
            <Link to="/register">沒有帳號 ?</Link>
            <Button type="submit" className="btn-primary">登入</Button>
          </div>

          { msg ? <div className="text-center text-danger">{msg}</div> : null }
        </Form>
      </Container>
    </>
  );
}