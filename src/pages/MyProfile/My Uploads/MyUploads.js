import React, { useEffect } from "react"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"
import {
  Badge,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  Table,
  UncontrolledDropdown,
  UncontrolledTooltip,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import Image
import images from "../../../assets/images"
import companies from "../../../assets/images/companies"


import { Card, CardBody, CardTitle } from "reactstrap"

const MyUploads = () => {
  return (
    <React.Fragment>
      <Card>
        <CardBody>
          <CardTitle className="mb-4">Upload Details</CardTitle>
          <div className="table-responsive mt-4">
            <table className="table align-middle table-nowrap">
              <tbody>
                <tr>
                  <td style={{ width: "50%" }}>
                    <p className="mb-0">Legal Name : </p>
                  </td>
                  <td style={{ width: "50%" }}>
                    <h5 className="mb-0">Jane Jallow</h5>
                  </td>
                  <td>
                    
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mb-0">Address :</p>
                  </td>
                  <td>
                    <h5 className="mb-0">Jane jallow Long address</h5>
                  </td>
                  <td>
                    
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mb-0">Citizenship : </p>
                  </td>
                  <td>
                    <h5 className="mb-0">Earthian</h5>
                  </td>
                  <td>
                    
                  </td>
                </tr>
                <tr>
                  <td>
                    <p className="mb-0">Current Certificate : </p>
                  </td>
                  <td>
                    <h5 className="mb-0">New Corner</h5>
                  </td>
                  <td>
                    
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>


          {/* Uploads */}
      
        <Container fluid>

          <Row>
            <Col lg="12">
              <div className="">
                <div className="table-responsive">
                  <Table className="project-list-table table-nowrap align-middle table-borderless">
                    <thead>
                      <tr>
                        
                        <th scope="col">Type</th>
                        <th scope="col">Upload Date</th>
                        <th scope="col">Status</th>
                
                      </tr>
                    </thead>
                    <tbody>
                     <tr>
                          <td>
                            <p>Passport</p>
                          </td>
                          <td>
                            <p>27/1/2020</p>
                          </td>
                          <td>
                            <h6 className="approval">Approval</h6>
                          </td>
                     </tr>
                     <tr>
                          <td>
                            <p>Driving Licence</p>
                          </td>
                          <td>
                            <p>26/6/2020</p>
                          </td>
                          <td>
                            <h6  className="in-review">In-Review</h6>
                          </td>
                     </tr>
                     <tr>
                          <td>
                            <p>Identity card</p>
                          </td>
                          <td>
                            <p>27/1/2020</p>
                          </td>
                          <td>
                            <h6  className="rejected">Rejected</h6>
                          </td>
                     </tr>
                     
                    </tbody>
                                {/* Upload*/}


                             <tr>
                              <td>
                                          <select className="form-control">
                                            <option>Select</option>
                                            <option>Address Proof select</option>
                                            <option>Identity Proof</option>
                                            <option>Source of Funds </option>
                                            <option>Bank Account Proof</option>
                                            <option>Merchant Documents</option>
                                          </select>
                              
                              </td>
                            <td>
                            
                                <div className="text-center my-3">
                                  <button
                                              type="button"
                                              className="btn btn-light waves-effect waves-light w-sm"
                                            >
                                              <i className="mdi mdi-upload d-block font-size-15"></i>{" "}
                                              Upload
                                            </button>
                                </div>
                            

                            </td>
                          
                            <td >
                                        <select className="form-control">
                                          <option>Select</option>
                                          <option>Electricity Bill</option>
                                          <option>Passport</option>
                                          <option>Identity Card</option>
                                          <option>Driving Licence</option>
                                        </select>
                            
                            </td>
                          </tr>
                  </Table>
                </div>
              </div>
            </Col>






            
          </Row>


        </Container>
  


    </React.Fragment>
  )
}

export default MyUploads



     
       
