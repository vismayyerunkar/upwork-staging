
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


function ChangeEmail() {
  const [email,setemail] = useState('')
  const [ConfirmEmail,setConfirmemail] = useState('')


  const SubmitChange=(e)=>{
    return
  }


    return (
        <div>
              <Col lg={10}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-5">Change Email</CardTitle>

                  <Form>
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-firstname-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Email
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="text"
                          className="form-control"
                          id="horizontal-firstname-Input"
                          onChange={(e)=>setemail(e.target.value)}
                        />
                      </Col>
                    </div>
                    <div className="row mb-4">
                      <Label
                        htmlFor="horizontal-email-Input"
                        className="col-sm-3 col-form-Label"
                      >
                        Confirm Email
                      </Label>
                      <Col sm={9}>
                        <Input
                          type="email"
                          className="form-control"
                          id="horizontal-email-Input"
                          onChange={(e)=>setConfirmemail(e.target.value)}

                        />
                      </Col>
                    </div>
                    

                    <div className="row justify-content-end">
                      <Col sm={9}>
                        <div>
                          <Button
                            type="submit"
                            color="primary"
                            className="w-md"
                            onClick={(e)=>SubmitChange()}
                          >
                            Request Change
                          </Button>
                        </div>
                      </Col>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>

        </div>
    )
}

export default ChangeEmail
