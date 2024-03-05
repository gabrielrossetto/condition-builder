import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import ConditionBuilder from '../components/ConditionBuilder';
import Table from '../components/Table';
import ErrorBoundary from '../components/ErrorBoundary';
interface ApiDataRowType {
  [key: string]: string | number | Array<string | number>;
}
interface Condition {
  left: string;
  operator: string;
  value: string;
}

const comparisonOptions = [
  { label: 'Equals', value: 'equals' },
  { label: 'Greater than', value: 'greaterThan' },
  { label: 'Less than', value: 'lessThan' },
  { label: 'Contain', value: 'contain' },
  { label: 'Not Contain', value: 'notContain' },
  { label: 'Regex', value: 'regex' },
];

const Home = () => {
  const [apiData, setApiData] = useState<ApiDataRowType[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [url, setUrl] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [conditions, setConditions] = useState<Condition[][]>([[{ left: '', operator: 'equals', value: '' }]]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(url);
        const data: ApiDataRowType[] = await response.json();

        if (data.length > 0) {
          const columns: GridColDef[] = Object.keys(data[0]).map((columnName: string) => ({
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

  const handleLeftConditionChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].left = event.target.value;
    setConditions(newConditions);
  };

  const handleOperatorChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].operator = event.target.value;
    setConditions(newConditions);
  };

  const handleValueChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].value = event.target.value;
    setConditions(newConditions);
  };

  const handleAddCondition = (groupIndex: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex] = [
      ...newConditions[groupIndex],
      { left: '', operator: 'equals', value: '' }
    ];
    setConditions(newConditions);
  };

  const handleMouseEnterAddIcon = (groupIndex: number) => {
    const newConditions = [...conditions];
    const hasFakeOR = newConditions[groupIndex].some(condition => condition.operator === 'OR_HOVER');

    if (!hasFakeOR) {
      newConditions[groupIndex] = [
        ...newConditions[groupIndex],
        { left: '', operator: 'OR_HOVER', value: '' }
      ];
      setConditions(newConditions);
    }
  };

  const handleMouseLeaveAddIcon = (groupIndex: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex] = newConditions[groupIndex].filter(condition => condition.operator !== 'OR_HOVER');
    setConditions(newConditions);
  };

  const handleDeleteCondition = (groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    const group = newConditions[groupIndex];
    group.splice(index, 1);

    if (group.length === 0) {
      newConditions.splice(groupIndex, 1);
    }

    setConditions(newConditions);
  };

  const handleAddGroup = () => {
    setConditions([...conditions, [{ left: '', operator: 'equals', value: '' }]]);
  };

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUrl(event.target.value);
  };

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

  return (
    <Box className="flex flex-col items-center justify-center w-full mt-4">
      <Box className="flex flex-col items-start w-3/4 mt-4">
        <Typography variant="h2">
          Condition Builder
        </Typography>
      </Box>

      <TextField
        className="w-3/4"
        label="Url"
        helperText="Insert data url. Returning data MUST be an array json with each element is key/value pair."
        value={url}
        onChange={handleUrlChange}
      />

      <ErrorBoundary error={error} />

      {error === '' && url && (
        <>
          <ConditionBuilder
            comparisonOptions={comparisonOptions}
            conditions={conditions}
            columns={columns}
            handleLeftConditionChange={handleLeftConditionChange}
            handleOperatorChange={handleOperatorChange}
            handleValueChange={handleValueChange}
            handleAddCondition={handleAddCondition}
            handleMouseEnterAddIcon={handleMouseEnterAddIcon}
            handleMouseLeaveAddIcon={handleMouseLeaveAddIcon}
            handleDeleteCondition={handleDeleteCondition}
            handleAddGroup={handleAddGroup}
            loading={loading}
            url={url}
          />

          <Table
            apiData={apiData}
            columns={columns}
            loading={loading}
            filterData={filterData}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
