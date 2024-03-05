import { useState, ChangeEvent } from 'react';
import { Box, Typography, TextField } from '@mui/material';
import ConditionBuilder from '../components/ConditionBuilder';
import Table from '../components/Table';
import ErrorBoundary from '../components/ErrorBoundary';
import { useDataFetching } from '../hooks/useDataFetching';
import { ConditionType } from '../@types/types';
import { comparisonOptions } from '../utils/comparisonOptions';

const Home = () => {
  const [url, setUrl] = useState<string>('');
  const [conditions, setConditions] = useState<ConditionType[][]>([[{ left: '', operator: 'equals', value: '' }]]);
  const { apiData, columns, loading, error, filteredData } = useDataFetching({ url, conditions });

  const handleLeftConditionChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].left = event.target.value;
    setConditions(newConditions);
  };

  const handleOperatorChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
    const newConditions = [...conditions];
    newConditions[groupIndex][index].operator = event.target.value;
    setConditions(newConditions);
  };

  const handleValueChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, groupIndex: number, index: number) => {
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

  const handleUrlChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Box className="flex flex-col items-center justify-center w-full mt-4">
      <Box className="flex flex-col items-start w-3/4 mt-4">
        <Typography variant="h2" data-testid="home-heading">
          Condition Builder
        </Typography>
      </Box>

      <TextField
        className="w-3/4"
        label="Url"
        helperText="Insert data url. Returning data MUST be an array json with each element is key/value pair."
        value={url}
        onChange={handleUrlChange}
        data-testid="home-url-input"
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
            filteredData={filteredData}
          />
        </>
      )}
    </Box>
  );
};

export default Home;
