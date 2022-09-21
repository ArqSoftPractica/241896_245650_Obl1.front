import { Card, CardContent, Box, Typography } from '@mui/material';

export interface Props {
  title?: string;
  children: React.ReactNode;
}

const BaseCard: React.FC<Props> = ({ title, children }) => {
  return (
    <Card sx={{ border: '1px #a7e3f4 solid' }}>
      {title && (
        <Box p={2} display="flex" alignItems="center" justifyContent="space-between" style={{ margin: '0 30px' }}>
          <Typography variant="h4">{title}</Typography>
        </Box>
      )}
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
