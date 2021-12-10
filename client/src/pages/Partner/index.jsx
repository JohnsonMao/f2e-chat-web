import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import UserList from '../../components/User_List';
import { getUserList } from '../../redux/actions';

export default function Partner() {
  
  const userList = useSelector(state => state.userList);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const userType =  user.userType === 'malePartner' ? 'femalePartner' : 'malePartner';
  useEffect(() => {
    dispatch( getUserList(userType));
  },[dispatch, userType])

  return (
    <UserList userList={userList}/>
  )
}
