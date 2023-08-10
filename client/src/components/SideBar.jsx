import React from 'react'
import {
    Box,Divider, Drawer,IconButton,List,ListItem,listItem,ListItemButton,ListItemIcon,ListItemText,Typography,useTheme
} from "@mui/material";
import {
    ChevronLeft,ChevronRightOutlined,HomeOutlined
    ,Groups2Outlined,ReceiptLongOutlined, PointOfSaleOutlined,TodayOutlined, DescriptionOutlined,PriceCheckOutlined, AssignmentOutlined, BallotOutlined, InventoryOutlined, PendingActionsOutlined, HistoryOutlined, NewspaperOutlined
} from "@mui/icons-material";
import { useEffect, useState } from 'react';
import { useLocation,useNavigate } from 'react-router-dom';
import FlexBetween from './FlexBetween';
import hibre from '../assets/Hibret-bank-logo.jpg'
import { useSelector } from 'react-redux';


const navItems = {
  supplier:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "TenderNews",
      icon: <NewspaperOutlined />,
    },
    {
      text: "MyTender",
      icon: <AssignmentOutlined />,
    },
    {
      text: "TenderHistory",
      icon: <HistoryOutlined />,
    },
  ],
  admin:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Employee",
      icon: <NewspaperOutlined />,
    },
    // {
    //   text: "Branch",
    //   icon: <AssignmentOutlined />,
    // },
  ],
  approvalbody:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Proposals",
      icon: <DescriptionOutlined />,
    },
    {
      text: "Report",
      icon: <HomeOutlined />,
    },
  ],
  assistant:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "RequestsForm",
      icon: <ReceiptLongOutlined />,
    },
     {
    text: "report",
    icon: null,
  },
  {
    text: "RequestStatus",
    icon: <ReceiptLongOutlined />,
  },

  ],
  manager:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "RequestAction",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "RequestStatus",
      icon: <ReceiptLongOutlined />,
    },
    
  ],
  director:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "Requests",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "TaskAssign",
      icon: <ReceiptLongOutlined />,
    },
    {
      text: "OfficerRequest",
      icon: <ReceiptLongOutlined />,
    },
  ],
  marketofficer:[
    {
      text: "Dashboard",
      icon: <HomeOutlined />,
    },
    {
      text: "MyTasks",
      icon: <AssignmentOutlined />,
    }, 
     
     {
    text: "Requests",
    icon: <ReceiptLongOutlined />,
    },
    {
      text: "UnitPrice",
      icon: <PriceCheckOutlined />,
    },
    {
      text: "Proposal",
      icon: <DescriptionOutlined />,
    },
    {
      text: "Procurment",
      icon: <InventoryOutlined />,
    },
    {
      text: "Tender",
      icon: <PendingActionsOutlined />,
    },
    {
      text: "Managment",
      icon: null,
    },
    {
      text: "Supplier",
      icon: <Groups2Outlined />,
      },
    {
    text: "onGoing",
    icon: <PointOfSaleOutlined />,
    },
    {
    text: "History",
    icon: <TodayOutlined />,
   },
  ]
  
}
  
const SideBar = ({
  user,
  drawerWidth,
  isSidebarOpen,
  setIsSidebarOpen,
  isNonMobile,
}) => {
  const userr = useSelector((state) => state.auth.user);
  // console.log(userr)
  // const userr ={
  //   username:"esepe",
  //   position:"assistant"
  // }
  const { pathname } = useLocation();
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    setActive(pathname.substring(1));
  },[pathname]);

  return (
    <Box component="nav">
      {isSidebarOpen && (
        <Drawer
          open={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          variant="persistent"
          anchor="left"
          sx={{
            width: drawerWidth,
            "& .MuiDrawer-paper": {
              color: theme.palette.secondary[200],
              backgroundColor: theme.palette.background.alt,
              boxSixing: "border-box",
              borderWidth: isNonMobile ? 0 : "2px",
              width: drawerWidth,
            },
          }}
        >
          <Box width="100%">
            <Box m="1.5rem 2rem 2rem 3rem">
              <FlexBetween color={theme.palette.secondary.main}>
                <Box display="flex" alignItems="center" gap="0.5rem" onClick={()=> navigate("/dashboard")}>
                  <Box 
                component="img"
                alt="profile"
                src={hibre}
                height="52px"
                width="52px"
                borderRadius="50%"
                sx={{ objectFit: "cover" }}
              />
              <Typography variant="h4" fontWeight="bold">
                    Hiber Procurment
                  </Typography>
                </Box>
                {!isNonMobile && (
                  <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    <ChevronLeft />
                  </IconButton>
                )}
              </FlexBetween>
            </Box>
            <List>
              {userr && (
                <>
                 {navItems[userr.position].map(({ text, icon }) => {
                if (!icon) {
                  return (
                    <Typography key={text} sx={{ m: "2.25rem 0 1rem 3rem" }}>
                      {text}
                    </Typography>
                  );
                }
                const lcText = text.toLowerCase();

                return (
                  <ListItem key={text} disablePadding>
                    <ListItemButton
                      onClick={() => {
                        navigate(`/${lcText}`);
                        setActive(lcText);
                      }}
                      sx={{
                        backgroundColor:
                          active === lcText
                            ? theme.palette.secondary[300]
                            : "transparent",
                        color:
                          active === lcText
                            ? theme.palette.primary[600]
                            : theme.palette.secondary[100],
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ml: "2rem",
                          color:
                            active === lcText
                              ? theme.palette.primary[600]
                              : theme.palette.secondary[200],
                        }}
                      >
                        {icon}
                      </ListItemIcon>
                      <ListItemText primary={text} />
                      {active === lcText && (
                        <ChevronRightOutlined sx={{ ml: "auto" }} />
                      )}
                    </ListItemButton>
                  </ListItem>
                );
              })}
                </>
               
              )}
              
            </List>
          </Box>

          <Box position="absolute" bottom="2rem">
            <Divider />
          </Box>
        </Drawer>
      )}
    </Box>
  );
};

export default SideBar