import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { AuthContext } from '../context/authContext';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


function Navbar() {
  let navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const onLogout = () => {
    logout();
    navigate('/');
  };

  console.log(user);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>Home</Link>
            <Link to="/features" style={{ textDecoration: 'none', color: 'white' }}>Features</Link>
            <Link to="/about" style={{ textDecoration: 'none', color: 'white' }}>About</Link>
          </Typography>
          <Box alightitems="right" sx={{ flexGrow: 1, textAlign: "right" }}>

            {/* If user is logged in, show logout button, else show login and register buttons */}
            {user ?
              <>
                <Button style={{ textDecoration: 'none', color: 'white' }} onClick={onLogout}>Logout</Button>
              </>

              :

              <>
                <Button color="inherit"><Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>Login</Link></Button>
                <Button color="inherit"><Link to="/register" style={{ textDecoration: 'none', color: 'white' }}>Register</Link></Button>
              </>
            }
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
