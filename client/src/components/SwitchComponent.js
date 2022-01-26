import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';

const SwitchComponent = ({ checked, setChecked, setStartIndex }) => {
  const onChangeHandler = e => {
    setChecked(e.target.checked);
    setStartIndex(0);
  };

  return (
    <Stack
      direction='row'
      alignItems='center'
      sx={{ width: 'fit-content', mr: '15px' }}
    >
      <Typography>TV Shows</Typography>
      <Switch checked={checked} onChange={onChangeHandler} />
      <Typography>Movies</Typography>
    </Stack>
  );
};

export default SwitchComponent;
