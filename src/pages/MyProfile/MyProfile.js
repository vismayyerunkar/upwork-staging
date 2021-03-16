import React, {useState} from "react";
import { Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Media, 
  TabContent,
  TabPane,
  Col,
  Row} from "reactstrap"
import { Link } from "react-router-dom"
import Breadcrumbs from "../../components/Common/Breadcrumb"
import ProfileDetails from './Profile Details/ProfileDetailsPage'
import PhoneNumber from './Phone Number/PhoneNumber'
import RecurringPayment from './Recurring Payment/RecurringPayment'
import KycApplication from './KYC/KycApplication'
// import Kyc from './KYC/Kyc'
import MyUploads from './My Uploads/MyUploads'
import ChangeEmail from './Change Email/ChangeEmail'
import {
  Card,
  CardBody,
  Collapse,
  DropdownMenu,
  DropdownToggle,
  UncontrolledAlert,
  UncontrolledDropdown,
} from "reactstrap"


const MyProfile= props =>{

      const [activeTab,setActiveTab] = useState("Profile Details");

      const toggleTab = tab => {
        if (activeTab !== tab) {
        setActiveTab(tab)
            }
        }

    const [isOpen, setIsOpen] = useState(true)

    const toggle = () => setIsOpen(!isOpen)

    return (
      <React.Fragment>

      
        <div className="page-content">

        <Container fluid>
          <Breadcrumbs title="Settings" breadcrumbItem="My Profile" />
          <Row>
          <Col lg="3">

          <Card>
          <CardBody style={{height:'70vh'}}>
            
              <div className="mail-list rounded bg-white">
                <Link
                  onClick={() =>  toggleTab("Profile Details")}
                  className={activeTab == "Profile Details" ? "active activebbg" : "myProfile-leftBar"}
                >
                   <i
                    style={{ paddingRight: "15px", fontSize:'20px',allignItems:"center",marginTop:"20px" }}
                    className="mdi mdi-badge-account-horizontal-outline"
                  ></i>
                  Profile details
                </Link>
                
                <Link
                  onClick={() =>  toggleTab("KYC")}
                 
                  className={activeTab == "KYC" ? "active activebbg" : "myProfile-leftBar"}
                >
                 <i
                    style={{ paddingRight: "15px", fontSize:'20px',allignItems:"center" }}
                    className="mdi mdi-home-search-outline"
                  ></i>
                  KYC
                </Link>
                <Link
                  onClick={() =>  toggleTab("Phone Numbers")}
                  className={activeTab == "Phone Numbers" ? "active activebbg" : "myProfile-leftBar"}
                >
                  <i
                    style={{ paddingRight: "15px", fontSize:'20px',allignItems:"center" }}
                    className="mdi mdi-cellphone-iphone"
                  ></i>
                  Phone numbers
                </Link>
                <Link
                  onClick={() =>  toggleTab("Change Email")}
                  className={activeTab == "Change Email" ? "active activebbg" : "myProfile-leftBar"}
                >
                  <i
                    style={{ paddingRight: "15px", fontSize:'20px',allignItems:"center myProfile-leftBar" }}
                    className="mdi mdi-email-edit"
                  ></i>
                  Change email
                </Link>
                <Link
                  onClick={() =>  toggleTab("Recurring Payment")}
                  className={activeTab == "Recurring Payment" ? "active activebbg" : "myProfile-leftBar"}
                >
                  <i
                    style={{ paddingRight: "15px", fontSize:'20px',allignItems:"center" }}
                    className="mb-4 mdi mdi-bank-plus"
                  ></i>
                  Recurring Payment
                </Link>
                <Link
                  onClick={() =>  toggleTab("My Upload")}
                  className={activeTab == "My Upload" ? "active activebbg" : "myProfile-leftBar"}
                >
                  <i
                    style={{ paddingRight: "15px", fontSize:'20px',allignItems:"center" }}
                    className="mdi mdi-arrow-up-bold-box"
                  ></i>
                  My Upload
                </Link>
                
              </div>
            </CardBody>
            </Card>
            </Col>

             <Col lg="9">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="Profile Details">
                  <ProfileDetails/>
                </TabPane>
                <TabPane tabId="KYC">
                  <KycApplication/>

                </TabPane>
                <TabPane tabId="Phone Numbers">
                  <PhoneNumber/>
                </TabPane>
                <TabPane tabId="Change Email">
                  <ChangeEmail/>

                </TabPane>
                <TabPane tabId="Recurring Payment">
                  <RecurringPayment/>

                </TabPane>
                <TabPane tabId="My Upload">
                  <MyUploads/>

                </TabPane>
                

              </TabContent>
            </Col>
            </Row>
        </Container>

        </div>

        </React.Fragment>
    )
}

export default MyProfile

