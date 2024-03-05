import { useState, useEffect } from 'react';
import { GridColDef } from '@mui/x-data-grid';
import { UseDataFetchingProps, UseDataFetchingResult, ApiDataRowType } from '../@types/types';

export const useDataFetching = ({ url, conditions }: UseDataFetchingProps): UseDataFetchingResult => {
  const [apiData, setApiData] = useState<ApiDataRowType[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data: ApiDataRowType[] = await response.json();

        if (data.length > 0) {
          const columns = Object.keys(data[0]).map((columnName: string) => ({
            field: columnName,
            headerName: columnName,
            flex: 1,
            sortable: true,
          }));
          setColumns(columns);
          setApiData(data);
          setError('');
        }
      } catch (error) {
        console.error('Error getting API info:', error);
        setError('Failed to fetch data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const filterData = () => {
    if (conditions.length === 0) {
      return apiData;
    }

    const filteredConditions = conditions?.filter(groupConditions =>
      groupConditions.some(condition => condition.left && condition.operator && condition.value)
    );

    if (filteredConditions.length === 0) {
      return apiData;
    }

    return apiData?.filter((rowData) =>
      filteredConditions?.every((groupConditions) =>
        groupConditions?.some((condition) => {
          const { left, operator, value } = condition;
          const columnValue = rowData[left];

          if (!left || !operator || !value) {
            return true;
          }

          switch (operator) {
            case 'equals':
              return String(columnValue) === value;
            case 'greaterThan':
              return Number(columnValue) > Number(value);
            case 'lessThan':
              return Number(columnValue) < Number(value);
            case 'contain':
              return String(columnValue).includes(value);
            case 'notContain':
              return !String(columnValue).includes(value);
            case 'regex':
              return new RegExp(value).test(String(columnValue));
            default:
              return true;
          }
        })
      )
    );
  };

  return { apiData, columns, loading, error, filteredData: filterData() };
};