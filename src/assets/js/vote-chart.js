function showChart(confirmedCount, overturnedCount) {

  const ctx = document.getElementById('myChart');
  const totalCount = confirmedCount + overturnedCount
  const barColors = ["#2E75B6", "#D04334"];

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Confirm', 'Overturn'],
      datasets: [{
        backgroundColor: barColors,
        data: [
          Math.round((confirmedCount / totalCount) * 100),
          Math.round((overturnedCount / totalCount) * 100)
        ],
        borderWidth: 1
      }]
    },
    options: {
      title: {
        display: true,
        text: 'Vote Summary'
      },
      legend: {display: false},
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            min: 0,
            stepSize: 20
            }
        }]
      },
      responsive: true
    }
  });
}
