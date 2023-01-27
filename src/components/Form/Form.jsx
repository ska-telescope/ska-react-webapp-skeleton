import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Slider,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { DEFAULTS, ARR_FAVOURITES, ARR_GENDER, ARR_OS } from './formConstants';

// TODO : Add in language translation

const Form = () => {
  const [formValues, setFormValues] = useState(DEFAULTS);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSliderChange = name => (_e, value) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const handleToggleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.checked });
  };

  const handleSubmit = event => {
    event.preventDefault();
  };

  function title(name) {
    return <Typography>{name}</Typography>;
  }

  function radioGroup(name, array, value) {
    return (
      <Box m={1} style={{ width: '25vw' }}>
        <Card variant="outlined">
          {title(name)}
          <CardContent>
            <RadioGroup name={name} value={value} onChange={handleInputChange} row>
              {array.map(el => (
                <FormControlLabel key={el} value={el} control={<Radio size="small" />} label={el} />
              ))}
            </RadioGroup>
          </CardContent>
        </Card>
      </Box>
    );
  }

  function slider(name, array, value) {
    return (
      <Box m={1} style={{ width: '25vw' }}>
        <Card variant="outlined">
          {title(name)}
          <CardContent>
            <Slider
              value={value}
              onChange={handleSliderChange('favoriteNumber')}
              defaultValue={1}
              step={1}
              min={1}
              max={3}
              marks={array}
              valueLabelDisplay="off"
            />
          </CardContent>
        </Card>
      </Box>
    );
  }

  function toggle(name, beforeLabel, afterLabel, value) {
    return (
      <Box m={1} style={{ width: '25vw' }}>
        <Card variant="outlined">
          {title(name)}
          <CardContent>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>{beforeLabel}</Typography>
              <Switch name={name} checked={value} onChange={handleToggleChange} />
              <Typography>{afterLabel}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    );
  }

  function dropDown(name, array, value) {
    return (
      <Box m={1} style={{ width: '25vw' }}>
        <Card variant="outlined">
          {title(name)}
          <CardContent>
            <FormControl>
              <Select name="os" value={value} onChange={handleInputChange}>
                {array.map(el => (
                  <MenuItem key={el} value={el}>
                    {el}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </CardContent>
        </Card>
      </Box>
    );
  }

  function dataInput(name, type, value, required) {
    return (
      <Box m={1} style={{ width: '25vw' }}>
        <Card variant="outlined">
          {title(name)}
          <CardContent>
            <TextField
              required={required}
              id={`${name}Id`}
              name={name}
              label={name}
              type={type}
              value={value}
              onChange={handleInputChange}
            />
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box m={1} width="100vw">
      <Card variant="outlined" onSubmit={handleSubmit}>
        <CardContent>
          {dropDown('operating system', ARR_OS, formValues.os)}
          {dataInput('name', 'text', formValues.name, true)}
          {dataInput('age', 'number', formValues.age, false)}
          {radioGroup('gender', ARR_GENDER, formValues.gender)}
          {slider('favouriteNumber', ARR_FAVOURITES, formValues.favoriteNumber)}
          {toggle('mid', 'low', 'mid', formValues.mid)}
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};
export default Form;
