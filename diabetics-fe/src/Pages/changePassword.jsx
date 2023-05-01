import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import CreatePassword from './CreatePassword';
import Images from './Images';
import TwoWayAuthQuestions from './TwoWayAuthQuestions';
export default function ChangePassword() {
  const [value, setValue] = useState(0);
  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  }
  return (
    <Grid container>
      <Box sx={{ borderBottom: 1, borderColor: 'divider', width: "100%" }}>
        <Tabs
          className="tabs"
          value={value} variant="fullWidth"
          onChange={handleTabChange}
        >
          <Tab label="change Login Password" />
          <Tab label="Change Security questions" />
          <Tab label="Change Security images" />
        </Tabs>
        {value === 0 && (
          <div>
            <CreatePassword fromChangePassword="true" />
          </div>
        )}
        {value === 2 &&
          <div>
            <Images fromChangePassword="true" />
          </div>
        }
        {value === 1 &&
          <div>
            <TwoWayAuthQuestions fromChangePassword="true" />
          </div>
        }
      </Box>
    </Grid>
  )
}