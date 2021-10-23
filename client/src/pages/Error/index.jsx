import React from 'react';
import { useHistory } from "react-router-dom";
import { Button, Container } from 'react-bootstrap';

export default function Error() {
  
  const history = useHistory();

  return (
    <Container>
      <h2>抱歉～找不到該頁面！</h2>
      <Button onClick={() => history.replace("/")}>回到首頁</Button>
    </Container>
  )
}
