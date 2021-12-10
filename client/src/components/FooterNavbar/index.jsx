import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { Navbar, Nav, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

FooterNavbar.propTypes = {
  navList: PropTypes.array.isRequired,
  unReadCount: PropTypes.number.isRequired,
};

export default function FooterNavbar(props) {
  let { navList, unReadCount } = props;

  navList = navList.filter((item) => !item.hide);

  return (
    <>
      <Navbar
        bg="primary"
        className="position-absolute bottom-0 start-0 end-0 p-0"
      >
        <Container>
          <Row className="w-100">
            <Col xs="12" lg="4">
              <Nav justify className="w-100" as="ul">
                {navList.map((item) => (
                  <Nav.Item key={item.component} as="li">
                    <NavLink
                      to={item.path}
                      className="position-relative d-block py-1"
                    >
                      <FontAwesomeIcon icon={item.icon} />
                      <p className="m-0">{item.text}</p>
                      {item.path === "/message" ? (
                        unReadCount ? (
                          <span className="position-absolute top-25 start-50 bg-danger rounded lh-1 p-1 pt-0">
                            {unReadCount > 100 ? "99+" : unReadCount}
                          </span>
                        ) : null
                      ) : null}
                    </NavLink>
                  </Nav.Item>
                ))}
              </Nav>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </>
  );
}
