import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, MenuItem, IconButton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';

interface ApiDataRowType {
  [key: string]: string | number | Array<string | number>;
}

const Home = () => {
  const [apiData, setApiData] = useState<ApiDataRowType[]>([]);
  const [columns, setColumns] = useState<GridColDef[]>([]);
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
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
        }
      } catch (error) {
        console.error('Error getting API info:', error);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url]);

  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Box className="flex flex-col items-center justify-center mt-4 w-full">
      <Typography variant="h2">
        Condition Builder
      </Typography>

      <TextField
        className="w-3/4"
        label="Url"
        helperText="Insert data url. Returning data MUST be an array json with each element is key/value pair."
        value={url}
        onChange={handleUrlChange}
      />

      <Box className="flex items-center gap-4 justify-center mt-4 p-4 w-3/4 border shadow-md">
        <TextField
          className="w-1/3"
          value={"test"}
          onChange={() => { }}
          select
          label="Label"
        >
          <MenuItem key={1} value="test">
            Test 1
          </MenuItem>
          <MenuItem key={2} value="test2">
            Test 2
          </MenuItem>
        </TextField>

        <TextField
          className="w-1/3"
          value={"test"}
          onChange={() => { }}
          select
          label="Label"
        >
          <MenuItem key={1} value="test">
            Test 1
          </MenuItem>
          <MenuItem key={2} value="test2">
            Test 2
          </MenuItem>
        </TextField>

        <TextField
          className="w-1/3"
          placeholder="Value"
          value="Test"
          onChange={() => { }}
        />

        <IconButton >
          <AddIcon />
        </IconButton>

        <IconButton >
          <DeleteIcon />
        </IconButton>
      </Box>

      <Typography variant="h3" className="font-extrabold">
        Result
      </Typography>

      <Box className="flex flex-col items-center justify-center w-3/4">
        <Box className="w-full">
          <DataGrid
            rows={apiData}
            columns={columns}
            pagination
            initialState={{
              pagination: {
                paginationModel: { pageSize: 25, page: 0 },
              },
            }}
          />
        </Box>
      </Box>
    </Box >
  );
};

export default Home;
