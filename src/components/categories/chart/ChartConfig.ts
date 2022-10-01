const chartOptions = {
  grid: {
    show: true,
    borderColor: 'transparent',
    strokeDashArray: 2,
    padding: {
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '42%',
      endingShape: 'rounded',
      borderRadius: 5,
    },
  },
  colors: ['#fb9678', '#03c9d7'],
  fill: {
    type: 'solid',
    opacity: 1,
  },
  chart: {
    offsetX: -15,
    toolbar: {
      show: false,
    },
    foreColor: '#adb0bb',
    fontFamily: "'DM Sans',sans-serif",
    sparkline: {
      enabled: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 0,
  },
  legend: {
    show: false,
  },
  xaxis: {
    categories: [''],
    labels: {
      style: {
        cssClass: 'grey--text lighten-2--text fill-color',
      },
    },
  },
  yaxis: {
    show: true,
    min: 0,
    tickAmount: 3,
    labels: {
      style: {
        cssClass: 'grey--text lighten-2--text fill-color',
      },
    },
  },
  stroke: {
    show: true,
    width: 5,
    colors: ['transparent'],
  },
  tooltip: {
    theme: 'dark',
  },
};

export default chartOptions;
