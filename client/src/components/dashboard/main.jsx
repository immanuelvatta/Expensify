import Box from '@mui/joy/Box';

export default function Main({ children }) {
  return (
    <Box
      component="main"
      className="MainContent"
      sx={{
        flex: 1,
      }}
    >
      {children}
    </Box>
  );
}