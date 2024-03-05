import { Box, Typography } from '@mui/material';
import { ErrorBoundaryProps } from '../@types/types';

const ErrorBoundary = ({ error }: ErrorBoundaryProps) => {
  return (
    <>
      {error && (
        <Box className="flex flex-col items-center w-3/4 mt-4" data-testid="error-boundary">
          <Typography variant="body1" className="text-red-500" data-testid="error-boundary-message">
            {error}
          </Typography>
        </Box>
      )}
    </>
  );
};

export default ErrorBoundary;