import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { useAuth } from 'react-oidc-context';
import Button from '@mui/material/Button';

function SignIn() {
  const auth = useAuth();
  
  const startAuthProcess = () => {
    auth.signinRedirect();
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <Button
      onClick={startAuthProcess}
      fullWidth
      variant="contained"
      sx={{ mt: 3, mb: 2 }}
      startIcon={<img src={"https://seeklogo.com/images/G/gitlab-logo-757620E430-seeklogo.com.png"} alt="GitLab" />} // place your GitLab logo here
    >
      Sign In with GitLab
    </Button>
    </Box>
  );
}

export default SignIn;
