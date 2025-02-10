google.charts.load('current', { 'packages': ['corechart', 'geochart'] });

google.charts.setOnLoadCallback(drawCharts);

function drawCharts() {
    drawPieChart();
    drawLineChart();
    drawColumnChart();
    drawGeoChart();
}

function drawPieChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Device');
    data.addColumn('number', 'Popularity');
    data.addRows([
        ['Desktop', 16],
        ['Mobile', 84]
    ]);

    var options = {
        colors: ['#6a98f6', '#3366cc'],
        tooltip: {
            textStyle: {
                fontSize: 14
            }
        },
        pieSliceTextStyle: {
            fontSize: 14
        },
        legend: {
            position: 'bottom',
            textStyle: {
                fontSize: 12,
                color: 'black'
            }
        }
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));
    chart.draw(data, options);
}

function drawLineChart() {
    var data = google.visualization.arrayToDataTable([
        ['Time', 'Visits', { type: 'string', role: 'tooltip' }],
        [1, 60000, '60,000 in 1 hour'],
        [2, 60000, '60,000 in 2 hours'],
        [3, 60000, '60,000 in 3 hours'],
        [4, 60000, '60,000 in 4 hours'],
        [5, 60000, '60,000 in 5 hours'],
        [6, 60000, '60,000 in 6 hours']
    ]);

    var options = {
        curveType: 'function',
        legend: { position: "none", numberFormat: '0%' },
        tooltip: {
            trigger: 'both',
            textStyle: {
                fontSize: 14
            }
        },
        hAxis: {
            title: 'Time',
            minValue: 0,
            maxValue: 10,
            format: '# hours',
            titleTextStyle: {
                fontSize: 12,
                italic: true
            },
            textStyle: {
                fontSize: 10
            }
        },
        vAxis: {
            title: 'Visits',
            minValue: 0,
            maxValue: 100000,
            format: '###,###',
            titleTextStyle: {
                fontSize: 12,
                italic: true
            },
            textStyle: {
                fontSize: 10
            }
        }
    };

    var chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
    chart.draw(data, options);
}

function drawColumnChart() {
    var data = google.visualization.arrayToDataTable([
        ['Channels', 'Percentage', { role: 'style' }],
        ['DisplayAds', 0.75, '#6a98f6'],
        ['Paid', 0.25, '#3366cc']
    ]);

    var formatter = new google.visualization.NumberFormat({ pattern: '0%' });
    formatter.format(data, 1);

    var options = {
        tooltip: {
            textStyle: {
                fontSize: 14
            }
        },
        vAxis: {
            minValue: 0, maxValue: 1, format: '0%',
            textStyle: {
                fontSize: 12
            }
        },
        bar: { groupWidth: "95%" },
        legend: { position: "none" },
        colors: ['#6a98f6', '#3366cc'],
        hAxis: {
            textStyle: {
                fontSize: 12
            }
        }
    };

    var chart = new google.visualization.ColumnChart(document.getElementById('columnchart_values'));
    chart.draw(data, options);
}

function drawGeoChart() {
    var data = google.visualization.arrayToDataTable([
        ['Country', 'Percentage'],
        ['France', 0.28],
        ['Spain', 0.25],
        ['United Kingdom', 0.08],
        ['Australia', 0.05],
        ['Mexico', 0.05]
    ]);

    var formatter = new google.visualization.NumberFormat({ pattern: '0%' });
    formatter.format(data, 1);

    var options = {
        height: 300,
        region: 'world',
        colorAxis: { minValue: 0, maxValue: 1, colors: ['#e0f7fa', '#3366cc'] },
        legend: { numberFormat: '0%' },
        tooltip: {
            isHtml: true, trigger: 'focus', textStyle: {
                fontSize: 14
            }
        }
    };

    var chart = new google.visualization.GeoChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}