import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const StudentInfoChart = () => {

    const options = {
        chart: {
            backgroundColor: "rgba(0,0,0,0)",

        },
        exporting: {
            enabled: false
        },
        title: false,
        yAxis: {
            title: {
                text: 'No. of students'
            }
        },
        xAxis: {
            title: {
                text: 'Months of the year'
            },
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            accessibility: {
                description: 'Months of the year'
            }
        },
        accessibility: {
            announceNewData: {
                enabled: true
            }
        },
        credits: { enabled: false },
        series: [
            {
                name: 'B.Teah',
                data: [0, 0, 0, 40, 0]
            },
            {
                name: 'Diploma',
                data: [0, 0, 0, 400, 50, 100, 90]
            }
        ]
    }

    return (
        <div className='col-12'>
            <p className="chart-title">Student Registrations</p>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    )
}

export default StudentInfoChart