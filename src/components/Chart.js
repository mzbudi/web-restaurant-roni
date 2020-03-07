import React from "react";
import { Bar } from "react-chartjs-2";

class Chart extends React.Component {
  render() {
    const { totalRevenue } = this.props;
    return (
      <div style={{ backgroundColor: "white", padding: 20 }} className="chart">
        <Bar
          data={{
            labels: [
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
            datasets: [
              {
                label: "Revenue",
                data: totalRevenue,
                backgroundColor: "rgba(54,162,235, 0.6)"
              }
            ]
          }}
          // width={100}
          height={400}
          options={{
            maintainAspectRatio: false,
            title: {
              display: true,
              text: "2020",
              fontSize: 25
            }
          }}
        />
      </div>
    );
  }
}

export default Chart;
