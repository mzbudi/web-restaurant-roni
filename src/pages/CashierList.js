import React from "react";
import { Table, Container } from "reactstrap";
import { connect } from "react-redux";
import { requestUsers } from "../public/redux/action/users";
import ModalUpdateUser from "../components/ModalUpdateUser";
import ModalDeleteUser from "../components/ModalDeleteUser";
import ModalAddUser from "../components/ModalAddUser";
import NavbarNavigation from "../components/NavbarNavigation";
import Moment from "moment";
import style from "../styles.js";

class CashierList extends React.Component {
  componentDidMount() {
    const headers = { authorization: this.props.auth.data.data.data.token };
    const config = {
      headers
    };

    this.props.dispatch(requestUsers(config));
  }

  render() {
    return (
      <React.Fragment>
        <NavbarNavigation />
        <Container>
          <ModalAddUser />
          <Table style={{ backgroundColor: "#ffffff" }} bordered>
            <thead style={style.tHead}>
              <tr>
                <th style={style.centerCentered}>No</th>
                <th style={style.centerCentered}>User Id</th>
                <th style={style.centerCentered}>Name</th>
                <th style={style.centerCentered}>Username</th>
                <th style={style.centerCentered}>User Role</th>
                <th style={style.centerCentered}>Date</th>
                <th style={{ textAlign: "center" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.users.isLoading
                ? this.props.users.userData.data.data.map((data, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row" style={style.centerCentered}>
                          {i + 1}
                        </th>
                        <td style={style.centerCentered}>{data.user_id}</td>
                        <td style={style.centerCentered}>{data.name}</td>
                        <td style={style.centerCentered}>{data.username}</td>
                        <td style={style.centerCentered}>
                          {data.user_role === 2 ? "Cashier" : "Admin"}
                        </td>
                        <td style={style.centerCentered}>
                          {Moment(data.created_at).format("DD/MM/YYYY")}
                        </td>
                        <td style={style.centerCentered}>
                          <ModalUpdateUser
                            user_id={data.user_id}
                            name={data.name}
                            data={data}
                          />
                          <ModalDeleteUser
                            user_id={data.user_id}
                            name={data.name}
                          />
                        </td>
                      </tr>
                    );
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
    category: state.category,
    users: state.users
  };
};

export default connect(mapStateToProps)(CashierList);
