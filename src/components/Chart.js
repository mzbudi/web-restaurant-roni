import React from 'react';
import { Bar } from 'react-chartjs-2'

class Chart extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartData:{
                labels:['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Des'],
                datasets :[
                    {label: 'Revenue',
                     data:props.totalRevenue,
                     backgroundColor:[
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                         'rgba(54,162,235, 0.6)',
                     ]
                    }
                ]
            }
        }
    }

    render() {

        return (
            <div className="chart">
                <Bar
                    data={this.state.chartData}
                    // width={100}
                    height={400}
                    options={{
                        maintainAspectRatio: false,
                        title:{
                            display: true,
                            text: '2020',
                            fontSize:25
                        }
                    }}
                    
                />
            </div>
        )
    }
}

export default Chart