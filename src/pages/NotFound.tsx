import { Box, Typography } from '@mui/material';

const NotFoundPage = () => {
  return (
    <Box className="flex flex-col items-center justify-center mt-8">
      <Typography variant="h3">404 - Page not found</Typography>
      <Typography variant="body1">The page you are looking for could not be found.</Typography>
    </Box>
  );
};

export default NotFoundPage;