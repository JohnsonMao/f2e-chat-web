import React, { useEffect } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Cookies from 'js-cookie';

import BossInfo from '../Boss_info';
import FreelanceInfo from '../Freelance_info';
import Boss from '../Boss';
import Freelance from '../Freelance';
import Message from '../Message';
import Chat from '../Chat';
import User from '../User';
import Error from '../Error';

import HeaderNavbar from '../../components/HeaderNavbar';
import FooterNavbar from '../../components/FooterNavbar';
import getRedirectTo from '../../utils/getRedirectTo';
import { getUser } from '../../redux/actions';

export default function Main() {

  // 讀取 redux 中的 user 資料
  const user = useSelector(state => state.user);
  const unReadCount = useSelector(state => state.chat.unReadCount);
  // 讀取 cookie
  const userid = Cookies.get('userid');
  // 獲取當前路徑
  let path = useLocation().pathname;

  const dispatch = useDispatch();
  // 判斷自動登入
  useEffect(()=>{
    if (userid && !user._id) {
      dispatch(getUser());
    } 
  },[dispatch, user._id, userid])

  // 為獲取到 cookie，跳轉登入頁面
  if (!userid) return <Redirect to="/login"/>

  // 獲取到 cookie，檢查 user._id，路由重新定向
  if (!user._id) {
    return null;
  } else {
    if (path === '/') {
      console.log(user)
      path = getRedirectTo(user.userType, user.name);
      return <Redirect to={ path }/>
    }
  }

  // route
  const navList = [
    {
      path: '/boss',
      component: Boss,
      title: '接案者清單',
      icon: "handshake",
      text: '接案者'
    },
    {
      path: '/freelance',
      component: Freelance,
      title: '老闆清單',
      icon: "handshake",
      text: '老闆'
    },
    {
      path: '/message',
      component: Message,
      title: '訊息清單',
      icon: "comment-dots",
      text: '訊息'
    },
    {
      path: '/user',
      component: User,
      title: '設定個人資料',
      icon: "user",
      text: '個人'
    },
  ]

  const currentNav = navList.find(nav => nav.path === path);

  // 根據用戶類型過濾 FooterNavbar 的 navList
  if (currentNav) {
    if (user.userType === 'boss') {
      navList[1].hide = true;
    } else {
      navList[0].hide = true;
    }
  }

  return (
    <>
      {
        currentNav ? <HeaderNavbar title={currentNav.title}/> : null
      }
      <Switch>
        {
          navList.map( item => (
            <Route key={item.component} path={item.path} component={item.component}/>
          ))
        }
        <Route path="/bossinfo" component={BossInfo}/>
        <Route path="/freelanceinfo" component={FreelanceInfo}/>
        <Route path="/chat/:userid" component={Chat}/>
        <Route component={Error}/>
      </Switch>
      {
        currentNav ? <FooterNavbar navList={navList} unReadCount={unReadCount}/> : null
      }
    </>
  )
}
