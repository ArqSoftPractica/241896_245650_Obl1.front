import React from 'react';
import dynamic from 'next/dynamic';
import BaseCard from '../../baseCard/BaseCard';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const CategoriesChart = () => {
  const categoriesChartOptions = {
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
      type: 'category',
      categories: ['1/09/2022 - 21/09/2022'],
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

  const categoriesChartSeries = [
    {
      name: 'Food',
      data: [355],
    },
    {
      name: 'Electronics',
      data: [210],
    },
    {
      name: 'Clothing',
      data: [680],
    },
    {
      name: 'Entertainment',
      data: [30],
    },
    {
      name: 'Education',
      data: [200],
    },
  ];

  return (
    <BaseCard title="Expenses per Category (1/09/2022 - 21/09/2022)">
      <Chart options={categoriesChartOptions} series={categoriesChartSeries} type="bar" height="400px" />
    </BaseCard>
  );
};

export default CategoriesChart;
