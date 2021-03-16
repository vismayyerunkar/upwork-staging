import React, { Component } from "react"
import MetaTags from 'react-meta-tags';
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Modal,
  ModalHeader,
  ModalBody,
  TabContent,
  TabPane,
  NavItem,
  NavLink,
  Label,
  Button,
  Input,
  Form,
  FormGroup,
} from "reactstrap"
import classnames from "classnames"
import { Link } from "react-router-dom"

//Dropzone
import Dropzone from "react-dropzone"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"

//Import images
import verificationImg from "../../../assets/images/verification-img.png"
// import { options } from "common/data/projects"

class KycApplication extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modal: false,
      activeTab: 1,
      selectedFiles: [],
    }
    this.togglemodal.bind(this)
    this.toggleTab.bind(this)
    this.handleAcceptedFiles.bind(this)
  }

  togglemodal = () => {
    this.setState(prevState => ({
      modal: !prevState.modal,
    }))
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      if (tab >= 1 && tab <= 3) {
        this.setState({
          activeTab: tab,
        })
      }
    }
  }

  handleAcceptedFiles = files => {
    files.map(file =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
        formattedSize: this.formatBytes(file.size),
      })
    )

    this.setState({ selectedFiles: files })
  }

  /**
   * Formats the size
   */
  formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const dm = decimals < 0 ? 0 : decimals
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]

    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i]
  }



  render() {

      
    const options = {
    chart: {
        height: 500,
        type: "bar",
        toolbar: {
        show: !1,
        },
    },
    plotOptions: {
        bar: {
        columnWidth: "14%",
        endingShape: "rounded",
        },
    },
    dataLabels: {
        enabled: !1,
    },
    series: [
        {
        name: "Overview",
        data: [42, 56, 40, 64, 26, 42, 56, 35, 62],
        },
    ],
    grid: {
        yaxis: {
        lines: {
            show: !1,
        },
        },
    },
    yaxis: {
        title: {
        text: "% (Percentage)",
        },
    },
    xaxis: {
        labels: {
        rotate: -90,
        },
        categories: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
        title: {
        text: "Week",
        },
    },
    colors: ["#556ee6"],
    }

    return (
      <React.Fragment>
          <MetaTags>
            <title>KYC Application</title>
          </MetaTags>
          <Container fluid>

            <Row className="justify-content-center mt-lg-5">
              <Col xl="5" sm="8">
                <Card>
                  <CardBody>
                    <div className="text-center">
                      <Row className="justify-content-center">
                        <Col lg="10">
                          <h4 className="mt-4 font-weight-semibold">
                            KYC Verification
                          </h4>
                          <p className="text-muted mt-3">
                            Itaque earum rerum hic tenetur a sapiente delectus
                            ut aut reiciendis perferendis asperiores repellat.
                          </p>

                          <div className="mt-4">
                            {/* button triggers modal */}
                            <Button
                              type="button"
                              color="primary"
                              onClick={this.togglemodal}
                            >
                              Click here for Verification
                            </Button>
                          </div>
                        </Col>
                      </Row>

                      <Row className="justify-content-center mt-5 mb-2">
                        <Col sm="6" xs="8">
                          <div>
                            <img
                              src={verificationImg}
                              alt=""
                              className="img-fluid"
                            />
                          </div>
                        </Col>
                      </Row>
                    </div>

                    {/* modal */}
                    <Modal
                      isOpen={this.state.modal}
                      role="dialog"
                      size="lg"
                      autoFocus={true}
                      centered={true}
                      id="verificationModal"
                      tabIndex="-1"
                      toggle={this.togglemodal}
                    >
                      <div className="modal-content">
                        <ModalHeader toggle={this.togglemodal}>
                          Verify your Account
                        </ModalHeader>
                        <ModalBody>
                          <div
                            id="kyc-verify-wizard"
                            className="wizard clearfix"
                          >
                           
                            <div className="content clearfix">
                              <TabContent
                                activeTab={this.state.activeTab}
                                className="twitter-bs-wizard-tab-content"
                              >
                                <TabPane tabId={1} id="personal-info">
                                  <Form>
                                    <Row>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="kycfirstname-input" className="form-label">
                                            First name
                                        </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="kycfirstname-input"
                                            placeholder="Enter First name"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="kyclastname-input" className="form-label">
                                            Last name
                                        </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="kyclastname-input"
                                            placeholder="Enter Last name"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>

                                    <Row>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="kycphoneno-input" className="form-label">
                                            Phone
                                        </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="kycphoneno-input"
                                            placeholder="Enter Phone number"
                                          />
                                        </FormGroup>
                                      </Col>
                                      <Col lg="6">
                                        <FormGroup className="mb-3">
                                          <Label htmlFor="kycbirthdate-input" className="form-label">
                                            Date of birth
                                        </Label>
                                          <Input
                                            type="text"
                                            className="form-control"
                                            id="kycbirthdate-input"
                                            placeholder="Enter Date of birth"
                                          />
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                    <Row>
                                      <Col lg="12">
                                        <FormGroup className="mb-3">
                                          <Label style={{marginRight:"20px"}} htmlFor="kycselectcity-input" className="form-label">
                                            City
                                        </Label>
                                          <select
                                            className="form-select"
                                            id="kycselectcity-input"
                                          >
                                            <option>
                                              San Francisco
                                          </option>
                                            <option>Los Angeles</option>
                                            <option>San Diego</option>
                                          </select>
                                        </FormGroup>
                                      </Col>
                                    </Row>
                                  </Form>
                                </TabPane>
                                <TabPane tabId={2} id="confirm-email">
                                  <div>
                                    <Form>
                                      <Row>
                                        <Col lg="12">
                                          <FormGroup className="mb-3">
                                            <Label htmlFor="kycemail-input">
                                              Email
                                          </Label>
                                            <Input
                                              type="email"
                                              className="form-control"
                                              id="kycemail-input"
                                              placeholder="Enter Email Address"
                                            />
                                          </FormGroup>

                                          <FormGroup className="mb-3">
                                            <Label htmlFor="kycconfirmcode-input">
                                              Confirm code
                                          </Label>
                                            <Input
                                              type="email"
                                              className="form-control"
                                              id="kycconfirmcode-input"
                                              placeholder="Enter Confirm code"
                                            />
                                          </FormGroup>

                                          <div className="mb-3">
                                            Didn't recieve code ?
                                          <Button type="button" color="link">
                                              Resend Code
                                          </Button>
                                          </div>
                                        </Col>
                                      </Row>
                                    </Form>
                                  </div>
                                </TabPane>
                                <TabPane tabId={3} id="doc-verification">
                                  <h5 className="font-size-14 mb-3">
                                    Upload document file for a verification
                                </h5>
                                  <div className="kyc-doc-verification mb-3">
                                    <Dropzone
                                      onDrop={acceptedFiles =>
                                        this.handleAcceptedFiles(acceptedFiles)
                                      }
                                    >
                                      {({ getRootProps, getInputProps }) => (
                                        <div className="dropzone">
                                          <div
                                            className="dz-message needsclick"
                                            {...getRootProps()}
                                          >
                                            <input {...getInputProps()} />
                                            <div className="mb-3">
                                              <i className="display-4 text-muted bx bxs-cloud-upload"></i>
                                            </div>
                                            <h4>
                                              Drop files here or click to upload.
                                          </h4>
                                          </div>
                                        </div>
                                      )}
                                    </Dropzone>
                                    <div
                                      className="dropzone-previews mt-3"
                                      id="file-previews"
                                    >
                                      {this.state.selectedFiles.map((f, i) => {
                                        return (
                                          <Card
                                            className="mt-1 mb-0 shadow-none border dz-processing dz-image-preview dz-success dz-complete"
                                            key={i + "-file"}
                                          >
                                            <div className="p-2">
                                              <Row className="align-items-center">
                                                <Col className="col-auto">
                                                  <img
                                                    data-dz-thumbnail=""
                                                    height="80"
                                                    className="avatar-sm rounded bg-light"
                                                    alt={f.name}
                                                    src={f.preview}
                                                  />
                                                </Col>
                                                <Col>
                                                  <Link
                                                    to="#"
                                                    className="text-muted font-weight-bold"
                                                  >
                                                    {f.name}
                                                  </Link>
                                                  <p className="mb-0">
                                                    <strong>
                                                      {f.formattedSize}
                                                    </strong>
                                                  </p>
                                                </Col>
                                              </Row>
                                            </div>
                                          </Card>
                                        )
                                      })}
                                    </div>
                                  </div>
                                </TabPane>
                              </TabContent>
                            </div>
                            <div className="actions clearfix">
                            <Row>
                                <li style={{listStyleType: "none",marginRight:"20px",marginLeft:"20px"}}
                                  className={
                                    this.state.activeTab === 1
                                      ? "previous disabled"
                                      : "previous"
                                  }
                                >
                                  <Link
                                    to="#"
                                  >
                                   <Button color="primary" secondary className="btn-rounded" onClick={() => {
                                      this.toggleTab(this.state.activeTab - 1)
                                    }} > Previous </Button>
                                  </Link>
                                </li>
                                <li
                                  style={{listStyleType: "none"}}
                                  className={
                                    this.state.activeTab === 3
                                      ? "next disabled"
                                      : "next"
                                  }
                                >
                                  <Link
                                    to="#"
                                  >
                                  <Button color="primary" className="btn-rounded" onClick={() => {
                                      this.toggleTab(this.state.activeTab + 1)
                                    }} > Next </Button>
                                   
                                  </Link>
                                </li>
                              </Row>

                            </div>
                          </div>
                        </ModalBody>
                      </div>
                    </Modal>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
      </React.Fragment>
    )
  }
}

export default KycApplication;
