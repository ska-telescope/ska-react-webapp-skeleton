import React from 'react';
import {
  AccordionDetails,
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import { storageObject } from '../../services/stateStorage/store';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import SearchResultList from '../SearchResultList/SearchResultList';
import { styled } from '@mui/material/styles';
import { AppService } from '../../services/AppService';
import ebById from '../../mockData/ebIdData';
import ebsByDate from '../../mockData/ebDateData';
import sbdById from '../../mockData/sdbIdData';
import sbdByDate from '../../mockData/sdbDateData';
import moment from 'moment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component={'div'}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const QuerySearch = (props: any) => {
  const [expanded, setExpanded] = React.useState<string | false>('');
  const [value, setValue] = React.useState(0);
  const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
    console.log('panel', panel, newExpanded);
    setValue(0);
    // logic for api call
    // if (panel == 'eb_panel' && newExpanded == true) {
    //
    //   // const appService = new AppService();
    //   // const getdata = async () => {
    //   //   const res = await appService.getData();
    //   // };
    // } else {
    // }
  };
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    console.log('tab value', newValue);
  };
  const created_from = moment().subtract(7, 'days');
  const created_to = moment();
  return (
    <>
      <Container>
        <Accordion expanded={expanded === 'eb_panel'} onChange={handleChange('eb_panel')}>
          <AccordionSummary aria-controls="eb_panel-content" id="eb_panel-header">
            Search for Execution Block (EB's)
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={value}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab label="Search by Dates" {...a11yProps(0)} />
                  <Tab label="Search by Id" {...a11yProps(1)} />
                </Tabs>
              </Box>

              <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        disableFuture={true}
                        value={created_from}
                        format="DD-MM-YYYY"
                        label="Created from"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        disableFuture={true}
                        value={created_to}
                        format="DD-MM-YYYY"
                        label="Created to"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="contained" color="secondary">
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <SearchResultList search="EB Id" searchType="date" data={ebsByDate} />
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextField
                      fullWidth
                      id="standard-basic"
                      label="Search by Id"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button variant="contained" color="secondary">
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <SearchResultList search="EB Id" searchType="id" data={ebById} />
                </Paper>
              </TabPanel>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={expanded === 'sbd_panel'} onChange={handleChange('sbd_panel')}>
          <AccordionSummary aria-controls="sbd_panel-content" id="sbd_panel-header">
            <Typography>Search for Scheduling Block Definition (SBD's)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  textColor="secondary"
                  indicatorColor="secondary"
                  value={value}
                  onChange={handleChangeTab}
                  aria-label="basic tabs example"
                >
                  <Tab label="Search by Dates" {...a11yProps(0)} />
                  <Tab label="Search by Id" {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        disableFuture={true}
                        value={created_from}
                        format="DD-MM-YYYY"
                        label="Created from"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                      <DatePicker
                        disableFuture={true}
                        value={created_to}
                        format="DD-MM-YYYY"
                        label="Created to"
                      />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="secondary">
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <SearchResultList search="SBD Id" searchType="date" data={sbdByDate} />
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <TextField id="standard-basic" label="Search by Id" variant="standard" />
                  </Grid>
                  <Grid item xs={3}>
                    <Button variant="contained" color="secondary">
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <SearchResultList search="SBD Id" searchType="id" data={sbdById} />
                </Paper>
              </TabPanel>
            </Box>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export default QuerySearch;
