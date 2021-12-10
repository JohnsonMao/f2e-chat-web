import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  FloatingLabel,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";

import HeaderNavbar from "../../components/HeaderNavbar";
import AvaterSelector from "../../components/Avater_selector";
import useForm from "../../utils/useFormHook";
import { updateUser } from "../../redux/actions";

export default function UserInfo() {
  const user = useSelector((state) => state.user);

  const [userForm, setUserForm] = useForm({
    userType: user?.userType,
    avater: user?.avater || "dog-4",
    birthday: user?.birthday || "",
    gender: user?.gender || "",
    name: user?.name || "",
    info: user?.info || "",
  });

  const [required, setRequired] = useState(false);
  const nameRef = useRef(null)

  const dispatch = useDispatch();

  const setAvater = (e) => {
    setUserForm({
      target: {
        name: "avater",
        value: e.avater,
      },
    });
  };
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userForm.name) {
      setRequired(true);
    } else {
      dispatch(updateUser(userForm));
      history.replace('/');
    }
  };


  return (
    <>
      <HeaderNavbar title="個人資料設定" />
      <Container className="desktop-content pt-4">
        <Form onSubmit={handleSubmit}>
          <Row className="align-items-end">
            <Col xs="12" lg="6">
              <AvaterSelector setAvater={setAvater} avater={userForm.avater} />

            </Col>

            <Col xs="12" lg="6">
              <div className="position-relative">
                <FloatingLabel controlId="name" label="暱稱" className="mb-3">
                  <Form.Control
                    name="name"
                    onChange={setUserForm}
                    value={userForm.name}
                    maxLength="12"
                    placeholder="請輸入暱稱"
                    className={required ? "border-danger" : "border-light"}
                    ref={nameRef}
                  />
                </FloatingLabel>
                {required && !nameRef.current.value ? (
                  <span className="position-absolute bottom-0 end-0 bg-danger px-2 rounded">
                    暱稱必須填寫
                  </span>
                ) : null}
              </div>

              <FloatingLabel controlId="birthday" label="生日" className="mb-3">
                <Form.Control
                  name="birthday"
                  type="date"
                  onChange={setUserForm}
                  value={userForm.birthday}
                  placeholder="請輸入生日"
                />
              </FloatingLabel>
              <Form.Group as={Row} className="align-items-center g-0 mb-1">
                <Form.Label as="legend" column className="col-4">
                  性別：
                </Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    name="gender"
                    onChange={setUserForm}
                    value="男性"
                    checked={userForm.gender === "男性"}
                    label="男性"
                    id="male"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    name="gender"
                    onChange={setUserForm}
                    value="女性"
                    checked={userForm.gender === "女性"}
                    label="女性"
                    id="female"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    name="gender"
                    onChange={setUserForm}
                    value="其他"
                    checked={userForm.gender === "其他"}
                    label="其他"
                    id="other"
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="align-items-center g-0 mb-3">
                <Form.Label as="legend" column className="col-4">
                  尋找伴侶：
                </Form.Label>
                <Col>
                  <Form.Check
                    type="radio"
                    name="userType"
                    onChange={setUserForm}
                    value="malePartner"
                    checked={userForm.userType === "malePartner"}
                    label="尋找男伴"
                    id="malePartner"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="radio"
                    name="userType"
                    onChange={setUserForm}
                    value="femalePartner"
                    checked={userForm.userType === "femalePartner"}
                    label="尋找女伴"
                    id="femalePartner"
                  />
                </Col>
              </Form.Group>

              <FloatingLabel controlId="info" label="自我介紹" className="mb-3">
                <Form.Control
                  as="textarea"
                  name="info"
                  onChange={setUserForm}
                  placeholder="請輸入自我介紹，讓大家更認識你！"
                  value={userForm.info}
                  maxLength="100"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          </Row>

            <Container className="fixed-bottom py-2">
              <Row className="gx-2">
                <Col>
                  <Button className="w-100" onClick={() => history.goBack()}>
                    返 回
                  </Button>
                </Col>
                <Col>
                  <Button type="submit" className="btn btn-success w-100">
                    保 存
                  </Button>
                </Col>
              </Row>
            </Container>
          </Form>
      </Container>
    </>
  );
}
