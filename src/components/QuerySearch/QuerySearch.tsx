import React from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import moment from 'moment';
import { DateEntry, TextEntry } from '@ska-telescope/ska-gui-components';
import ebsByDate from '../../mockData/ebDateData';
import ebDetails from '../../mockData/ebIdData';
import sbdByDate from '../../mockData/SbdMockData';
import EBTableList from '../EBTableList/EBTableList';
import SBDTableList from '../SBDTableList/SBDTableList';
import sbdDetails from '../../mockData/sdbIdData';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

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

const QuerySearch = () => {
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [expanded, setExpanded] = React.useState<string | false>('eb_panel');
  const [value, setValue] = React.useState(0);
  const handleAccordianChange = (panel: string) => (
    event: React.SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
    setId('');
    setValue(0);
    setSearchType('last 7 days');
    if (newExpanded === true && panel === 'sbd_panel') {
      getDataList('sbds', created_after, created_before);
    } else if (newExpanded === true && panel === 'eb_panel') {
      getDataList('ebs', created_after, created_before);
    }

    setCreatedAfter('');
    setCreatedBefore('');
  };
  const [id, setId] = React.useState<string>('');
  const [searchedDataList, getDetailDataList] = React.useState<any>([]);
  const [searchFor, setSearchType] = React.useState<string>('last 7 days');
  const [created_after, setCreatedAfter] = React.useState<string>('');
  const [created_before, setCreatedBefore] = React.useState<string>('');
  const [dataList, getData] = React.useState<any>([]);

  React.useEffect(() => {
    const created_after = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD');
    const created_before = moment().format('YYYY-MM-DD');
    setSearchType('last 7 days');
    getData(ebsByDate);
    if (expanded === 'eb_panel') {
      getDataList('ebs', created_after, created_before);
    } else {
      getDataList('sbds', created_after, created_before);
    }
  });

  function getDataList(searchFor: string, created_after: string, created_before: string) {
    const baseURL = `https://k8s.stfc.skao.int/staging-ska-db-oda/api/v1/${searchFor}?created_before=${created_before}&created_after=${created_after}`;
    if (searchFor === 'ebs') {
      getData(ebsByDate);
    } else {
      getData(sbdByDate);
    }
    console.log('baseURL', baseURL);
    const detailDataList: any = [];
    axios
      .get('')
      .then((response: any) => {
        for (let i = 0; i < dataList.length; i++) {
          if (searchFor === 'ebs') {
            const data = {
              id: dataList[i],
              metadata: ebDetails
            };
            detailDataList.push(data);
          } else {
            const data = {
              id: dataList[i],
              metadata: sbdDetails
            };
            detailDataList.push(data);
          }
        }
        getDetailDataList(detailDataList);
      })
      .catch((error: any) => {
        console.error(error);
      });

    return detailDataList;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  function getDetails(searchFor: string, id: string) {
    const url = `https://k8s.stfc.skao.int/staging-ska-db-oda/api/v1/${searchFor}/${id}`;
    axios
      .get(url)
      .then((response: any) => {
        return response;
      })
      .catch((error: any) => {
        console.error(error);
      });
  }

  function searchClicked(searchFor: string, searchType: string) {
    if (searchType === 'today') {
      setSearchType('today');
      const created_after = moment().format('YYYY-MM-DD');
      const created_before = moment().format('YYYY-MM-DD');
      getDataList(searchFor, created_after, created_before);
    } else if (searchType === 'last 7 days') {
      const created_after = moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD');
      const created_before = moment().format('YYYY-MM-DD');
      setSearchType('last 7 days');
      getDataList(searchFor, created_after, created_before);
    } else if (searchType === 'dates' && created_after && created_before) {
      getDataList(searchFor, created_after, created_before);
    }
  }

  function validateDates() {
    if (created_after !== '' && created_before !== '') {
      if (Date.parse(created_after) < Date.parse(created_before)) {
        return '';
      } else {
        return 'Invalid dates selected';
      }
    }
  }

  return (
    <>
      <Container>
        <Accordion expanded={expanded === 'eb_panel'} onChange={handleAccordianChange('eb_panel')}>
          <AccordionSummary
            sx={{
              backgroundColor: '#c1c6ca'
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="eb_panel-content"
            id="eb_panel-header"
          >
            <Typography>Search for Execution Block (EB's)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box sx={{ width: '100%' }}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  textColor="inherit"
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
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={7}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label="Last 7 days"
                        onClick={() => searchClicked('ebs', 'last 7 days')}
                      />
                      <Chip label="Today" onClick={() => searchClicked('ebs', 'today')} />
                      <DateEntry
                        errorText={validateDates()}
                        label="Start date"
                        value={created_after}
                        setValue={setCreatedAfter}
                      />
                      <DateEntry
                        errorText={validateDates()}
                        label="End date"
                        value={created_before}
                        setValue={setCreatedBefore}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12} sm={6} md={1}>
                    <Button
                      disabled={false}
                      variant="contained"
                      color="secondary"
                      onClick={() => searchClicked('ebs', 'dates')}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <Box sx={{ p: 1 }}>
                    {searchFor === 'today' && <p>Showing records for today.</p>}
                    {searchFor === 'last 7 days' && <p>Showing records for last 7 days.</p>}
                    {searchFor === 'dates' && created_after && created_before && (
                      <p>Showing records for searched dates.</p>
                    )}
                  </Box>
                  {expanded === 'eb_panel' ? (
                    <>
                      <EBTableList search="EB Id" searchType="ebs" data={searchedDataList} />
                    </>
                  ) : (
                    ''
                  )}
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextEntry required={true} label="Search by Id" value={id} setValue={setId} />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => searchClicked('ebs', 'ebId')}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
              </TabPanel>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion
          expanded={expanded === 'sbd_panel'}
          onChange={handleAccordianChange('sbd_panel')}
        >
          <AccordionSummary
            sx={{
              backgroundColor: '#c1c6ca'
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="sbd_panel-content"
            id="sbd_panel-header"
          >
            <Typography>Search for Scheduling Block Definition (SBD's)</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AccordionDetails>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <Tabs
                    textColor="inherit"
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
                  <Grid container spacing={1}>
                    <Grid item xs={12} sm={12} md={7}>
                      <Stack direction="row" spacing={1}>
                        <Chip
                          label="Last 7 days"
                          onClick={() => searchClicked('sbds', 'last 7 days')}
                        />
                        <Chip label="Today" onClick={() => searchClicked('sbds', 'today')} />
                        <DateEntry
                          errorText={validateDates()}
                          label="Start date"
                          value={created_after}
                          setValue={setCreatedAfter}
                        />
                        <DateEntry
                          errorText={validateDates()}
                          label="End date"
                          value={created_before}
                          setValue={setCreatedBefore}
                        />
                      </Stack>
                    </Grid>

                    <Grid item xs={12} sm={6} md={1}>
                      <Button
                        disabled={false}
                        variant="contained"
                        color="secondary"
                        onClick={() => searchClicked('sbds', 'sbdDate')}
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                  <Paper elevation={2} sx={{ marginTop: 4 }}>
                    <Box sx={{ p: 1 }}>
                      {searchFor === 'today' && <p>Showing records for today.</p>}
                      {searchFor === 'last 7 days' && <p>Showing records for last 7 days.</p>}
                      {searchFor === 'dates' && created_after && created_before && (
                        <p>Showing records for searched dates.</p>
                      )}
                    </Box>
                    {expanded === 'sbd_panel' ? (
                      <>
                        <SBDTableList search="SBD Id" searchType="sbds" data={searchedDataList} />
                      </>
                    ) : (
                      ''
                    )}
                  </Paper>
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextEntry required={true} label="Search by Id" value={id} setValue={setId} />
                    </Grid>
                    <Grid item xs={3}>
                      <Button
                        sx={{ mt: 3 }}
                        onClick={() => searchClicked('sbds', 'sbdId')}
                        variant="contained"
                        color="secondary"
                      >
                        Search
                      </Button>
                    </Grid>
                  </Grid>
                </TabPanel>
              </Box>
            </AccordionDetails>
          </AccordionDetails>
        </Accordion>
      </Container>
    </>
  );
};

export default QuerySearch;
