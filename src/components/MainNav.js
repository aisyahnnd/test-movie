import * as React from 'react';
import { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import MovieIcon from '@mui/icons-material/Movie';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/router';
import Link from 'next/link';

const useStyles = makeStyles({
    root: {
        backgroundColor: 'black',
    },
})

export default function SimpleBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const router = useRouter();

    useEffect(() => {
        if (value === 0) {
          router.push("/");
        } else if (value === 1) {
          router.push("/Movies/Movies");
        } else if (value === 2) {
          router.push("/search");
        } 
      }, [value, router]);

    return (
        <Box sx={{ 
            width: '100%',
            position: 'fixed',
            bottom: 0,
            zIndex: 100
        }}>
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
                style={{ backgroundColor: "black" }}
            >
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Trending"
                    icon={<WhatshotIcon />}
                />

                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Movies"
                    icon={<MovieIcon />}
                />
                
                <BottomNavigationAction
                    style={{ color: "white" }}
                    label="Search"
                    icon={<SearchIcon />}
                />
            </BottomNavigation>
        </Box> 
    );
}