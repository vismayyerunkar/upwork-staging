import React, { useEffect, useRef, useState } from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link } from "react-router-dom"
import { filter, isEmpty, map } from "lodash"
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

import chat_data from "../../common/data/chat"
import chat from "../../common/data/chat"

import ImageModal from "./ImageModal"



const MessageActions = ({ message, onQuote, onDelete }) => {
  function copy(text) {
    var input = document.createElement('textarea');
    input.innerHTML = text;
    document.body.appendChild(input);
    input.select();
    var result = document.execCommand('copy');
    document.body.removeChild(input);
    return result;
  }

  return (
    <UncontrolledDropdown>
      <DropdownToggle
        href="#"
        className="btn nav-btn"
        tag="i"
      >
        <i className="bx bx-dots-vertical-rounded" />
      </DropdownToggle>
      <DropdownMenu direction="right">
        <DropdownItem onClick={() => copy(message.message)}>
          Copy
        </DropdownItem>
        <DropdownItem onClick={() => onQuote(message.message)}>
          Quote
        </DropdownItem>
        <DropdownItem onClick={() => onDelete(message.id)}>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}


const SelectionCheckBox = ({ chatId, selected, toggleSelection}) => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        id="customControlInline"
        checked={selected}
        onChange={() => {}}
      />
      <label
        className="custom-control-label"
        htmlFor="customControlInline"
        onClick={(e) => toggleSelection(e, chatId)}
      >
      </label>
    </div>
  )
}


const ActionDropDown = ({ 
  onMarkUnread,
  onMarkRead,
  onStar,
  onUnStar,
  onArchive,
  onUnArchive,
  onBlock,
  onUnBlock,
  onDelete,
  currentTab = 'all' 
}) => {
  const [open, setOpen] = useState(false)
  const isCurrentTabBlocked = currentTab === 'blocked'
  return (
    <ul className="list-inline user-chat-nav text-right mb-0">
      <li className="list-inline-item">
        <Dropdown
          isOpen={open}
          toggle={() => setOpen(!open)}
        >
          <DropdownToggle className="btn nav-btn" tag="i">
            <i className="bx bx-dots-horizontal-rounded" />
          </DropdownToggle>
          <DropdownMenu right>
            {
              !isCurrentTabBlocked
              ?
                <React.Fragment>
                  {
                    currentTab === 'unread' ? 
                      <DropdownItem onClick={onMarkRead}>Mark read</DropdownItem>
                    :
                      <DropdownItem onClick={onMarkUnread}>Mark unread</DropdownItem>
                  }
                  {
                    currentTab === 'starred' ? 
                      <DropdownItem onClick={onUnStar}>UnStar</DropdownItem>
                    :
                      <DropdownItem onClick={onStar}>Star</DropdownItem>
                  }
                  {
                    currentTab === 'archived' ? 
                      <DropdownItem onClick={onUnArchive}>UnArchive</DropdownItem>
                    :
                      <DropdownItem onClick={onArchive}>Archive</DropdownItem>
                  }
                </React.Fragment>
              : ''
            }
            <DropdownItem onClick={isCurrentTabBlocked ? onUnBlock : onBlock}>{isCurrentTabBlocked ? 'Unblock' : 'Block'}</DropdownItem>
            <DropdownItem onClick={onDelete}>Delete</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
  )
}

const SingleMessageActionDropdown = (
  { chat, 
    onMarkUnread, 
    onUnStar, 
    onStar, 
    onUnArchive, 
    onArchive, 
    onBlock, 
    onDelete 
  }) => {
  const [open, setOpen] = useState(false)
  return (
    <ul className="list-inline user-chat-nav text-right mb-0">
      <li className="list-inline-item">
        <Dropdown
          isOpen={open}
          toggle={() => setOpen(!open)}
        >
          <DropdownToggle className="btn nav-btn" tag="i">
            <i className="bx bx-dots-horizontal-rounded" />
          </DropdownToggle>
          <DropdownMenu right>
            {
              chat
              ?
                <React.Fragment>
                    <DropdownItem onClick={() => onMarkUnread(chat.id)}>Mark unread</DropdownItem>
                  {
                    chat.starred ? 
                      <DropdownItem onClick={() => onUnStar(chat.id)}>UnStar</DropdownItem>
                    :
                      <DropdownItem onClick={() => onStar(chat.id)}>Star</DropdownItem>
                  }
                  {
                    chat.archived ? 
                      <DropdownItem onClick={() => onUnArchive(chat.id)}>UnArchive</DropdownItem>
                    :
                      <DropdownItem onClick={() => onArchive(chat.id)}>Archive</DropdownItem>
                  }
                  <DropdownItem onClick={() => onBlock(chat.id)}>Block</DropdownItem>
                  <DropdownItem onClick={() => onDelete(chat.id)}>Delete</DropdownItem>
                </React.Fragment>
              : ''
            }
          </DropdownMenu>
        </Dropdown>
      </li>
    </ul>
  )
}

const MessageItem = ({ chat, currentRoomId, toggleSelection, chatMessages, userChatOpen, toggleStarred}) => {
  const unreadMessages = chatMessages.filter(message => message.readstatus === false)
  return (
    <li
      key={chat.id + chat.status}
      className={
      currentRoomId === chat.roomId
        ? "active"
          : unreadMessages.length === 0
              ? ""
              : "bg-light"
      }
    >
      <Link
        to="#"
        onClick={() => {
          userChatOpen(
            chat.id,
            chat.name,
            chat.status,
            chat.roomId
          )
        }}
      >
        <Media>
          <SelectionCheckBox chatId={chat.id} selected={chat.selected} toggleSelection={toggleSelection} />
          <div className="align-self-center mr-3">
            <i
              className={
                chat.starred
                ? "bx bxs-star text-warning font-size-15"
                : "bx bx-star text-secondary font-size-15"
              }
              onClick={() => toggleStarred(chat)} 
            />
          </div>
          <div className="align-self-center mr-3">
            <img
              src={images[chat.image]}
              className="rounded-circle avatar-xs"
              alt=""
            />
          </div>
          <Media className="overflow-hidden" body>
            <h5 className="text-truncate font-size-14 mb-1">
              {chat.name}
            </h5>
            <p className="text-truncate mb-0">
              {chat.description}
            </p>
          </Media>
          <div className="d-flex flex-column align-items-end">
            <div className="font-size-11">
              {chat.time}
            </div>
            {
              unreadMessages.length > 0 ? <span style={{width: 20}} class="mt-1 p-1 badge bg-secondary text-light">{unreadMessages.length}</span> : ""
            }
          </div>                                    
        </Media>
      </Link>
    </li>
  )
}

const TabItem = (
  { chats, 
    tabName, 
    onMarkRead, 
    onMarkUnread, 
    currentRoomId, 
    userChatOpen, 
    toggleSelection, 
    toggleStarred, 
    messages, 
    onStar, 
    onUnStar, 
    onArchive, 
    onUnArchive,
    onBlock,
    onUnBlock,
    onDelete
  }) => {
    const selectedItemLength = (chats.filter(chat => chat.selected) || []).length
  return (
    <div>
        <h5 className="font-size-14 mb-3 d-inline-block active-tab-header">{tabName}</h5>
        {
          selectedItemLength
          ?
            <div className="d-inline-block text-right actions-list">
              <ActionDropDown 
                currentTab={tabName.toLowerCase()} 
                onMarkRead={onMarkRead} 
                onMarkUnread={onMarkUnread} 
                onStar={onStar}
                onUnStar={onUnStar}
                onArchive={onArchive}
                onUnArchive={onUnArchive}
                onBlock={onBlock}
                onUnBlock={onUnBlock}
                onDelete={onDelete}
              />
            </div>
          : ''
        }
        <ul className="list-unstyled chat-list">
              <PerfectScrollbar style={{ height: "410px" }}>
                {map(chats, chat => (
                  <MessageItem 
                    key={chat.id}
                    chat={chat} 
                    currentRoomId={currentRoomId}
                    toggleSelection={toggleSelection}
                    chatMessages={messages.filter(m => m.roomId === chat.roomId)}
                    userChatOpen={userChatOpen}
                    toggleStarred={toggleStarred}
                  />
                ))}
              </PerfectScrollbar>
        </ul>
    </div>
  )
}

const Chat = props => {

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
  const [quoteText, setQuoteText] = useState('')

  const imageInput = useRef(null)

  const filterchat = value => {
    let newchats = chats.filter(chat => chat.name.toLowerCase().includes(value.toLowerCase()));
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

  const toggleSelection = (e, id) => {
    e.stopPropagation();
    let newchats = curFilter.map(chat => {
      if (chat.id === id) {
        return {...chat, selected: !chat.selected }
      } else {
        return chat
      }
    });
    setCurFilter(newchats);
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

  const onMarkUnread = ( id ) => {
    let selectedChats = curFilter
    if ( id ) {
      selectedChats = curFilter.filter(chat => chat.id === id)
    } else {
      selectedChats = curFilter.filter(chat => chat.selected)
    }
    messages.map(m => {
      const chat = selectedChats.find(chat => chat.roomId === m.roomId)
      if (chat) {
        m.readstatus = false
      }
      return { ...m }
    })
    unSelectAll()
    setMessages(messages)
  }

  const onMarkRead = () => {
    const selectedChats = curFilter.filter(chat => chat.selected)
    messages.map(m => {
      const chats = selectedChats.filter(chat => chat.roomId === m.roomId)
      if (chats.length) {
        m.readstatus = true
      }
      return { ...m }
    })
    unSelectAll()
    setMessages(messages)
  }

  const onMarkStar = ( id ) => {
    const newChats = curFilter.map(chat => {
      if (id && chat.id === id) {
        chat.starred = true
      } else if (chat.selected) {
        chat.starred = true
        chat.selected = false
      }
      return { ...chat }
    })
    
    setCurFilter(newChats)
  }

  const onMarkUnStar = ( id ) => {
    const newChats = curFilter.map(chat => {
      if (id && chat.id === id) {
        chat.starred = false
      } else if (chat.selected) {
        chat.starred = false
        chat.selected = false
      }
      return { ...chat }
    })
    setCurFilter(newChats)
  }

  const onMarkArchive = ( id ) => {
    const newChats = curFilter.map(chat => {
      if (id && chat.id === id) {
        chat.archived = true
      } else if (chat.selected) {
        chat.archived = true
        chat.selected = false
      }
      return { ...chat }
    })
    
    setCurFilter(newChats)
  }

  const onMarkUnArchive = ( id ) => {
    const newChats = curFilter.map(chat => {
      if (id && chat.id === id) {
        chat.archived = false
      } else if (chat.selected) {
        chat.archived = false
        chat.selected = false
      }
      return { ...chat }
    })
    setCurFilter(newChats)
  }

  const onMarkBlock = ( id ) => {
    const newChats = curFilter.map(chat => {
      if (id && chat.id === id) {
        chat.blocked = true
      } else if (chat.selected) {
        chat.blocked = true
        chat.selected = false
      }
      return { ...chat }
    })
    
    setCurFilter(newChats)
  }

  const onMarkUnBlock = ( ) => {
    const newChats = curFilter.map(chat => {
      if (chat.selected) {
        chat.blocked = false
        chat.selected = false
      }
      return { ...chat }
    })
    setCurFilter(newChats)
  }

  const onDelete = (id) => {
    let newChats = curFilter
    if (id) {
      newChats = curFilter.filter(chat => chat.id !== id)
    } else { 
      newChats = curFilter.filter(chat => !chat.selected)
  }
    setCurFilter(newChats)
    if ( id ) {
      const nextChat = newChats [0] || {}
      userChatOpen(nextChat.id, nextChat.name, nextChat.status, nextChat.roomId)
    }
  }
  

  const unSelectAll = () => {
    let newchats = curFilter.map(chat => {
        return {...chat, selected: false }
    });
    setCurFilter(newchats);
  }

  const deleteMessage = (id) => {
    const newMessages = currentmessages.filter(m => m.id !== id)
    setCurrentmessages(newMessages)
  }

  const quoteMessage = (message) => {
    setQuoteText(message)
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

  const addMessage = (roomId, sender, image) => {
    if (curMessage !== "" || image) {
      let newmessages = [...messages];
      newmessages.push({
        id: newmessages.length + 1,
        roomId: roomId,
        sender: sender,
        message: image || curMessage,
        readstatus: true,
        createdAt: "2020-04-02T17:00:21.529Z",
        quoteMessage: quoteText,
        isImage: !!image
      })
      let newcurrentmessages = newmessages.filter(message => message.roomId === currentRoomId);
      setMessages(newmessages);
      setCurrentmessages(newcurrentmessages);
      setcurMessage("");
      setQuoteText("")
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
          quoteMessage: quoteText
        })
        let newcurrentmessages = newmessages.filter(message => message.roomId === currentRoomId);
        setMessages(newmessages);
        setCurrentmessages(newcurrentmessages);
        setcurMessage("");
        setQuoteText("")
      }
    }
  }

  const onImageClick = () => {
    imageInput.current.click()
  }

  const imageChange = (e) => {
    console.log(e)
    const file = e.target.files[0]
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      // set New Message here with image URL
      addMessage(currentRoomId, currentUser.name, event.target.result)
      scrollToBottom()
      e.target.value = ''
    });
    reader.readAsDataURL(file);
  }

  const showImage = (id) => {
    const newMessages = messages.map(m => {
      if (m.id === id) {
        return { ...m, showImage: true }
      } 
      return { ...m, showImage: false }
    })
    let newcurrentmessages = newMessages.filter(message => message.roomId === currentRoomId);
    setMessages(newMessages);
    setCurrentmessages(newcurrentmessages);
    setcurMessage("");
  }

  useEffect(() => {
    let newcurrentmessages = messages.filter(message => message.roomId === currentRoomId);
    let newChat_Box_Username = chats.filter(chat => chat.roomId === currentRoomId)[0].name;
    let newChat_Box_User_Status = chats.filter(chat => chat.roomId === currentRoomId)[0].status;
    let newmessages = [];
    messages.forEach(message => {
      if (message.roomId === currentRoomId) {
        message.readstatus = true;
      }
      newmessages.push(message);  
    })
    setCurrentmessages(newcurrentmessages);
    setChat_Box_Username(newChat_Box_Username);
    setChat_Box_User_Status(newChat_Box_User_Status);
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
  },[messages])

  const blockedChats = curFilter.filter(chat => chat.blocked === true)
  const blockedNames = blockedChats.map(chat => chat.name)
  const uniqueNames = blockedNames.filter((name, index, arr) => arr.indexOf(name) === index)
  const uniqueBlockedList = uniqueNames.map(name => {
    const blockedChat = blockedChats.find(c => c.name === name)
    return blockedChat
  })

  return (
      <React.Fragment>
        <div className="page-content">
          <Container fluid>
            {/* Render Breadcrumb */}
            <Breadcrumbs title="Skote" breadcrumbItem="Inbox" />
  
            <Row>
              <Col lg="12">
                <div className="d-lg-flex">
                  <div className="chat-leftsidebar mr-lg-4">
                    <div className="">
                      <div className="py-4 border-bottom">
                        <Media>
                          <div className="align-self-center mr-3">
                            <img
                              src={images.avatar1}
                              className="avatar-xs rounded-circle"
                              alt=""
                            />
                          </div>
                          <Media body>
                            <h5 className="font-size-15 mt-0 mb-1">
                              {currentUser.name}
                            </h5>
                            <p className="text-muted mb-0">
                              <i className="mdi mdi-circle text-success align-middle mr-1" />
                              Active
                            </p>
                          </Media>
                        </Media>
                      </div>
  
                      <div className="search-box chat-search-box py-4">
                        <div className="position-relative">
                          <Input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                            onChange={e => filterchat(e.target.value)}
                          />
                          <i className="bx bx-search-alt search-icon" />
                        </div>
                      </div>
  
                      <div className="chat-leftsidebar-nav">
                        <Nav pills justified>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "1"
                              })}
                              onClick={() => {
                                toggleTab("1")
                              }}
                            >
                              <i className="bx bx-chat font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">All</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "2"
                              })}
                              onClick={() => {
                                toggleTab("2")
                              }}
                            >
                              <i className="bx bx-group font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Unread</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "3"
                              })}
                              onClick={() => {
                                toggleTab("3")
                              }}
                            >
                              <i className="bx bx-book-content font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Starred</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "4"
                              })}
                              onClick={() => {
                                toggleTab("4")
                              }}
                            >
                              <i className="bx bx-book-content font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Archived</span>
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              className={classnames({
                                active: activeTab === "5"
                              })}
                              onClick={() => {
                                toggleTab("5")
                              }}
                            >
                              <i className="bx bx-book-content font-size-20 d-sm-none" />
                              <span className="d-none d-sm-block">Blocked</span>
                            </NavLink>
                          </NavItem>
                        </Nav>
                        <TabContent activeTab={activeTab} className="py-4">
                          {
                            ["All", "Unread", "Starred", "Archived"].map((type, index) => {
                              const tabId = index + 1
                              let chats = curFilter
                              if (type === "Unread") {
                                chats = curFilter.filter(chat => checkUnreadMessages(chat) > 0)
                              } else if (type === "Starred") {
                                chats = curFilter.filter(chat => chat.starred)
                              } else if (type === "Archived") {
                                chats = curFilter.filter(chat => chat.archived)
                              }
                              return (
                               <TabPane tabId={tabId.toString()} key={`tab-${tabId}`}>
                                <TabItem 
                                  chats={chats}
                                  tabName={type}
                                  onMarkRead={onMarkRead}
                                  onMarkUnread={onMarkUnread}
                                  currentRoomId={currentRoomId}
                                  userChatOpen={userChatOpen}
                                  toggleSelection={toggleSelection}
                                  toggleStarred={toggleStarred}
                                  messages={messages}
                                  onStar={onMarkStar}
                                  onUnStar={onMarkUnStar}
                                  onArchive={onMarkArchive}
                                  onUnArchive={onMarkUnArchive}
                                  onBlock={onMarkBlock}
                                  onUnBlock={onMarkUnBlock}
                                  onDelete={onDelete}
                                />
                              </TabPane>
                              )
                            })
                          }
                          <TabPane tabId="5">
                            <h5 className="font-size-14 mb-3 d-inline-block active-tab-header">Blocked</h5>
                            <div className="d-inline-block text-right actions-list">
                                <ActionDropDown currentTab="blocked" onUnBlock={onMarkUnBlock} onDelete={onDelete}/>
                            </div>
                            <ul className="list-unstyled chat-list">
                              <PerfectScrollbar style={{ height: "410px" }}>
                                {uniqueBlockedList
                                  .map((chat, index) => (
                                    <li
                                      key={`blocked-${index}`}
                                      className="active"
                                    >
                                      <Link
                                        to="#"
                                      >
                                        <Media>
                                          <SelectionCheckBox chatId={chat.id} selected={chat.selected} toggleSelection={toggleSelection} />
                                          <div className="align-self-center mr-3">
                                            <img
                                              src={images[chat.image]}
                                              className="rounded-circle avatar-xs"
                                              alt=""
                                            />
                                          </div>
  
                                          <Media className="overflow-hidden" body>
                                            <h5 className="text-truncate font-size-14 mb-1">
                                              {chat.name}
                                            </h5>
                                          </Media>
                                        </Media>
                                      </Link>
                                    </li>
                                  ))}
                              </PerfectScrollbar>
                            </ul>
                          </TabPane>
                        </TabContent>
                      </div>
                    </div>
                  </div>
                  <div className="w-100 user-chat">
                    <Card>
                      <div className="p-4 border-bottom ">
                        <Row>
                          <Col md="4" xs="9">
                            <h5 className="font-size-15 mb-1">
                              {Chat_Box_Username}
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
                            <SingleMessageActionDropdown 
                              chat={curFilter.find(chat => chat.roomId === currentRoomId)}
                              onMarkUnread={onMarkUnread}
                              onArchive={onMarkArchive}
                              onUnArchive={onMarkUnArchive}
                              onBlock={onMarkBlock}
                              onStar={onMarkStar}
                              onUnStar={onMarkUnStar}
                              onDelete={onDelete}
                            />
                            {/* <ul className="list-inline user-chat-nav text-right mb-0">
                              <li className="list-inline-item">
                                <Dropdown
                                  isOpen={other_Menu}
                                  toggle={toggleOther}
                                >
                                  <DropdownToggle className="btn nav-btn" tag="i">
                                    <i className="bx bx-dots-horizontal-rounded" />
                                  </DropdownToggle>
                                  <DropdownMenu right>
                                    <DropdownItem href="#" onClick={() => archiveChat()}>{
                                      chats.filter(chat => chat.roomId === currentRoomId)[0].archived
                                        ? "Unarchive"
                                        : "Archive"
                                    }</DropdownItem>
                                  </DropdownMenu>
                                </Dropdown>
                              </li>
                            </ul> */}
                          </Col>
                        </Row>
                      </div>
  
                      <div>
                        <div className="chat-conversation p-3">
                          <ul className="list-unstyled">
                            <PerfectScrollbar
                              style={{ height: "470px" }}
                              containerRef={ref => setMessageBox(ref)}
                            >
                              <li>
                                <div className="chat-day-title">
                                  <span className="title">Today</span>
                                </div>
                              </li>
                              {currentmessages &&
                                map(currentmessages, message => (
                                  <li
                                    key={"test_k" + message.id}
                                    className={
                                      message.sender === currentUser.name
                                        ? "right"
                                        : ""
                                    }
                                  >
                                    <div className="conversation-list">
                                      <MessageActions message={message} onDelete={deleteMessage} onQuote={quoteMessage}/>
                                      <div className="ctext-wrap">
                                        <div className="conversation-name">
                                          {message.sender}
                                        </div>
                                        {
                                          message.isImage
                                          ?
                                          <>
                                            <img src={message.message} className="message-image cursor-pointer" onClick={() => showImage(message.id)}/>
                                            {
                                              message.showImage ?
                                                <ImageModal src={message.message} />
                                              : ''
                                            }
                                          </>
                                          :
                                            <p>{message.message}</p>
                                        }
                                        {
                                          message.quoteMessage ?
                                          <span>
                                            <span className="d-block">
                                              ------------------------
                                            </span>
                                            <p>{message.quoteMessage}</p>
                                          </span>
                                          : ''
                                        }
                                        <p className="chat-time mb-0">
                                          <i className="bx bx-time-five align-middle mr-1" />
                                          {moment(message.createdAt).format(
                                            "DD-MM-YY hh:mm"
                                          )}
                                        </p>
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
                                  onKeyPress={e => onKeyPress(e)}
                                  onChange={e => setcurMessage(e.target.value)}
                                  className="form-control chat-input"
                                  placeholder="Enter Message..."
                                  style={{ height: quoteText ? '110px' : '40px'}}
                                />
                                {
                                  quoteText &&
                                  <span className="quoted-text">
                                    ------------------
                                    <span className="d-block">{quoteText} </span>
                                  </span>
                                }
                                <div className="chat-input-links">
                                  <ul className="list-inline mb-0">
                                    <li className="list-inline-item">
                                      <input 
                                        ref={imageInput} 
                                        type="file" 
                                        id="selectedImage"  
                                        className="d-none" 
                                        accept="image/*"
                                        onChange={imageChange}
                                      />
                                      <Link onClick={onImageClick}>
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

  // // const { chats, groups, contacts, messages } = props
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

  // // useEffect(() => {
  // //   const { onGetChats, onGetGroups, onGetContacts, onGetMessages } = props
  // //   onGetChats()
  // //   onGetGroups()
  // //   onGetContacts()
  // //   onGetMessages(currentRoomId)
  // // }, [props, currentRoomId])

  // // useEffect(() => {
  // //   if (!isEmpty(messages)) scrollToBottom()
  // // }, [props, messages])

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

  // return (
  //   <React.Fragment>
  //     <div className="page-content">
  //       <Container fluid>
  //         {/* Render Breadcrumb */}
  //         <Breadcrumbs title="Skote" breadcrumbItem="Inbox" />

  //         <Row>
  //           <Col lg="12">
  //             <div className="d-lg-flex">
  //               <div className="chat-leftsidebar mr-lg-4">
  //                 <div className="">
  //                   <div className="py-4 border-bottom">
  //                     <Media>
  //                       <div className="align-self-center mr-3">
  //                         <img
  //                           src={images.avatar1}
  //                           className="avatar-xs rounded-circle"
  //                           alt=""
  //                         />
  //                       </div>
  //                       <Media body>
  //                         <h5 className="font-size-15 mt-0 mb-1">
  //                           {currentUser.name}
  //                         </h5>
  //                         <p className="text-muted mb-0">
  //                           <i className="mdi mdi-circle text-success align-middle mr-1" />
  //                           Active
  //                         </p>
  //                       </Media>

  //                       <div>
  //                         <Dropdown
  //                           isOpen={notification_Menu}
  //                           toggle={toggleNotification}
  //                           className="chat-noti-dropdown active"
  //                         >
  //                           <DropdownToggle className="btn" tag="i">
  //                             <i className="bx bx-bell bx-tada" />
  //                           </DropdownToggle>
  //                           <DropdownMenu right>
  //                             <DropdownItem href="#">Action</DropdownItem>
  //                             <DropdownItem href="#">
  //                               Another action
  //                             </DropdownItem>
  //                             <DropdownItem href="#">
  //                               Something else here
  //                             </DropdownItem>
  //                           </DropdownMenu>
  //                         </Dropdown>
  //                       </div>
  //                     </Media>
  //                   </div>

  //                   <div className="search-box chat-search-box py-4">
  //                     <div className="position-relative">
  //                       <Input
  //                         type="text"
  //                         className="form-control"
  //                         placeholder="Search..."
  //                       />
  //                       <i className="bx bx-search-alt search-icon" />
  //                     </div>
  //                   </div>

  //                   <div className="chat-leftsidebar-nav">
  //                     <Nav pills justified>
  //                       <NavItem>
  //                         <NavLink
  //                           className={classnames({
  //                             active: activeTab === "1"
  //                           })}
  //                           onClick={() => {
  //                             toggleTab("1")
  //                           }}
  //                         >
  //                           <i className="bx bx-chat font-size-20 d-sm-none" />
  //                           <span className="d-none d-sm-block">All</span>
  //                         </NavLink>
  //                       </NavItem>
  //                       <NavItem>
  //                         <NavLink
  //                           className={classnames({
  //                             active: activeTab === "2"
  //                           })}
  //                           onClick={() => {
  //                             toggleTab("2")
  //                           }}
  //                         >
  //                           <i className="bx bx-group font-size-20 d-sm-none" />
  //                           <span className="d-none d-sm-block">Unread</span>
  //                         </NavLink>
  //                       </NavItem>
  //                       <NavItem>
  //                         <NavLink
  //                           className={classnames({
  //                             active: activeTab === "3"
  //                           })}
  //                           onClick={() => {
  //                             toggleTab("3")
  //                           }}
  //                         >
  //                           <i className="bx bx-book-content font-size-20 d-sm-none" />
  //                           <span className="d-none d-sm-block">Starred</span>
  //                         </NavLink>
  //                       </NavItem>
  //                       <NavItem>
  //                         <NavLink
  //                           className={classnames({
  //                             active: activeTab === "4"
  //                           })}
  //                           onClick={() => {
  //                             toggleTab("4")
  //                           }}
  //                         >
  //                           <i className="bx bx-book-content font-size-20 d-sm-none" />
  //                           <span className="d-none d-sm-block">Archived</span>
  //                         </NavLink>
  //                       </NavItem>
  //                     </Nav>
  //                     <TabContent activeTab={activeTab} className="py-4">
  //                       <TabPane tabId="1">
  //                         <div>
  //                           <h5 className="font-size-14 mb-3">All</h5>
  //                           <ul className="list-unstyled chat-list">
  //                             <PerfectScrollbar style={{ height: "410px" }}>
  //                               {map(chats, chat => (
  //                                 <li
  //                                   key={chat.id + chat.status}
  //                                   className={
  //                                     currentRoomId === chat.roomId
  //                                       ? "active"
  //                                       : ""
  //                                   }
  //                                 >
  //                                   <Link
  //                                     to="#"
  //                                     onClick={() => {
  //                                       userChatOpen(
  //                                         chat.id,
  //                                         chat.name,
  //                                         chat.status,
  //                                         chat.roomId
  //                                       )
  //                                     }}
  //                                   >
  //                                     <Media>
  //                                       <div className="align-self-center mr-3">
  //                                         <i
  //                                           className={
  //                                             chat.status === "online"
  //                                               ? "mdi mdi-circle text-success font-size-10"
  //                                               : chat.status === "intermediate"
  //                                               ? "mdi mdi-circle text-warning font-size-10"
  //                                               : "mdi mdi-circle font-size-10"
  //                                           }
  //                                         />
  //                                       </div>
  //                                       <div className="align-self-center mr-3">
  //                                         <img
  //                                           src={images[chat.image]}
  //                                           className="rounded-circle avatar-xs"
  //                                           alt=""
  //                                         />
  //                                       </div>

  //                                       <Media className="overflow-hidden" body>
  //                                         <h5 className="text-truncate font-size-14 mb-1">
  //                                           {chat.name}
  //                                         </h5>
  //                                         <p className="text-truncate mb-0">
  //                                           {chat.description}
  //                                         </p>
  //                                       </Media>
  //                                       <div className="font-size-11">
  //                                         {chat.time}
  //                                       </div>
  //                                     </Media>
  //                                   </Link>
  //                                 </li>
  //                               ))}
  //                             </PerfectScrollbar>
  //                           </ul>
  //                         </div>
  //                       </TabPane>

  //                       <TabPane tabId="2">
  //                         <h5 className="font-size-14 mb-3">Unread</h5>
  //                         <ul className="list-unstyled chat-list">
  //                           <PerfectScrollbar style={{ height: "410px" }}>
  //                             {groups &&
  //                               groups.map(group => (
  //                                 <li key={"test" + group.image}>
  //                                   <Link
  //                                     to="#"
  //                                     onClick={() => {
  //                                       userChatOpen(
  //                                         group.id,
  //                                         group.name,
  //                                         group.status,
  //                                         Math.floor(Math.random() * 100)
  //                                       )
  //                                     }}
  //                                   >
  //                                     <Media className="align-items-center">
  //                                       <div className="avatar-xs mr-3">
  //                                         <span className="avatar-title rounded-circle bg-soft-primary text-primary">
  //                                           {group.image}
  //                                         </span>
  //                                       </div>

  //                                       <Media body>
  //                                         <h5 className="font-size-14 mb-0">
  //                                           {group.name}
  //                                         </h5>
  //                                       </Media>
  //                                     </Media>
  //                                   </Link>
  //                                 </li>
  //                               ))}
  //                           </PerfectScrollbar>
  //                         </ul>
  //                       </TabPane>

  //                       <TabPane tabId="3">
  //                         <h5 className="font-size-14 mb-3">Starred</h5>

  //                         <div>
  //                           <PerfectScrollbar style={{ height: "410px" }}>
  //                             {contacts &&
  //                               contacts.map(contact => (
  //                                 <div
  //                                   key={"test_" + contact.category}
  //                                   className={
  //                                     contact.category === "A" ? "" : "mt-4"
  //                                   }
  //                                 >
  //                                   <div className="avatar-xs mb-3">
  //                                     <span className="avatar-title rounded-circle bg-soft-primary text-primary">
  //                                       {contact.category}
  //                                     </span>
  //                                   </div>

  //                                   <ul className="list-unstyled chat-list">
  //                                     {contact.child.map(array => (
  //                                       <li key={"test" + array.id}>
  //                                         <Link
  //                                           to="#"
  //                                           onClick={() => {
  //                                             userChatOpen(
  //                                               array.id,
  //                                               array.name,
  //                                               array.status,
  //                                               Math.floor(Math.random() * 100)
  //                                             )
  //                                           }}
  //                                         >
  //                                           <h5 className="font-size-14 mb-0">
  //                                             {array.name}
  //                                           </h5>
  //                                         </Link>
  //                                       </li>
  //                                     ))}
  //                                   </ul>
  //                                 </div>
  //                               ))}
  //                           </PerfectScrollbar>
  //                         </div>
  //                       </TabPane>

  //                       <TabPane tabId="4">
  //                         <h5 className="font-size-14 mb-3">Archived</h5>
  //                         <ul className="list-unstyled chat-list">
  //                           <PerfectScrollbar style={{ height: "350px" }}>
  //                             {groups &&
  //                               groups.map(group => (
  //                                 <li key={"test" + group.image}>
  //                                   <Link
  //                                     to="#"
  //                                     onClick={() => {
  //                                       userChatOpen(
  //                                         group.id,
  //                                         group.name,
  //                                         group.status,
  //                                         Math.floor(Math.random() * 100)
  //                                       )
  //                                     }}
  //                                   >
  //                                     <Media className="align-items-center">
  //                                       <div className="avatar-xs mr-3">
  //                                         <span className="avatar-title rounded-circle bg-soft-primary text-primary">
  //                                           {group.image}
  //                                         </span>
  //                                       </div>

  //                                       <Media body>
  //                                         <h5 className="font-size-14 mb-0">
  //                                           {group.name}
  //                                         </h5>
  //                                       </Media>
  //                                     </Media>
  //                                   </Link>
  //                                 </li>
  //                               ))}
  //                           </PerfectScrollbar>
  //                         </ul>
  //                       </TabPane>
  //                     </TabContent>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="w-100 user-chat">
  //                 <Card>
  //                   <div className="p-4 border-bottom ">
  //                     <Row>
  //                       <Col md="4" xs="9">
  //                         <h5 className="font-size-15 mb-1">
  //                           {Chat_Box_Username}
  //                         </h5>

  //                         <p className="text-muted mb-0">
  //                           <i
  //                             className={
  //                               Chat_Box_User_Status === "online"
  //                                 ? "mdi mdi-circle text-success align-middle mr-1"
  //                                 : Chat_Box_User_Status === "intermediate"
  //                                 ? "mdi mdi-circle text-warning align-middle mr-1"
  //                                 : "mdi mdi-circle align-middle mr-1"
  //                             }
  //                           />
  //                           {Chat_Box_User_Status}
  //                         </p>
  //                       </Col>
  //                       <Col md="8" xs="3">
  //                         <ul className="list-inline user-chat-nav text-right mb-0">
  //                           <li className="list-inline-item d-none d-sm-inline-block">
  //                             <Dropdown
  //                               isOpen={search_Menu}
  //                               toggle={toggleSearch}
  //                             >
  //                               <DropdownToggle className="btn nav-btn" tag="i">
  //                                 <i className="bx bx-search-alt-2" />
  //                               </DropdownToggle>
  //                               <DropdownMenu
  //                                 className="dropdown-menu-md"
  //                                 right
  //                               >
  //                                 <Form className="p-3">
  //                                   <FormGroup className="m-0">
  //                                     <InputGroup>
  //                                       <Input
  //                                         type="text"
  //                                         className="form-control"
  //                                         placeholder="Search ..."
  //                                         aria-label="Recipient's username"
  //                                       />
  //                                       <InputGroupAddon addonType="append">
  //                                         <Button color="primary" type="submit">
  //                                           <i className="mdi mdi-magnify" />
  //                                         </Button>
  //                                       </InputGroupAddon>
  //                                     </InputGroup>
  //                                   </FormGroup>
  //                                 </Form>
  //                               </DropdownMenu>
  //                             </Dropdown>
  //                           </li>
  //                         </ul>
  //                       </Col>
  //                     </Row>
  //                   </div>

  //                   <div>
  //                     <div className="chat-conversation p-3">
  //                       <ul className="list-unstyled">
  //                         <PerfectScrollbar
  //                           style={{ height: "470px" }}
  //                           containerRef={ref => setMessageBox(ref)}
  //                         >
  //                           <li>
  //                             <div className="chat-day-title">
  //                               <span className="title">Today</span>
  //                             </div>
  //                           </li>
  //                           {messages &&
  //                             map(messages, message => (
  //                               <li
  //                                 key={"test_k" + message.id}
  //                                 className={
  //                                   message.sender === currentUser.name
  //                                     ? "right"
  //                                     : ""
  //                                 }
  //                               >
  //                                 <div className="conversation-list">
  //                                   <UncontrolledDropdown>
  //                                     <DropdownToggle
  //                                       href="#"
  //                                       className="btn nav-btn"
  //                                       tag="i"
  //                                     >
  //                                       <i className="bx bx-dots-vertical-rounded" />
  //                                     </DropdownToggle>
  //                                     <DropdownMenu direction="right">
  //                                       <DropdownItem href="#">
  //                                         Copy
  //                                       </DropdownItem>
  //                                       <DropdownItem href="#">
  //                                         Save
  //                                       </DropdownItem>
  //                                       <DropdownItem href="#">
  //                                         Forward
  //                                       </DropdownItem>
  //                                       <DropdownItem href="#">
  //                                         Delete
  //                                       </DropdownItem>
  //                                     </DropdownMenu>
  //                                   </UncontrolledDropdown>
  //                                   <div className="ctext-wrap">
  //                                     <div className="conversation-name">
  //                                       {message.sender}
  //                                     </div>
  //                                     <p>{message.message}</p>
  //                                     <p className="chat-time mb-0">
  //                                       <i className="bx bx-time-five align-middle mr-1" />
  //                                       {moment(message.createdAt).format(
  //                                         "DD-MM-YY hh:mm"
  //                                       )}
  //                                     </p>
  //                                   </div>
  //                                 </div>
  //                               </li>
  //                             ))}
  //                         </PerfectScrollbar>
  //                       </ul>
  //                     </div>
  //                     <div className="p-3 chat-input-section">
  //                       <Row>
  //                         <Col>
  //                           <div className="position-relative">
  //                             <input
  //                               type="text"
  //                               value={curMessage}
  //                               onKeyPress={onKeyPress}
  //                               onChange={e => setcurMessage(e.target.value)}
  //                               className="form-control chat-input"
  //                               placeholder="Enter Message..."
  //                             />
  //                             <div className="chat-input-links">
  //                               <ul className="list-inline mb-0">
  //                                 <li className="list-inline-item">
  //                                   <Link to="#">
  //                                     <i
  //                                       className="mdi mdi-file-image-outline"
  //                                       id="Imagetooltip"
  //                                     />
  //                                     <UncontrolledTooltip
  //                                       placement="top"
  //                                       target="Imagetooltip"
  //                                     >
  //                                       Images
  //                                     </UncontrolledTooltip>
  //                                   </Link>
  //                                 </li>
  //                                 <li className="list-inline-item">
  //                                   <Link to="#">
  //                                     <i
  //                                       className="mdi mdi-file-document-outline"
  //                                       id="Filetooltip"
  //                                     />
  //                                     <UncontrolledTooltip
  //                                       placement="top"
  //                                       target="Filetooltip"
  //                                     >
  //                                       Add Files
  //                                     </UncontrolledTooltip>
  //                                   </Link>
  //                                 </li>
  //                               </ul>
  //                             </div>
  //                           </div>
  //                         </Col>
  //                         <Col className="col-auto">
  //                           <Button
  //                             type="button"
  //                             color="primary"
  //                             onClick={() =>
  //                               addMessage(currentRoomId, currentUser.name)
  //                             }
  //                             className="btn-rounded chat-send w-md waves-effect waves-light"
  //                           >
  //                             <span className="d-none d-sm-inline-block mr-2">
  //                               Send
  //                             </span>{" "}
  //                             <i className="mdi mdi-send" />
  //                           </Button>
  //                         </Col>
  //                       </Row>
  //                     </div>
  //                   </div>
  //                 </Card>
  //               </div>
  //             </div>
  //           </Col>
  //         </Row>
  //       </Container>
  //     </div>
  //   </React.Fragment>
  // )
}

Chat.propTypes = {
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
)(Chat)
