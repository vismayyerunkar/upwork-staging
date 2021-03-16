import {
  ButtonDropdown,
  Card,
  CardBody,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap"

import React, { useEffect } from "react"
import { Col, Container, Row } from "reactstrap"
import MetaTags from 'react-meta-tags';
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Link, withRouter } from "react-router-dom"
import { map } from "lodash"

import {invoiceList} from './TempData'

import CardInvoice from "./card-invoice"

function RecurringPayment() {
    const invoices = invoiceList;

    return (
          <React.Fragment>

        <div className="page-clontent">

                  <Row>
                    {map(invoices, (invoice, key) => (
                      <CardInvoice cycle={"monthly cycle"} data={invoice} key={"_invoice_" + key} />
                    ))}
                  </Row>
                  <Row>
                    <Col xs="12">
                      <div className="text-center my-3">
                        <Link to="#" className="text-success">
                          <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                          Load more
                        </Link>
                      </div>
                    </Col>
                  </Row>
        </div>
      </React.Fragment>

    )
}

export default RecurringPayment

