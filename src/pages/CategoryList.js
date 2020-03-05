import React, { Component, Fragment } from "react";
import { Table, Container } from "reactstrap";
import { connect } from "react-redux";
import { requestCategory } from "../public/redux/action/category";
import ModalUpdateCategory from "../components/ModalUpdateCategory";
import ModalDeleteCategory from "../components/ModalDeleteCategory";
import ModalAddCategory from "../components/ModalAddCategory";
import NavbarNavigation from "../components/NavbarNavigation";
import Moment from "moment";
import style from "../styles";

class CategoryList extends Component {
  componentDidMount() {
    const { auth } = this.props;
    const headers = { authorization: auth.data.token };
    const configCategory = {
      headers
    };
    this.props.dispatch(requestCategory(configCategory));
  }

  render() {
    return (
      <Fragment>
        <NavbarNavigation />
        <Container>
          <ModalAddCategory />
          <Table bordered style={{ backgroundColor: "#ffffff" }}>
            <thead style={style.tHead}>
              <tr>
                <th style={style.centerCentered}>No</th>
                <th style={style.centerCentered}>Category Name</th>
                <th style={style.centerCentered}>Date</th>
                <th style={style.centerCentered}>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.props.category.isLoading
                ? this.props.category.dataCategory.data.data.map((data, i) => {
                    return (
                      <tr key={i}>
                        <th scope="row" style={style.centerCentered}>
                          {i + 1}
                        </th>
                        <td style={style.centerCentered}>
                          {data.category_name}
                        </td>
                        <td style={style.centerCentered}>
                          {Moment(data.created_at).format("DD/MM/YYYY")}
                        </td>
                        <td style={style.centerCentered}>
                          <ModalUpdateCategory
                            category_id={data.category_id}
                            category_name={data.category_name}
                            data={data}
                          />
                          <ModalDeleteCategory
                            category_id={data.category_id}
                            category_name={data.category_name}
                          />
                        </td>
                      </tr>
                    );
                  })
                : ""}
            </tbody>
          </Table>
        </Container>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth,
    products: state.products,
    category: state.category
  };
};

export default connect(mapStateToProps)(CategoryList);
