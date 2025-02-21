document.getElementById("pop-up-link").addEventListener("click", function () {
    document.getElementById("pop-up-block").style.opacity="1";
    document.getElementById("pop-up-block").style.visibility="visible";
    document.body.style.overflowY="hidden";
});

document.getElementById("close-icon").addEventListener("click", function () {
    document.getElementById("pop-up-block").style.opacity="0";
    document.getElementById("pop-up-block").style.visibility="hidden";
    document.body.style.overflowY="auto";
});

function toggleActiveMode(buttonId) {
    var buttons = document.querySelectorAll(".btn-custom-mode, .btn-custom");
    buttons.forEach(function (btn) {
        btn.classList.remove("active");
    });
    document.getElementById(buttonId).classList.add("active");
}

google.charts.load('current', { 'packages': ['corechart', 'geochart', 'line'] });

let lineData = [];

// Function to generate random data for the line chart and store it in localStorage
function generateLineChartData() {
    if (localStorage.getItem('lineData')) {
        lineData = JSON.parse(localStorage.getItem('lineData'));
    } else {
        lineData.push([new Date(), Math.floor(Math.random() * 101) + 50]);
        localStorage.setItem('lineData', JSON.stringify(lineData));
    }
}

function drawLineChart() {
    let lineChart = new google.visualization.LineChart(document.getElementById('line_chart'));
    lineChart.draw(google.visualization.arrayToDataTable([['Time', 'Visits'], ...lineData]), {
        curveType: 'function',
        legend: { position: 'none' },
        tooltip: { isHtml: true, trigger: 'none' }, // Tooltips in percentage format
        hAxis: {
            title: '',
            textPosition: 'none'
        },
        vAxis: {
            title: '',
            minValue: 50,
            maxValue: 150,
            textPosition: 'none'
        }
    });
}

function updateLineChartData() {
    setInterval(() => {
        const currentTime = new Date();
        const newValue = Math.floor(Math.random() * 101) + 50;
        lineData.push([currentTime, newValue]);
        if (lineData.length >= 24) {
            lineData = [[new Date(), newValue]];
        }
        localStorage.setItem('lineData', JSON.stringify(lineData));
        drawLineChart();
        setRandomTime();  // Update random time when graphs update
    }, 60000 ); // 10 seconds interval
}

// Function to generate random data for pie, geo, and column charts
function generateRandomDataForOtherCharts(type) {
    const data = [];
    switch (type) {
        case 'pie':
            const mobilePercentage = Math.floor(Math.random() * (94 - 81 + 1)) + 81;  // Random value between 81 and 94
            const desktopPercentage = 100 - mobilePercentage; // Ensure the total equals 100%

            // Pie chart with mobile and desktop
            data.push(['Device', 'Percentage']);
            data.push(['Mobile', mobilePercentage]);
            data.push(['Desktop', desktopPercentage]);
            break;
        case 'column':
            const displayAdsPercentage = Math.floor(Math.random() * (87 - 75 + 1)) + 75;  // Random value between 75 and 87
            const paidPercentage = 100 - displayAdsPercentage; // Ensure the total equals 100%

            // Column chart with DisplayAds and Paid
            data.push(['Category', 'Percentage']);
            data.push(['DisplayAds', displayAdsPercentage]);
            data.push(['Paid', paidPercentage]);
            break;
        case 'geo':
            data.push(['Country', 'Percentage']);
            const countries = ['France', 'Spain', 'United Kingdom', 'Australia', 'Mexico'];
            let remainingValue = 100;

            countries.forEach((country, index) => {
                let randomValue = (index === countries.length - 1) ? remainingValue : Math.floor(Math.random() * (remainingValue - (countries.length - 1 - index))) + 1;
                remainingValue -= randomValue;
                data.push([country, randomValue]);
            });

            break;
        default:
            break;
    }
    return data;
}

// Function to save random data for pie, geo, and column charts to localStorage
function saveDataToLocalStorage() {
    const pieData = generateRandomDataForOtherCharts('pie');
    const geoData = generateRandomDataForOtherCharts('geo');
    const columnData = generateRandomDataForOtherCharts('column');

    localStorage.setItem('pieData', JSON.stringify(pieData));
    localStorage.setItem('geoData', JSON.stringify(geoData));
    localStorage.setItem('columnData', JSON.stringify(columnData));
}

// Function to load the data for pie, geo, and column charts from localStorage
function loadDataFromLocalStorage() {
    const pieData = JSON.parse(localStorage.getItem('pieData'));
    const geoData = JSON.parse(localStorage.getItem('geoData'));
    const columnData = JSON.parse(localStorage.getItem('columnData'));

    if (!pieData || !geoData || !columnData) {
        saveDataToLocalStorage(); // Regenerate data if not found
    }

    return {
        pieData: pieData || generateRandomDataForOtherCharts('pie'),
        geoData: geoData || generateRandomDataForOtherCharts('geo'),
        columnData: columnData || generateRandomDataForOtherCharts('column')
    };
}

// Function to draw pie, geo, and column charts
function drawCharts() {
    const { pieData, geoData, columnData } = loadDataFromLocalStorage();

    // Draw Pie Chart
    const pieChartData = google.visualization.arrayToDataTable(pieData);
    const pieChart = new google.visualization.PieChart(document.getElementById('piechart'));
    pieChart.draw(pieChartData, {
        colors: ['#6a98f6', '#3366cc'],
        tooltip: {
            textStyle: {
                fontSize: 14
            },
            trigger: 'focus',
            isHtml: true
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
    });

    // Draw Geo Chart
    const geoChartData = google.visualization.arrayToDataTable(geoData);
    const geoChart = new google.visualization.GeoChart(document.getElementById('geochart'));
    geoChart.draw(geoChartData, {
        colorAxis: { minValue: 0, maxValue: 100, colors: ['#cfddfa', '#3366cc'] },
        legend: { textStyle: { fontSize: 14 } },
        tooltip: {
            trigger: 'focus',
            textStyle: {
                fontSize: 14
            },
            isHtml: true
        }
    });

    // Draw Column Chart
    const columnChartData = google.visualization.arrayToDataTable(columnData);
    const columnChart = new google.visualization.ColumnChart(document.getElementById('columnchart'));
    columnChart.draw(columnChartData, {
        colors: ['#6a98f6', '#3366cc'],
        tooltip: {
            textStyle: {
                fontSize: 14
            },
            trigger: 'focus',
            isHtml: true
        },
        legend: {
            position: 'none',
        },
        hAxis: {
            title: '',
            textStyle: {
                fontSize: 12
            }
        },
        vAxis: {
            title: '',
            format: '#\'%\'', // Format Y-axis values as percentages
            viewWindow: {
                min: 0,
                max: 100
            },
            textStyle: {
                fontSize: 12
            }
        }
    });
}

// Function to update the table dynamically with percentage values
function updateLegendTable() {
    const geoData = JSON.parse(localStorage.getItem('geoData'));

    const legendDiv = document.getElementById('legend_div');
    legendDiv.innerHTML = ''; // Clear previous content

    geoData.forEach((item) => {
        if (item[0] !== 'Country') {
            const legendItem = document.createElement('div');
            legendItem.className = 'legend-item';

            const countryDiv = document.createElement('div');
            countryDiv.className = 'legend-country';
            countryDiv.textContent = item[0];

            const percentageDiv = document.createElement('div');
            percentageDiv.className = 'legend-percentage';
            percentageDiv.textContent = `${item[1]}%`;  // Show the value in percentage

            legendItem.appendChild(countryDiv);
            legendItem.appendChild(percentageDiv);
            legendDiv.appendChild(legendItem);
        }
    });
}

// Function to set a random time and store it in localStorage
function setRandomTime() {
    const start = 4 * 60 + 12;
    const end = 6 * 60 + 45;
    const randomSeconds = Math.floor(Math.random() * (end - start + 1)) + start;

    const minutes = Math.floor(randomSeconds / 60);
    const seconds = randomSeconds % 60;

    const time = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('time-title').textContent = time;

    // Store the random time in localStorage
    localStorage.setItem('randomTime', time);
}

// Check if random time has been set in the last minute and set it if necessary
function checkAndSetRandomTime() {
    const lastSetTime = localStorage.getItem('lastSetTime');
    const currentTime = new Date().getTime();

    // Only set the random time if it hasn't been set in the last minute
    if (!lastSetTime || currentTime - lastSetTime >= 60000 ) {
        setRandomTime();  // Set random time
        localStorage.setItem('lastSetTime', currentTime);  // Store the current time in localStorage
    }
}

// Load saved random time on page load
function loadSavedRandomTime() {
    const savedTime = localStorage.getItem('randomTime');
    if (savedTime) {
        document.getElementById('time-title').textContent = savedTime;
    }
}

// Regenerate and save new data every minute
setInterval(() => {
    saveDataToLocalStorage();
    drawCharts();
    updateLegendTable();  // Update the legend table with new data
    checkAndSetRandomTime(); // Check and set the random time if necessary
}, 60000 ); // 1 minute interval

google.charts.setOnLoadCallback(() => {
    generateLineChartData();  // Generate or load the data for the line chart
    drawLineChart();           // Draw the line chart with the loaded data
    updateLineChartData();     // Start updating the line chart every 10 seconds
    drawCharts();              // Draw the pie, geo, and column charts
    updateLegendTable();       // Initialize the legend table
    loadSavedRandomTime();     // Load saved random time from localStorage
    checkAndSetRandomTime();   // Check and set the random time at startup if necessary
});
