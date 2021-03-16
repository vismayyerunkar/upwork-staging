import React, { useEffect, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { isEmpty, map } from "lodash"
import moment from "moment"
import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Media,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  UncontrolledDropdown,
  UncontrolledTooltip
} from "reactstrap"
import classnames from "classnames"

//Import Scrollbar
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"
import images from "assets/images"
import {
  addMessage,
  getChats,
  getContacts,
  getGroups,
  getMessages
} from "store/actions"

import chat_data from "../../common/data/helpdesk"

const HelpDesk = props => {
  const [chats, setChats] = useState(chat_data.chats)
  const [groups, setGroups] = useState(chat_data.groups)
  const [contacts, setContacts] = useState(chat_data.contacts)
  const [messages, setMessages] = useState(chat_data.messages)
  const [currentmessages, setCurrentmessages] = useState([])
  const [messageBox, setMessageBox] = useState(null)
  // const Chat_Box_Username2 = "Henry Wells"
  const [currentRoomId, setCurrentRoomId] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState({
    name: "Henry Wells",
    isActive: true
  })
  const [notification_Menu, setnotification_Menu] = useState(false)
  const [search_Menu, setsearch_Menu] = useState(false)
  const [settings_Menu, setsettings_Menu] = useState(false)
  const [other_Menu, setother_Menu] = useState(false)
  const [activeTab, setactiveTab] = useState("1")
  const [Chat_Box_Username, setChat_Box_Username] = useState("Admin")
  // eslint-disable-next-line no-unused-vars
  const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online")
  const [curMessage, setcurMessage] = useState("")
  const [curFilter, setCurFilter] = useState([])

  const [messageIcons, setMessageIcons] = useState(false);

  const filterchat = value => {
    let newchats = chats.filter(chat => chat.name.includes(value));
    setCurFilter(newchats);
  }

  const checkUnreadMessages = (chat) => {
    let number_of_unread = 0;
    messages.filter(message => message.roomId === chat.roomId).forEach(message => {
      if (message.readstatus === false) {
        number_of_unread = number_of_unread + 1;
      }
    })
    return number_of_unread
  }

  const toggleNotification = () => {
    setnotification_Menu(!notification_Menu)
  }

  //Toggle Chat Box Menus
  const toggleSearch = () => {
    setsearch_Menu(!search_Menu)
  }

  const toggleSettings = () => {
    setsettings_Menu(!settings_Menu)
  }

  const toggleOther = () => {
    setother_Menu(!other_Menu)
  }

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setactiveTab(tab)
    }
  }

  const toggleStarred = chat => {
    let newchats = [];
    chats.forEach(newchat => {
      if (newchat.id === chat.id) {
        newchat.starred = !newchat.starred;
      }
      newchats.push(newchat);
    });
    setChats(newchats);
  }

  const archiveChat = () => {
    let newchats = [];
    chats.forEach(newchat => {
      if (newchat.roomId === currentRoomId) {
        newchat.archived = !newchat.archived;
      }
      newchats.push(newchat);
    });
    setChats(newchats);
  }

  //Use For Chat Box
  const userChatOpen = (id, name, status, roomId) => {
    let newcurrentmessages = messages.filter(message => message.roomId === roomId);
    let newmessages = [];
    messages.forEach(message => {
      if (message.roomId === roomId) {
        message.readstatus = true;
      }
      newmessages.push(message);  
    })
    setCurrentmessages(newcurrentmessages);
    setChat_Box_Username(name);
    setCurrentRoomId(roomId);
    setChat_Box_User_Status(status);
    setMessages(newmessages);
  }

  const addMessage = (roomId, sender) => {
    if (curMessage !== "") {
      let newmessages = [...messages];
      newmessages.push({
        id: newmessages.length + 1,
        roomId: roomId,
        sender: sender,
        message: curMessage,
        readstatus: true,
        createdAt: "2020-04-02T17:00:21.529Z",
      })
      let newcurrentmessages = newmessages.filter(message => message.roomId === currentRoomId);
      setMessages(newmessages);
      setCurrentmessages(newcurrentmessages);
      setcurMessage("");
    }
  }

  const scrollToBottom = () => {
    if (messageBox) {
      let newmessageBox = messageBox;
      newmessageBox.scrollTop = newmessageBox.scrollHeight + 1000;
      setMessageBox(newmessageBox);
    }
  }

  const onKeyPress = e => {
    const { key } = e;
    if (key === "Enter") {
      if (curMessage !== "") {
        let newmessages = [...messages];
        newmessages.push({
          id: newmessages.length + 1,
          roomId: currentRoomId,
          sender: currentUser.name,
          message: curMessage,
          readstatus: true,
          createdAt: "2020-04-02T17:00:21.529Z",
        })
        let newcurrentmessages = newmessages.filter(message => message.roomId === currentRoomId);
        setMessages(newmessages);
        setCurrentmessages(newcurrentmessages);
        setcurMessage("");
      }
    }
  }

  const toggleMessageIcons = (index, value) => {
    let newmessages = [...messages]; 
    newmessages[index].selected = value;
    setMessages(newmessages); 
  }

  useEffect(() => {
    let newcurrentmessages = messages.filter(message => message.roomId === currentRoomId);
    let newChat_Box_Username = currentUser.name;
    let newmessages = [];
    messages.forEach(message => {
      if (message.roomId === currentRoomId) {
        message.readstatus = true;
      }
      newmessages.push(message);  
    })
    setCurrentmessages(newcurrentmessages);
    setChat_Box_Username(newChat_Box_Username);
    setMessages(newmessages);
    setCurFilter(chats);
  },[])

  useEffect(() => {
    if (curFilter.length !== 0) {
      let newcurfilter = [];
      chats.forEach(chat => {
        curFilter.forEach(curfilt => {
          if (chat.id === curfilt.id) {
            newcurfilter.push(chat);
          }
        })
      })
      setCurFilter(newcurfilter);
    }
  },[chats])

  useEffect(() => {
    scrollToBottom();
  },[currentmessages])

  // const { chats, groups, contacts, messages } = props
  // const [messageBox, setMessageBox] = useState(null)
  // // const Chat_Box_Username2 = "Henry Wells"
  // const [currentRoomId, setCurrentRoomId] = useState(1)
  // // eslint-disable-next-line no-unused-vars
  // const [currentUser, setCurrentUser] = useState({
  //   name: "Henry Wells",
  //   isActive: true
  // })
  // const [notification_Menu, setnotification_Menu] = useState(false)
  // const [search_Menu, setsearch_Menu] = useState(false)
  // const [settings_Menu, setsettings_Menu] = useState(false)
  // const [other_Menu, setother_Menu] = useState(false)
  // const [activeTab, setactiveTab] = useState("1")
  // const [Chat_Box_Username, setChat_Box_Username] = useState("Admin")
  // // eslint-disable-next-line no-unused-vars
  // const [Chat_Box_User_Status, setChat_Box_User_Status] = useState("online")
  // const [curMessage, setcurMessage] = useState("")

  // useEffect(() => {
  //   const { onGetChats, onGetGroups, onGetContacts, onGetMessages } = props
  //   onGetChats()
  //   onGetGroups()
  //   onGetContacts()
  //   onGetMessages(currentRoomId)
  // }, [props, currentRoomId])

  // useEffect(() => {
  //   if (!isEmpty(messages)) scrollToBottom()
  // }, [props, messages])

  // const toggleNotification = () => {
  //   setnotification_Menu(!notification_Menu)
  // }

  // //Toggle Chat Box Menus
  // const toggleSearch = () => {
  //   setsearch_Menu(!search_Menu)
  // }

  // const toggleSettings = () => {
  //   setsettings_Menu(!settings_Menu)
  // }

  // const toggleOther = () => {
  //   setother_Menu(!other_Menu)
  // }

  // const toggleTab = tab => {
  //   if (activeTab !== tab) {
  //     setactiveTab(tab)
  //   }
  // }

  // //Use For Chat Box
  // const userChatOpen = (id, name, status, roomId) => {
  //   const { onGetMessages } = props
  //   setChat_Box_Username(name)
  //   setCurrentRoomId(roomId)
  //   onGetMessages(roomId)
  // }

  // const addMessage = (roomId, sender) => {
  //   const { onAddMessage } = props
  //   const message = {
  //     id: Math.floor(Math.random() * 100),
  //     roomId,
  //     sender,
  //     message: curMessage,
  //     createdAt: new Date()
  //   }
  //   setcurMessage("")
  //   onAddMessage(message)
  // }

  // const scrollToBottom = () => {
  //   if (messageBox) {
  //     messageBox.scrollTop = messageBox.scrollHeight + 1000
  //   }
  // }

  // const onKeyPress = e => {
  //   const { key, value } = e
  //   if (key === "Enter") {
  //     setcurMessage(value)
  //     addMessage(currentRoomId, currentUser.name)
  //   }
  // }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Skote" breadcrumbItem="Helpdesk" />

          <Row>
            <Col lg="12">
              <div className="d-lg-flex">
                <div className="w-100 user-chat">
                  <Card className="chatMarginBottom">
                    <div className="p-4 border-bottom ">
                      <Row>
                        <Col md="4" xs="9">
                          <h5 className="font-size-15 mb-1">
                            HelpDesk
                          </h5>

                          <p className="text-muted mb-0">
                            <i
                              className={
                                Chat_Box_User_Status === "online"
                                  ? "mdi mdi-circle text-success align-middle mr-1"
                                  : Chat_Box_User_Status === "intermediate"
                                  ? "mdi mdi-circle text-warning align-middle mr-1"
                                  : "mdi mdi-circle align-middle mr-1"
                              }
                            />
                            {Chat_Box_User_Status}
                          </p>
                        </Col>
                        <Col md="8" xs="3">
                          <ul className="list-inline user-chat-nav text-right mb-0">
                            <li className="list-inline-item d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={search_Menu}
                                toggle={toggleSearch}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-search-alt-2" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-md"
                                  right
                                >
                                  <Form className="p-3">
                                    <FormGroup className="m-0">
                                      <InputGroup>
                                        <Input
                                          type="text"
                                          className="form-control"
                                          placeholder="Search ..."
                                          aria-label="Recipient's username"
                                        />
                                        <InputGroupAddon addonType="append">
                                          <Button color="primary" type="submit">
                                            <i className="mdi mdi-magnify" />
                                          </Button>
                                        </InputGroupAddon>
                                      </InputGroup>
                                    </FormGroup>
                                  </Form>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item">
                              <Dropdown
                                isOpen={other_Menu}
                                toggle={toggleOther}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-dots-horizontal-rounded" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem
                                    href="#"
                                    className="alignIconText"
                                  >
                                    <i className="bx bx-heart font-size-20 mr-1" />
                                    Liked
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#"
                                    className="alignIconText"
                                  >
                                    <i className="bx bx-save font-size-20 mr-1" />{" "}
                                    Saved
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#"
                                    className="alignIconText"
                                  >
                                    <i className="bx bx-at font-size-20 mr-1" />{" "}
                                    Mentioned
                                  </DropdownItem>
                                  <DropdownItem
                                    href="#"
                                    className="alignIconText"
                                  >
                                    <i className="bx bx-info-circle font-size-20 mr-1" />{" "}
                                    Helpdesk-guidelines
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                            <li className="list-inline-item  d-none d-sm-inline-block">
                              <Dropdown
                                isOpen={settings_Menu}
                                toggle={toggleSettings}
                              >
                                <DropdownToggle className="btn nav-btn" tag="i">
                                  <i className="bx bx-cog" />
                                </DropdownToggle>
                                <DropdownMenu right>
                                  <DropdownItem href="#" className="alignIconText">
                                  <i className="bx bxs-eraser font-size-20 mr-1" />{" "}
                                    Clear chat
                                  </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </li>
                          </ul>
                        </Col>
                      </Row>
                    </div>

                    <div>
                      <div className="chat-conversation p-3">
                        <ul className="list-unstyled">
                          <PerfectScrollbar
                            style={{ height: "410px" }}
                            containerRef={ref => setMessageBox(ref)}
                          >
                            <li>
                              <div className="chat-day-title">
                                <span className="title">Today</span>
                              </div>
                            </li>
                            {messages &&
                              map(messages, (message,index) => (
                                <li
                                  key={"test_k" + message.id}
                                  className={
                                    message.sender === currentUser.name
                                      ? "right"
                                      : ""
                                  }
                                >
                                  <div className="conversation-list" onMouseEnter={() => toggleMessageIcons(index,true)} onMouseLeave={() => toggleMessageIcons(index,false)}>
                                    {
                                      message.selected
                                        ? <UncontrolledDropdown>
                                            <div className={message.sender === currentUser.name ? "" : "position-absolute d-flex flex-row"}>
                                              <div className="p-1 btn nav-btn"><i className="bx bx-like" /></div>
                                              <div className="p-1 btn nav-btn"><i className="bx bxs-flag-checkered" /></div>
                                              <div className="p-1 btn nav-btn"><i className="bx bx-flag" /></div>
                                            </div>
                                            {/* <DropdownToggle
                                              href="#"
                                              className="p-1 btn nav-btn"
                                              tag="i"
                                            >
                                              <i className="bx bx-dots-vertical-rounded" />
                                            </DropdownToggle>
                                            <DropdownMenu direction="right">
                                              <DropdownItem href="#">
                                                Remove
                                              </DropdownItem>
                                              <DropdownItem href="#">
                                                Forward
                                              </DropdownItem>
                                            </DropdownMenu> */}
                                          </UncontrolledDropdown>
                                        : ""
                                    }
                                    <div className="ctext-wrap">
                                      <div className="conversation-name">
                                        {message.sender}
                                      </div>
                                      <p>{message.message}</p>
                                      <p className="chat-time mb-0">
                                        <i className="bx bx-time-five align-middle mr-1" />
                                        {moment(message.createdAt).format(
                                          "DD-MM-YY hh:mm"
                                        )}
                                      </p>
                                      <div style={{position: "absolute", right: -4, bottom: -8}} className="pl-2 pr-2 pt-1 bg-white rounded align-items-center"><i className="bx bxs-like bx-xsm text-primary mr-2" />1</div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                          </PerfectScrollbar>
                        </ul>
                      </div>
                      <div className="p-3 chat-input-section">
                        <Row>
                          <Col>
                            <div className="position-relative">
                              <input
                                type="text"
                                value={curMessage}
                                onKeyPress={onKeyPress}
                                onChange={e => setcurMessage(e.target.value)}
                                className="form-control chat-input"
                                placeholder="Enter Message..."
                              />
                              <div className="chat-input-links">
                                <ul className="list-inline mb-0">
                                  <li className="list-inline-item">
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-image-outline"
                                        id="Imagetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Imagetooltip"
                                      >
                                        Images
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                  <li className="list-inline-item">
                                    <Link to="#">
                                      <i
                                        className="mdi mdi-file-document-outline"
                                        id="Filetooltip"
                                      />
                                      <UncontrolledTooltip
                                        placement="top"
                                        target="Filetooltip"
                                      >
                                        Add Files
                                      </UncontrolledTooltip>
                                    </Link>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                          <Col className="col-auto">
                            <Button
                              type="button"
                              color="primary"
                              onClick={() =>
                                addMessage(currentRoomId, currentUser.name)
                              }
                              className="btn-rounded chat-send w-md waves-effect waves-light"
                            >
                              <span className="d-none d-sm-inline-block mr-2">
                                Send
                              </span>{" "}
                              <i className="mdi mdi-send" />
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

HelpDesk.propTypes = {
  chats: PropTypes.array,
  groups: PropTypes.array,
  contacts: PropTypes.array,
  messages: PropTypes.array,
  onGetChats: PropTypes.func,
  onGetGroups: PropTypes.func,
  onGetContacts: PropTypes.func,
  onGetMessages: PropTypes.func,
  onAddMessage: PropTypes.func
}

const mapStateToProps = ({ chat }) => ({
  chats: chat.chats,
  groups: chat.groups,
  contacts: chat.contacts,
  messages: chat.messages
})

const mapDispatchToProps = dispatch => ({
  onGetChats: () => dispatch(getChats()),
  onGetGroups: () => dispatch(getGroups()),
  onGetContacts: () => dispatch(getContacts()),
  onGetMessages: roomId => dispatch(getMessages(roomId)),
  onAddMessage: roomId => dispatch(addMessage(roomId))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HelpDesk)
