import React from "react";
import { Link, Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import { register } from "../../redux/actions";
import HeaderNavbar from "../../components/HeaderNavbar";
import Logo from "../../components/Logo";
import useForm from "../../utils/useFormHook";

export default function Register() {
  const [signUpForm, setSignUpForm] = useForm({
    username: "",
    password: "",
    checkPassword: "",
    userType: "femalePartner",
  });

  // 取出 msg
  const msg = useSelector((state) => state.user.msg);
  // 取出 redirectTo
  const redirectTo = useSelector((state) => state.user.redirectTo);

  // 發送 data
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(signUpForm));
  };

  // 重新指定路由
  if (redirectTo) return <Redirect to={redirectTo} />;

  return (
    <>
      <HeaderNavbar title="註冊帳號" />
      <Logo />
      <Container>
        <Row className="justify-content-center">
          <Col xs="12" md="8" lg="6">
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="username" label="帳號" className="mb-3">
                <Form.Control
                  name="username"
                  onChange={setSignUpForm}
                  placeholder="帳號"
                />
              </FloatingLabel>

              <FloatingLabel controlId="password" label="密碼" className="mb-3">
                <Form.Control
                  type="password"
                  name="password"
                  onChange={setSignUpForm}
                  placeholder="密碼"
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="checkPassword"
                label="確認密碼"
                className="mb-3"
              >
                <Form.Control
                  type="password"
                  name="checkPassword"
                  onChange={setSignUpForm}
                  placeholder="確認密碼"
                />
              </FloatingLabel>

              <Form.Group as={Row} className="align-items-center g-0 mb-3">
                <Form.Label as="legend" column>
                  尋找伴侶：
                </Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    name="userType"
                    onChange={setSignUpForm}
                    value="femalePartner"
                    checked={signUpForm.userType === "femalePartner"}
                    label="尋找女伴"
                    id="femalePartner"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    name="userType"
                    onChange={setSignUpForm}
                    value="malePartner"
                    checked={signUpForm.userType === "malePartner"}
                    label="尋找男伴"
                    id="malePartner"
                  />
                </Col>
              </Form.Group>

              <div className="d-flex justify-content-between align-items-center">
                <Link to="/login">已有帳號 ?</Link>
                <Button type="submit" className="btn-light px-4 py-2">
                  註冊
                </Button>
              </div>

              {msg ? (
                <div className="text-center text-danger">{msg}</div>
              ) : null}
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}
