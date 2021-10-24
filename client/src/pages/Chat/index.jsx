import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Card,
  Button,
  InputGroup,
  FormControl,
  ListGroup,
  Row,
  Col
} from "react-bootstrap";

import { sendMsg, readMsg } from "../../redux/actions";
import HeaderNavbar from "../../components/HeaderNavbar";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const { users, chatMsgs } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [content, setContent] = useState("");
  const [show, setShow] = useState(false);      // 控制顯示表情列表
  const history = useHistory();

  const meId = user._id; // 我的 id
  const targetId = userid; // 對方 id
  const chatId = [meId, targetId].sort().join("_"); // 組合 id

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
    // 已讀訊息方法
    dispatch( readMsg(targetId, meId));
  }, [chatMsgs.length, dispatch, targetId, meId])

  const emojis = ["😀","😆","😅","😂","🤣","😇","😉","🙂","😋","🙃","😍","🥰","😘","🤪","😝","🤑","😎","🤡","🥳","🤬","🤐","😒","🙄","😱","😵","🤮","😴","😈","🥴","😥","💩","👌"]

  if (!users[meId]) return null; // 當資料還沒來時，先回傳 null

  const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);

  const handleSend = (e) => {
    if (!e.keyCode || e.keyCode === 13) {
      const from = user._id;
      const to = userid;
      if (content) {
        dispatch(sendMsg({ from, to, content }));
      }
      setContent("");
      setShow(false);
    }
  };

  const { target, me } = {
    target: {
      style: "flex-row border-0 mb-1",
      avater: require(`../../assets/avaters/${users[targetId].avater}.png`).default
    },
    me: {
      style: "flex-row-reverse border-0 mb-1",
      avater: require(`../../assets/avaters/${user.avater}.png`).default
    },
  };

  return (
    <>
      <HeaderNavbar title={`${users[targetId].name}（${users[targetId].username}）`} 
        prev={() => history.goBack()}/>
      <Container className="mt-1">
        <ListGroup as="ul" variant="flush" className="pb-5">
          {msgs.map((msg) => (
            <ListGroup.Item as="li" key={msg._id} className="border-0">
              <Card className={meId === msg.to ? target.style : me.style}>
                <div className="frame-chat ratio ratio-1x1">
                  <Card.Img
                    src={meId === msg.to ? target.avater : me.avater}
                    alt="avater"
                  />
                </div>
                <p className="m-2 mt-3">{msg.content}</p>
              </Card>
            </ListGroup.Item>
          ))}
        </ListGroup>
        <div className="fixed-bottom">
          <InputGroup>
            <FormControl
              placeholder="開始聊天"
              onChange={(e) => setContent(e.target.value.trim())}
              onKeyUp={handleSend}
              onFocus={() => setShow(false)}
              value={content}
              className="border-light"
              aria-label="Start chat"
              aria-describedby="submit"
            />
            <Button variant="light" id="submit" onClick={() => setShow(!show)}>
              🙂
            </Button>
            <Button variant="primary" id="submit" onClick={handleSend}>
              傳送
            </Button>
          </InputGroup>
          <Row xs="8" className={show ? "bg-light p-2" : "d-none"}>
            {
              emojis.map(emoji => (
                <Col key={emoji}
                  onClick={(e) => setContent(content + e.target.dataset.emoji)}
                  data-emoji={emoji}>
                  <span data-emoji={emoji}>{ emoji }</span>
                </Col>
              ))
            }
          </Row>
        </div>
      </Container>
    </>
  );
}
