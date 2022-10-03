import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import formatDate from 'src/utils/formatDate';
import BaseCard from '../../baseCard/BaseCard';
import chartOptions from './ChartConfig';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface Props {
  fromDate: Date;
  toDate: Date;
  chartData: ApexAxisChartSeries | ApexNonAxisChartSeries | undefined;
  categories: string[] | undefined;
}

const CategoriesChart: React.FC<Props> = ({ fromDate, toDate, chartData, categories }) => {
  const [categoriesChartOptions, setCategoriesChartOptions] = React.useState(chartOptions);

  const periodOfData = `${formatDate(fromDate)} - ${formatDate(toDate)}`;

  useEffect(() => {
    if (categories) {
      setCategoriesChartOptions((prev) => ({
        ...prev,
        xaxis: {
          ...prev.xaxis,
          categories,
        },
      }));
    }
  }, [categories]);

  return (
    <BaseCard title={`Expenses per Category (${periodOfData})`}>
      {chartData && <Chart options={categoriesChartOptions} series={chartData} type="bar" height="400px" />}
    </BaseCard>
  );
};

export default CategoriesChart;
