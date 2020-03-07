import React from "react";
import PropTypes from "prop-types";
import NavbarNavigation from "../components/NavbarNavigation";
import { Table, Container, Button } from "reactstrap";
import { connect } from "react-redux";
import { requestOrder } from "../public/redux/action/order";
import Moment from "moment";
import Chart from "../components/Chart";
import CardHistory from "../components/CardHistory";

class Order extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "Mei",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Des"
      ],
      total: [],
      orders: [],
      totalRevenue: []
    };
  }
  componentDidMount() {
    const { auth } = this.props;
    const config = {
      headers: { authorization: auth.data.token }
    };

    this.props.dispatch(requestOrder(config)).then(res => {
      this.setState({
        orders: res.value.data.data
      });
    });
  }

  render() {
    const { orders } = this.state;
    const { order } = this.props;
    let newDate = new Date();
    let today = Moment(newDate).format("DD/MM/YYYY");
    let arrToday = [];
    let totalToday = 0;
    let totalRevenue = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    let totalOrders = 0;
    let totalMonth = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    if (orders.length) {
      order.data.data.data.map((data, i) => {
        totalOrders += 1;
        if (
          String(Moment(data.created_at).format("DD/MM/YYYY")) === String(today)
        ) {
          arrToday.push(data.subTotal);
          totalToday += parseInt(data.subTotal);
        }
        totalMonth.forEach(month => {
          if (
            parseInt(
              Moment(data.created_at)
                .format("DD/MM/YYYY")
                .substring(3, 5)
            ) === month
          ) {
            totalRevenue[month - 1] += parseInt(data.subTotal);
          }
        });
      });
    }
    return (
      <React.Fragment>
        <NavbarNavigation />
        <Container>
          <CardHistory
            totalOrders={totalOrders}
            todayTotals={totalToday}
            totalRevenue={totalRevenue}
          />
          <Chart totalRevenue={totalRevenue} />
          <h4 style={{ textAlign: "center", marginTop: "80px" }}>
            {" "}
            Recent Orders
          </h4>
          <Table style={{ backgroundColor: "#ffffff" }} bordered>
            <thead>
              <tr>
                <th>No</th>
                <th>Order ID</th>
                <th>Invoice Number</th>
                <th>User Id</th>
                <th>Sub Total</th>
                <th>PPn</th>
                <th style={{ textAlign: "center" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {order.isLoading
                ? order.data.data.data.map((data, i) => {
                    if (i <= 5) {
                      return (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{data.order_id}</td>
                          <td>{data.invoice_number}</td>
                          <td>{data.user_id}</td>
                          <td>{data.subTotal}</td>
                          <td>{data.PPn}</td>
                          <td style={{ textAlign: "center" }}>
                            {Moment(data.created_at).format("DD/MM/YYYY")}
                          </td>
                        </tr>
                      );
                    }
                  })
                : ""}
            </tbody>
          </Table>
        </Container>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    order: state.order
  };
};

export default connect(mapStateToProps)(Order);
