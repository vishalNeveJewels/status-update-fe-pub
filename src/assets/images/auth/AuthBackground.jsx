import Box from '@mui/material/Box';
import diamondHead from 'assets/images/logo/diamondHead.png';
import diamondBody from 'assets/images/logo/diamondBody.png';

export default function AuthBackground() {
  return (
    <Box
      sx={{
        position: 'absolute',
        left: '2.5%',
        bottom: '25%',
        zIndex: -1,
        transform: 'inherit'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <img width={70} src={diamondHead} alt="diamond head" />
        <img width={120} src={diamondBody} alt="diamond body" />
      </Box>
    </Box>
  );
}
