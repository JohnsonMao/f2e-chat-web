import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';

import UserList from '../../components/User_List';
import { getUserList } from '../../redux/actions';

export default function Boss() {
  
  const userList = useSelector(state => state.userList);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch( getUserList("freelance"));
  },[])

  return (
    <Container>
      <UserList userList={userList}/>
    </Container>
  )
}
