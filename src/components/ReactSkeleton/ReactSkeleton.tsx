import React from 'react';
import { Box, Grid } from '@mui/material';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  Button,
  ButtonColorTypes,
  ButtonVariantTypes,
  DropDown,
  NumberEntry,
  TextEntry
} from '@ska-telescope/ska-gui-components';

const DROPDOWN_1 = [
  { label: 'Full ( 64 x 13.5m + 133 x 15)', value: '1' },
  { label: 'MeerKAT ( 64 x 13.5m )', value: '2' },
  { label: 'SKA1 ( 133 x 15m )', value: '3' }
];
const DROPDOWN_2 = [
  { label: 'Band 1 ( 0.58 - 1.015 GHz )', value: '1' },
  { label: 'Band 2 ( 0.95 - 1.67 GMz )', value: '2' }
];
const DROPDOWN_3 = [
  { label: 'Hz', value: '1' },
  { label: 'GHz', value: '2' },
  { label: 'MHz', value: '3' },
  { label: 'KHz', value: '4' }
];
const DROPDOWN_4 = [
  { label: '1', value: '1' },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '6', value: '6' },
  { label: '8', value: '8' },
  { label: '12', value: '12' },
  { label: '24', value: '24' }
];
const DROPDOWN_5 = [
  { label: 'Natural', value: '1' },
  { label: 'Uniform', value: '2' },
  { label: 'Briggs', value: '3' }
];
const DROPDOWN_6 = [
  { label: 'None', value: '1' },
  { label: '0.439', value: '2' },
  { label: '0.878', value: '3' },
  { label: '1.755', value: '4' },
  { label: '3.511', value: '5' },
  { label: '7.022', value: '6' },
  { label: '14.044', value: '7' },
  { label: '28.088', value: '8' },
  { label: '56.176', value: '9' },
  { label: '112.351', value: '10' },
  { label: '224.702', value: '11' },
  { label: '449.404', value: '12' },
  { label: '898.809', value: '13' },
  { label: '1797.618', value: '14' },
  { label: '2247.022', value: '15' }
];
const DROPDOWN_7 = [
  { label: 'Integration Time', value: '1' },
  { label: 'Sensitivity', value: '2' }
];
const DROPDOWN_8 = [
  { label: 'ms', value: '1' },
  { label: 'us', value: '2' },
  { label: 'ns', value: '3' },
  { label: 'min', value: '4' },
  { label: 'h', value: '5' },
  { label: 'm', value: '6' },
  { label: 's', value: '7' }
];

const ReactSkeleton = () => {
  const [field01, setField01] = React.useState('1');
  const [field02, setField02] = React.useState('1');
  const [field03, setField03] = React.useState('13:25:27:60');
  const [field04, setField04] = React.useState('-43:01:09:00');
  const [field05, setField05] = React.useState('');
  const [field06, setField06] = React.useState('');
  const [field07, setField07] = React.useState('0.7975');
  const [field08, setField08] = React.useState('2');
  const [field09, setField09] = React.useState('0.435');
  const [field10, setField10] = React.useState('2');
  const [field11, setField11] = React.useState(30);
  const [field12, setField12] = React.useState('13.44 kHz (5.1 km/s)');
  const [field13, setField13] = React.useState('3');
  const [field14, setField14] = React.useState('40.32 KHz ( 15.2 km/s )');
  const [field15, setField15] = React.useState('1');
  const [field16, setField16] = React.useState('1');
  const [field17, setField17] = React.useState('1');
  const [field18, setField18] = React.useState('600');
  const [field19, setField19] = React.useState('7');

  return (
    <Box m={1}>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid data-testid="textLabel" item md={6}>
          <DropDown
            label="Array Configuration"
            value={field01}
            setValue={setField01}
            options={DROPDOWN_1}
          />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <DropDown
            label="Observing Band"
            value={field02}
            setValue={setField02}
            options={DROPDOWN_2}
          />
        </Grid>
        <Grid data-testid="textLabel" item md={3}>
          <TextEntry label="Right Ascension" value={field03} setValue={setField03} required />
        </Grid>
        <Grid data-testid="textLabel" item md={3}>
          <TextEntry label="Declination" value={field04} setValue={setField04} required />
        </Grid>
        <Grid data-testid="textLabel" item md={3}>
          <TextEntry label="Elevation" value={field05} setValue={setField05} />
        </Grid>
        <Grid data-testid="Weather PWV" item md={3}>
          <TextEntry label="Array Configuration" value={field06} setValue={setField06} />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid data-testid="textLabel" item md={10}>
              <TextEntry label="Central Frequency" value={field07} setValue={setField07} />
            </Grid>
            <Grid data-testid="textLabel" item md={2}>
              <DropDown label="" value={field08} setValue={setField08} options={DROPDOWN_3} />
            </Grid>
          </Grid>
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid data-testid="textLabel" item md={10}>
              <TextEntry label="Continuum Bandwidth" value={field09} setValue={setField09} />
            </Grid>
            <Grid data-testid="textLabel" item md={2}>
              <DropDown label="" value={field10} setValue={setField10} options={DROPDOWN_3} />
            </Grid>
          </Grid>
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <NumberEntry label="Number of Chunks" value={field11} setValue={setField11} />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <TextEntry label="Spectral Resolution" value={field12} disabled />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <DropDown
            label="Spectral Averaging"
            value={field13}
            setValue={setField12}
            options={DROPDOWN_4}
          />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <TextEntry label="Effective resolution" value={field14} disabled />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <DropDown
            label="Image Weighting"
            value={field15}
            setValue={setField15}
            options={DROPDOWN_5}
          />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <DropDown label="Tapering" value={field16} setValue={setField16} options={DROPDOWN_6} />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <DropDown label="Supplied" value={field17} setValue={setField17} options={DROPDOWN_7} />
        </Grid>
        <Grid data-testid="textLabel" item md={6}>
          <Grid
            container
            spacing={0}
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid data-testid="textLabel" item md={10}>
              <NumberEntry label="Integration Time" value={field18} setValue={setField18} />
            </Grid>
            <Grid data-testid="textLabel" item md={2}>
              <DropDown label="" value={field19} setValue={setField19} options={DROPDOWN_8} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        container
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Grid data-testid="textLabel" item>
          <Button
            color={ButtonColorTypes.Secondary}
            icon={<RefreshIcon />}
            label="Reset"
            toolTip={'Reset'}
            variant={ButtonVariantTypes.Contained}
          />
        </Grid>
        <Grid data-testid="textLabel" item>
          <Button
            color={ButtonColorTypes.Secondary}
            icon={<DoneOutlinedIcon />}
            label="Calculate"
            toolTip={'Calculate'}
            variant={ButtonVariantTypes.Contained}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReactSkeleton;
