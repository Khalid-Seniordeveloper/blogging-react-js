import { onAuthStateChanged } from 'firebase/auth'
import React, { useEffect, useState } from 'react'

import { auth, getData, signOutUser } from '../../Configurations/Firebasemethods'
import { Link, useNavigate } from 'react-router-dom';
// import Logo from '../assets/images/Logo.jpg'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Logo from '../../assets/Images/Logo.jpg';


const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Dashboard'];


const Navbar = () => {

  const handleLogout = async () => {
    try {
      await signOutUser();
      // Optionally, you can redirect or show a message after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };
  

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigate = useNavigate();

  const [isUser , setisUser] = useState(false)
const [data , setdata] = useState([]);
  useEffect ( ()=>{

const checkUser = ()=>{
  onAuthStateChanged (auth , async(user)=>{

    if (user){
        setisUser(true)
       try {
        const gettingImage = await getData('users' , auth.currentUser.uid)
        console.log(gettingImage);
        
       } catch (error) {
        console.error(error)
        
       }
        return;
    } else {
        navigate('/login')
    }

})

}
checkUser()
 

  }, [])

return (
  <>
 <AppBar position="static">
  <Container maxWidth="xl">
    <Toolbar disableGutters>
      <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />

      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{ display: { xs: 'block', md: 'none' } }}
        >
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
            <li>
              <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>Home</Link>
            </li>
            {isUser ? (
              <>
                <li>
                  <Link to="/dashboard" style={{ textDecoration: 'none', color: 'black' }}>Dashboard</Link>
                </li>
                <li>
                  <Link to="/singleuser" style={{ textDecoration: 'none', color: 'black' }}>Profile</Link>
                </li>
                <li>
                  <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'black', cursor: 'pointer', textDecoration: 'underline' }}>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}>Login</Link>
                </li>
                <li>
                  <Link to="/register" style={{ textDecoration: 'none', color: 'black' }}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </Menu>
      </Box>

      <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="#"
        sx={{
          mr: 2,
          display: { xs: 'flex', md: 'none' },
          flexGrow: 1,
          fontFamily: 'monospace',
          fontWeight: 700,
          letterSpacing: '.3rem',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        {/* Logo or Brand Name */}
      </Typography>

      <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
        <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex' }}>
          <li>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}>Home</Link>
          </li>
          {isUser ? (
            <>
              <li>
                <Link to="/dashboard" style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}>Dashboard</Link>
              </li>
              <li>
                <Link to="/singleuser" style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}>Profile</Link>
              </li>
              <li>
                <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', margin: '0 10px' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}>Login</Link>
              </li>
              <li>
                <Link to="/register" style={{ textDecoration: 'none', color: 'white', margin: '0 10px' }}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </Box>

      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="Open settings">
          <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
            <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
          </IconButton>
        </Tooltip>
        <Menu
          sx={{ mt: '45px' }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting} onClick={handleCloseUserMenu}>
              <Typography sx={{ textAlign: 'center' }}>{setting}</Typography>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Toolbar>
  </Container>
</AppBar>

</>
);

}



export default Navbar




// useEffect(()=>{
//   onAuthStateChanged(auth , (user)=>{
//       if(user){
//         uid.push({
//         uid : user.uid
//         })
//         setuid([...user.uid])
//         console.log(uid);      
//    }
//   })
//     const alldatarender = async()=>{
//   try {
//     const getalluser = await getAllData('bloogs')
//     allBlog.push(getalluser)
//     setallBlog([...getalluser])
//     console.log(allBlog); 
//   } catch (error) {
//     console.error(error)
//     }
//   }
//     alldatarender()
//    }, [])



// seEffect(() => {
//   const unsubscribe = onAuthStateChanged(auth,   
// (user) => {
//     setUser(user);
//   });

//   return () => unsubscribe();
// }, []);

// useEffect(() => {
//   if (user) {
//     const fetchData = async () => {
//       try {
//         const data = await getData('users', user.uid);
//         setUserData(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchData();
//   }
// }, [user]);