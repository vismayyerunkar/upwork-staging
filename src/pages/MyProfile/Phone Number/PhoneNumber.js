import React ,{useState,useEffect} from "react"
import MetaTags from 'react-meta-tags';

import {
  ButtonDropdown,
  Card,
  Button,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Table,
  Row,
  Input,
  Label,
  Col,
  CardTitle,
  CardSubtitle,
} from "reactstrap"

//Import Breadcrumb
import Breadcrumbs from "../../../components/Common/Breadcrumb"


function PhoneNumber() {

 
   const [primary,setprimary]  = useState('No number selected')


  const Numbers = [
    {key:1,num:67687398593},
    {key:2,num:54165435553},
    {key:3,num:14698746593},
    {key:4,num:54164133153},
    {key:5,num:21455222223},
    {key:6,num:54163545853},
    {key:7,num:65885211293},
    {key:8,num:64752755593},
    {key:9,num:22212285293},
    {key:10,num:5461545553},
  ]


  

    return (
              
        <div className="container-fluid">

          <Row>
            <Col lg={12} sm={10}>
              <Card>
                <CardBody>
                  <CardTitle className="mb-4">Mobile Number</CardTitle>
                  <CardTitle className="mb-3">Primary Mobile Number : {primary}</CardTitle>
                  <CardSubtitle className="mb-5">
                   You can add upto 10 mobile numbers to receive payments
                  </CardSubtitle>

                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Mobile Number</th>
                          <th>Make Primary</th>
                          {/*<th>Remove</th>*/}
                        </tr>
                      </thead>
                      <tbody>


                          { 
                              Numbers.map((data)=>
                                     
                                     (
                                       <tr key={data.key}>
                                        <th scope="row">{data.key}</th>
                                        <td>{data.num}</td>
                                        
                                        <td>
                                          <div className="form-check form-radio-outline form-radio-primary mb-3">
                                            <input
                                              type="radio"
                                              id="customRadiooutlinecolor1"
                                              name="customRadiooutlinecolor1"
                                              className="form-check-input"
                                              onClick={(e)=>setprimary(data.num)}
                                              value={`option${data.key}`}
                                            />
                                           
                                          </div>
                                        </td>
                                      </tr>
                                      
                                      ))}
       
                      </tbody>
                    </Table>

                    <Input style={{marginTop:"30px"}}
                          type="tel"
                          className="form-control mb-5"
                          id="horizontal-password-Input"
                        />

                    <Button style={{marginLeft:"45%"}} color="primary"
                      className="btn btn-primary waves-effect">Add</Button>


                  </div>
                </CardBody>
              </Card>
            </Col>
            </Row>
        </div>
    )
}

export default PhoneNumber

