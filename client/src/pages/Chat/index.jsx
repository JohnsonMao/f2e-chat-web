import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Container, Card, Button, Row, Col, Modal } from "react-bootstrap";

import emojis from "../../utils/emojis_config";
import { sendMsg, readMsg } from "../../redux/actions";
import HeaderNavbar from "../../components/HeaderNavbar";
import Message from "../Message";

export default function Chat() {
  const user = useSelector((state) => state.user);
  const { users, chatMsgs } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const { userid } = useParams();
  const [content, setContent] = useState("");
  const [emojiShow, setEmojiShow] = useState(false); // 控制顯示表情列表
  const [infoShow, setInfoShow] = useState(false); // 控制顯示對方自我介紹
  const toggleShow = () => {
    setInfoShow(!infoShow);
  };
  const chatRef = useRef(null);
  const history = useHistory();

  const meId = user._id; // 我的 id
  const targetId = userid; // 對方 id
  const chatId = [meId, targetId].sort().join("_"); // 組合 id

  useEffect(() => {
    chatRef.current?.scrollTo(0, chatRef.current.scrollHeight);
    // 已讀訊息方法
    dispatch(readMsg(targetId, meId));
  }, [chatMsgs.length, dispatch, meId, targetId]);

  if (!users[meId]) return null; // 當資料還沒來時，先回傳 null

  const msgs = chatMsgs.filter((msg) => msg.chat_id === chatId);

  const handleSend = (e) => {
    if (!e.keyCode || e.keyCode === 13) {
      const from = user._id;
      const to = userid;
      if (content.trim()) {
        dispatch(sendMsg({ from, to, content }));
        dispatch(readMsg(targetId, meId));
      }
      setContent("");
      setEmojiShow(false);
    }
  };

  const { target, me } = {
    target: {
      style: "gx-2 flex-row border-0 mb-1",
      avater: require(`../../assets/avaters/${users[targetId].avater}.png`)
        .default,
    },
    me: {
      style: "gx-2 flex-row-reverse border-0 mb-1",
      avater: require(`../../assets/avaters/${user.avater}.png`).default,
    },
  };

  return (
    <>
      <Row className="position-relative gx-2 mt-0 vh-100">
        <Col
          lg="4"
          className="position-absolute top-0 start-0 border-end border-primary d-none d-lg-block"
        >
          <HeaderNavbar title="聊天訊息" />
          <Message />
        </Col>
        <Col lg="8" className="position-absolute top-0 end-0">
          <HeaderNavbar
            title={users[targetId].name}
            subtitle={`（ ${users[targetId].username} ）`}
            prev={() => history.goBack()}
            toggleShow={toggleShow}
          />
          <div>
            <ul className="desktop-content p-3 pb-0" ref={chatRef}>
              {msgs.map((msg) => (
                <li key={msg._id}>
                  <Card
                    bg="secondary"
                    as={Row}
                    className={meId === msg.to ? target.style : me.style}
                  >
                    <Col xs="2" md="1">
                      <div className="ratio ratio-1x1">
                        <Card.Img
                          src={meId === msg.to ? target.avater : me.avater}
                          alt="avater"
                        />
                      </div>
                    </Col>
                    <Col xs="8" md="10">
                      <p
                        className={`position-relative bg-primary rounded p-2 mt-1 ${
                          meId === msg.to ? "chat-target" : "chat-me"
                        }`}
                      >
                        {msg.content}
                      </p>
                    </Col>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
          <div className="position-absolute botton-0 start-0 end-0 bg-primary zIndex-1 py-2">
            <Container className="position-absolute bottom-100 bg-primary rounded-top">
              <Row xs={6} className={`emoji ${emojiShow ? "emoji__show" : ""}`}>
                  {emojis.map((emoji) => (
                    <Col
                      key={emoji}
                      onClick={(e) =>
                        setContent(content + e.target.dataset.emoji)
                      }
                      data-emoji={emoji}
                    >
                      <span data-emoji={emoji} className="d-block text-center">
                        {emoji}
                      </span>
                    </Col>
                  ))}
                </Row>

            </Container>
          <Container>
              
              <Row className="g-1">
                <Col>
                  <input
                    placeholder="開始聊天"
                    onChange={(e) => setContent(e.target.value)}
                    onKeyUp={handleSend}
                    onFocus={() => setEmojiShow(false)}
                    value={content}
                    className="w-100 h-100 bg-secondary border-0 rounded text-light ps-2"
                    aria-label="Start chat"
                    aria-describedby="send"
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    type="button"
                    onClick={() => setEmojiShow(!emojiShow)}
                  >
                    🙂
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    variant="primary"
                    type="button"
                    id="send"
                    onClick={handleSend}
                  >
                    <FontAwesomeIcon icon={"paper-plane"} />
                  </Button>
                </Col>
              </Row>
              
            </Container>
          </div>
        </Col>
      </Row>
      <Modal
        show={infoShow}
        onHide={toggleShow}
        contentClassName="bg-primary"
        centered
      >
        <Modal.Header className="border-0" closeButton>
          <Modal.Title as="h3" className="text-light text-center w-100">
            {users[targetId].name}的自我介紹
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{users[targetId].info}</p>
        </Modal.Body>
      </Modal>
    </>
  );
}
