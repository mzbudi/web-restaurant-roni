import React from "react";
import { Card, CardTitle, CardText, Row, Col } from "reactstrap";
import { formatRupiah } from "../public/helper/parsePrice";

class CardHistory extends React.Component {
  render() {
    const { todayTotals, totalOrders, totalRevenue } = this.props;
    return (
      <Row style={{ marginBottom: "40px", marginTop: "30px" }}>
        <Col md="4">
          <Card body style={{ backgroundColor: "#b3d9ff" }}>
            <CardTitle>Today's Income</CardTitle>
            <CardText>
              {todayTotals > 0
                ? formatRupiah(this.props.todayTotals, "Rp. ") + " Obtained"
                : "Not Yet Sale"}
            </CardText>
          </Card>
        </Col>
        <Col md="4">
          <Card body style={{ backgroundColor: "#ffffb3" }}>
            <CardTitle>Orders Accepted</CardTitle>
            <CardText>{totalOrders} Orders Accepted</CardText>
          </Card>
        </Col>
        <Col md="4">
          <Card body style={{ backgroundColor: "#b3ffb3" }}>
            <CardTitle>This Years Income</CardTitle>
            <CardText>
              Rp.{" "}
              {formatRupiah(
                totalRevenue.reduce((acc, cur) => {
                  return acc + cur;
                })
              )}{" "}
              Obtained
            </CardText>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default CardHistory;
