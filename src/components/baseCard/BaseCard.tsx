import { Card, CardContent, Box, Typography } from '@mui/material';

export interface Props {
  title: string;
  children: React.ReactNode;
}

const BaseCard: React.FC<Props> = ({ title, children }) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{title}</Typography>
      </Box>
      <CardContent>{children}</CardContent>
    </Card>
  );
};

export default BaseCard;
