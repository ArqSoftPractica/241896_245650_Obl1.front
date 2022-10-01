import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getExpensesPerCategory } from 'src/services/expenses.service';
import { toast } from 'react-toastify';
import formatDate from 'src/utils/formatDate';
import BaseCard from '../../baseCard/BaseCard';
import categoriesChartOptions from './ChartConfig';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export interface Props {
  fromDate: Date;
  toDate: Date;
}

const CategoriesChart: React.FC<Props> = ({ fromDate, toDate }) => {
  const [chartData, setChartData] = React.useState<ApexAxisChartSeries | ApexNonAxisChartSeries | undefined>();
  const [categories, setCategories] = React.useState<string[]>();

  useEffect(() => {
    getExpensesPerCategory({ fromDate, toDate })
      .then(({ expensesPerCategory }) => {
        const data = expensesPerCategory.length > 0 ? expensesPerCategory.map(({ totalAmount }) => +totalAmount) : [];
        const categoriesData = expensesPerCategory.length > 0 ? expensesPerCategory.map(({ name }) => name) : [];
        setChartData([{ data, name: 'Total Amount' }]);
        setCategories(categoriesData);
      })
      .catch((err) => {
        toast.error(err.message);
      });
  }, [fromDate, toDate]);

  const periodOfData = `${formatDate(fromDate)} - ${formatDate(toDate)}`;

  categoriesChartOptions.xaxis.categories = categories && categories?.length > 0 ? categories : [''];

  return (
    <BaseCard title={`Expenses per Category (${periodOfData})`}>
      {chartData && <Chart options={categoriesChartOptions} series={chartData} type="bar" height="400px" />}
    </BaseCard>
  );
};

export default CategoriesChart;
