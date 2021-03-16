
import PropTypes from 'prop-types'
// import MetaTags from 'react-meta-tags';
import React, { useState, useEffect } from "react"
import {
    Container,
    Row,
    Col,
    Alert,
    Media,
    CardTitle,
    ButtonDropdown,
    CardBody,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Card,
    Label,
    Button,
    Form,
    Input,
    InputGroup,
} from "reactstrap"


// availity-reactstrap-validation
import { AvForm, AvField } from "availity-reactstrap-validation"

// Redux
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

//Import Breadcrumb
import Breadcrumb from "../../../components/Common/Breadcrumb"

import avatar from "../../../assets/images/users/avatar-1.jpg"

// actions
// import { editProfile, resetProfileFlag } from "../../store/actions"



const ProfileDetailsPage=(props)=>{

  const [email, setemail] = useState("")
  const [name, setname] = useState("")
  const [password, setpassword] = useState("")
  const [idx, setidx] = useState(1)
  const [contactNo, setcontactNo] = useState('')


// Here we can set the submitted details in the local storage so that they can be then set to the state

  const SubmitDetail=(e)=>{
    setname(name);
    setemail(email);
    setpassword(password);
    setidx(idx);
    setcontactNo(contactNo);

  }

  useEffect(() => {
      if (localStorage.getItem("authUser")) {
        const obj = JSON.parse(localStorage.getItem("authUser"))
        if (process.env.REACT_APP_DEFAULTAUTH === "firebase") {
          setname(obj.displayName)
          setemail(obj.email)
          setidx(obj.uid)
        } else if (
          process.env.REACT_APP_DEFAULTAUTH === "fake" ||
          process.env.REACT_APP_DEFAULTAUTH === "jwt"
        ) {
          setname(obj.username)
          setemail(obj.email)
          setidx(obj.uid)
        }
        setTimeout(() => {
          // props.resetProfileFlag();
        }, 3000);
      }
     }, [props.success])

    return (
        <div>
      
          <Row>
            <Col lg="12">
              {props.error && props.error ? (
                <Alert color="danger">{props.error}</Alert>
              ) : null}
              {props.success? (
                <Alert color="success">{props.success}</Alert>
              ) : null}

              <Card>
                <CardBody>
                  <Media>
                    <div className="ms-3">
                      <img
                        src={avatar}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <Media body style={{marginLeft:"50px"}} className="align-self-center">
                      <div className="text-muted">
                        <h5>{name? name:"Jenny Smith"}</h5>
                        <p className="mb-1">{email ? email :"random@random.com"}</p>
                        <p className="mb-0">Id no: #{idx}</p>
                        <p className="mb-0">Contact No : {contactNo ? contactNo : '1213456777'}</p>
                      </div>
                    </Media>
                  </Media>
                </CardBody>
              </Card>
            </Col>
         

          
            <Col lg={12}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Edit Profile Details</CardTitle>

                  <Form>
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-firstname-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        First name
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          className="form-control"
                          id="horizontal-firstname-Input"
                          onChange={(e)=>setname(e.target.value)}
                        />
                      </Col>
                    </div>
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-email-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Email
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="email"
                          className="form-control"
                          id="horizontal-email-Input"
                          onChange={(e)=>setemail(e.target.value)}

                        />
                      </Col>
                    </div>
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-password-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Password
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="password"
                          className="form-control"
                          id="horizontal-password-Input"
                          onChange={(e)=>setpassword(e.target.value)}

                        />
                      </Col>
                    </div>
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-password-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Contact No
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="tel"
                          className="form-control"
                          id="horizontal-password-Input"
                          onChange={(e)=>setcontactNo(e.target.value)}
                        />
                        
                      </Col>
                    </div>

                    <div className="row justify-content-end">
                      <Col sm={9}>
                        <div className="form-check mb-4">
                          <Input
                            type="checkbox"
                            className="form-check-Input"
                            id="horizontal-customCheck"
                          />
                          <Label
                            className="form-check-Label"
                            htmlFor="horizontal-customCheck"
                          >
                            Remember me
                          </Label>
                        </div>

                        <div>
                          <Button
                            type="submit"
                            color="primary"
                            className="w-md"
                            onClick={(e)=>SubmitDetail()}
                          >
                            Submit
                          </Button>
                        </div>
                      </Col>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

          </Row>

        </div>
    )
}

export default ProfileDetailsPage


