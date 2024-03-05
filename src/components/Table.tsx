import { Box, Typography, Chip, Skeleton } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface ApiDataRowType {
  [key: string]: string | number | Array<string | number>;
}

interface TableProps {
  apiData: ApiDataRowType[];
  columns: GridColDef[];
  loading: boolean;
  filterData: () => ApiDataRowType[];
}

const Table = ({ apiData, columns, loading, filterData }: TableProps) => {
  return (
    <Box className="flex flex-col items-start w-3/4 mt-8">
      <Typography variant="h4" className="!font-extrabold">
        Result
      </Typography>

      <Box className="flex gap-4 mt-2 mb-2">
        <Chip label={`Total: ${apiData.length || '-'}`} />
        <Chip color="primary" label={`Filtered: ${filterData().length || '-'}`} />
      </Box>

      {loading && (
        <Box className="flex gap-2 mt-2 mb-2">
          <Skeleton variant="rectangular" className="w-32 !h-6" />
          <Skeleton variant="rectangular" className="w-32 !h-6" />
        </Box>
      )}

      <Box className="flex flex-col items-center justify-center w-full mt-2">
        <Box className="w-full">
          {loading ? (
            <Box className="flex flex-col items-center gap-4">
              <Skeleton variant="rectangular" className="w-full !h-6" />
              <Skeleton variant="rectangular" className="w-full !h-6" />
              <Skeleton variant="rectangular" className="w-full !h-6" />
              <Skeleton variant="rectangular" className="w-full !h-6" />
              <Skeleton variant="rectangular" className="w-full !h-6" />
            </Box>
          ) : (
            <DataGrid
              rows={filterData()}
              columns={columns}
              pagination
              initialState={{
                pagination: {
                  paginationModel: { pageSize: 25, page: 0 },
                },
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Table;