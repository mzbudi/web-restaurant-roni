import React from 'react';
import { Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';

class CardHistory extends React.Component {
    constructor(props){
        super(props)
    }
    
    formatRupiah = (number, prefix) => {
        let number_string = number.toString().replace(/[^,\d]/g, '');
        let split = number_string.split(',');
        let remains = split[0].length % 3;
        let rupiah = split[0].substr(0, remains);
        let thausand = split[0].substr(remains).match(/\d{3}/gi);

        if (thausand) {
            let separator = remains ? '.' : '';
            rupiah += separator + thausand.join('.');
        }

        rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
        return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
    }

    render() {
        return (
            <Row style={{marginBottom: "40px", marginTop: "30px" }}>
                <Col md="4">
                    <Card body style={{backgroundColor:"#b3d9ff"}}>
                        <CardTitle>Today's Income</CardTitle>
                        <CardText>{this.props.todayTotals.length > 0 ? ('Rp ' + this.formatRupiah(this.props.todayTotals.reduce((acc,cur)=>{return parseInt(acc)+parseInt(cur)}))+' Obtained'):('Not Yet Sale')}</CardText>
                    </Card>
                </Col>
                <Col md="4">
                    <Card body style={{backgroundColor:"#ffffb3"}}>
                        <CardTitle>Orders Accepted</CardTitle>
                        <CardText>{this.props.totalOrders} Orders Accepted</CardText>
                    </Card>
                </Col>
                <Col md="4">
                    <Card body style={{backgroundColor:"#b3ffb3"}}>
                        <CardTitle>This Years Income</CardTitle>
                        <CardText>
                            Rp. {this.formatRupiah(this.props.totalRevenue.reduce((acc,cur)=>{return acc+cur}))}
                            {' '}Obtained
                        </CardText>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default CardHistory;
