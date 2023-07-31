import React, { ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import {
  Backdrop,
  Box,
  Button,
  Chip,
  CircularProgress,
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
import EBTableList from '../EBTableList/EBTableList';
import SBDTableList from '../SBDTableList/SBDTableList';
import { useTranslation } from 'react-i18next';
import { DATA_API_URL } from '../../utils/constants';

interface TabPanelProps {
  children?: ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
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
};

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const QuerySearch = () => {
  const { t } = useTranslation();
  const [dataDetails, setDataDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | false>('eb_panel');
  const [value, setValue] = useState(0);
  const [id, setId] = useState<string>('');
  const [searchType, setSearchType] = useState<string>('last 7 days');
  const [created_after, setCreatedAfter] = useState<string>('');
  const [created_before, setCreatedBefore] = useState<string>('');

  useEffect(() => {
    const created_after = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD');
    const created_before = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD');
    handleClick('ebs', created_after, created_before);
  }, []);

  const reset = () => {
    setId('');
    setCreatedAfter('');
    setCreatedBefore('');
  };

  const handleClick = async (searchFor: string, created_after: string, created_before: string) => {
    setIsLoading(true);
    setDataDetails([]);
    try {
      const baseURL = `${DATA_API_URL}/api/v1/${searchFor}?created_before=${created_before}&created_after=${created_after}`;
      const response = await fetch(baseURL, {
        method: 'GET',
        headers: {
          Accept: 'application/json'
        }
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }
      const result = await response.json();
      handleClickDetails(searchFor, result);
    } catch (err) {
    } finally {
    }
  };

  const handleClickDetails = async (searchFor, data) => {
    const getData: any = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const url = `${DATA_API_URL}/api/v1/${searchFor}/${data[i]}`;
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json'
          }
        });
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
        const result = await response.json();
        getData.push(result);
      } catch (err) {
      } finally {
      }
    }
    setDataDetails(getData);
    setIsLoading(false);
  };

  const handleChangeTab = (event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
    reset();
    setSearchType('last 7 days');
    const created_after = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD');
    const created_before = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD');
    if (expanded === 'eb_panel') {
      handleClick('ebs', created_after, created_before);
    } else {
      handleClick('sbds', created_after, created_before);
    }
  };

  const handleAccordianChange = (panel: string) => (
    event: SyntheticEvent,
    newExpanded: boolean
  ) => {
    setExpanded(newExpanded ? panel : false);
    reset();
    setValue(0);
    setSearchType('last 7 days');
    const created_after = moment()
      .subtract(7, 'days')
      .format('YYYY-MM-DD');
    const created_before = moment()
      .add(1, 'days')
      .format('YYYY-MM-DD');
    if (newExpanded === true && panel === 'sbd_panel') {
      handleClick('sbds', created_after, created_before);
    } else if (newExpanded === true && panel === 'eb_panel') {
      handleClick('ebs', created_after, created_before);
    }
  };

  const searchClicked = (searchFor: string, searchType: string) => {
    if (searchType === 'today') {
      setSearchType(searchType);
      reset();
      const created_after = moment().format('YYYY-MM-DD');
      const created_before = moment()
        .add(1, 'days')
        .format('YYYY-MM-DD');
      handleClick(searchFor, created_after, created_before);
    } else if (searchType === 'last 7 days') {
      reset();
      const created_after = moment()
        .subtract(7, 'days')
        .format('YYYY-MM-DD');
      const created_before = moment()
        .add(1, 'days')
        .format('YYYY-MM-DD');
      setSearchType(searchType);
      handleClick(searchFor, created_after, created_before);
    } else if (
      searchType === 'dates' &&
      created_after &&
      created_before &&
      validateDates() === ''
    ) {
      setSearchType(searchType);
      handleClick(searchFor, created_after, created_before);
    } else if (searchType === 'id' && id !== '' && validateSBDId() === '' && searchFor === 'sbds') {
      setSearchType(searchType);
      handleClickDetails(searchFor, [id]);
    } else if (searchType === 'id' && id !== '' && validateEBId() === '' && searchFor === 'ebs') {
      setSearchType(searchType);
      handleClickDetails(searchFor, [id]);
    }
  };

  const validateDates = () => {
    const today = moment().format('YYYY-MM-DD');
    if (Date.parse(created_after) > Date.parse(today)) {
    }
    if (
      Date.parse(created_after) <= Date.parse(created_before) &&
      Date.parse(created_after) < Date.parse(today) &&
      Date.parse(created_before) < Date.parse(today)
    ) {
      return '';
    } else if (
      Date.parse(created_after) > Date.parse(today) ||
      Date.parse(created_before) > Date.parse(today)
    ) {
      return t('errMsg.errFutureDate');
    } else if (Date.parse(created_after) > Date.parse(created_before)) {
      return t('errMsg.errInvalidDate');
    }
  };
  const validateEBId = () => {
    if (id !== '' && id.toLocaleLowerCase().startsWith('eb-')) {
      return '';
    } else if (id !== '' && !id.toLocaleLowerCase().startsWith('sbi-')) {
      return t('errMsg.errInvalidEbId');
    } else {
      return t('errMsg.errRequiredEbId');
    }
  };
  const validateSBDId = () => {
    if (id !== '' && id.toLocaleLowerCase().startsWith('sbi-')) {
      return '';
    } else if (id !== '' && !id.toLocaleLowerCase().startsWith('sbi-')) {
      return t('errMsg.errInvalidSBDId');
    } else {
      return t('errMsg.errRequiredSBDId');
    }
  };

  return (
    <>
      <Container>
        <Backdrop sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }} open={isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
        <Accordion expanded={expanded === 'eb_panel'} onChange={handleAccordianChange('eb_panel')}>
          <AccordionSummary
            sx={{
              backgroundColor: '#c1c6ca'
            }}
            expandIcon={<ExpandMoreIcon />}
            aria-controls="eb_panel-content"
            id="eb_panel-header"
          >
            <Typography>{t('label.eb_panel')}</Typography>
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
                  <Tab label={t('label.search_by_date')} {...a11yProps(0)} />
                  <Tab label={t('label.search_by_id')} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={7}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={t('label.last7days')}
                        onClick={() => searchClicked('ebs', 'last 7 days')}
                      />
                      <Chip
                        label={t('label.today')}
                        onClick={() => searchClicked('ebs', 'today')}
                      />
                      <DateEntry
                        errorText={validateDates()}
                        label={t('label.startDate')}
                        value={created_after}
                        setValue={setCreatedAfter}
                      />
                      <DateEntry
                        errorText={validateDates()}
                        label={t('label.endDate')}
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
                    {searchType === 'today' && <p>Showing records for today.</p>}
                    {searchType === 'last 7 days' && <p>Showing records for last 7 days.</p>}
                    {searchType === 'dates' && created_after && created_before && (
                      <p>Showing records for searched dates.</p>
                    )}
                  </Box>
                  {expanded === 'eb_panel' && dataDetails.length > 0 ? (
                    <>
                      <EBTableList search="EB Id" searchType="ebs" data={dataDetails} />
                    </>
                  ) : (
                    <Box sx={{ p: 1 }}>No searched records found.</Box>
                  )}
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={3}>
                    <TextEntry
                      errorText={validateEBId()}
                      label="Search by Id"
                      value={id}
                      setValue={setId}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3}>
                    <Button
                      sx={{ mt: 3 }}
                      variant="contained"
                      color="secondary"
                      onClick={() => searchClicked('ebs', 'id')}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <Box sx={{ p: 1 }}>
                    {searchType === 'today' && <p>Showing records for today.</p>}
                    {searchType === 'last 7 days' && <p>Showing records for last 7 days.</p>}
                    {searchType === 'id' && created_after && created_before && (
                      <p>Showing records for searched dates.</p>
                    )}
                  </Box>
                  {expanded === 'eb_panel' && dataDetails.length > 0 ? (
                    <>
                      <EBTableList search="EB Id" searchType="ebs" data={dataDetails} />
                    </>
                  ) : (
                    <Box sx={{ p: 1 }}>No searched records found.</Box>
                  )}
                </Paper>
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
            <Typography>{t('label.sbd_panel')}</Typography>
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
                  <Tab label={t('label.search_by_date')} {...a11yProps(0)} />
                  <Tab label={t('label.search_by_id')} {...a11yProps(1)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={7}>
                    <Stack direction="row" spacing={1}>
                      <Chip
                        label={t('label.last7days')}
                        onClick={() => searchClicked('sbds', 'last 7 days')}
                      />
                      <Chip
                        label={t('label.today')}
                        onClick={() => searchClicked('sbds', 'today')}
                      />
                      <DateEntry
                        errorText={validateDates()}
                        label={t('label.startDate')}
                        value={created_after}
                        setValue={setCreatedAfter}
                      />
                      <DateEntry
                        errorText={validateDates()}
                        label={t('label.endDate')}
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
                      onClick={() => searchClicked('sbds', 'dates')}
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <Box sx={{ p: 1 }}>
                    {searchType === 'today' && <p>Showing records for today.</p>}
                    {searchType === 'last 7 days' && <p>Showing records for last 7 days.</p>}
                    {searchType === 'dates' && created_after && created_before && (
                      <p>Showing records for searched dates.</p>
                    )}
                  </Box>
                  {expanded === 'sbd_panel' && dataDetails.length > 0 ? (
                    <>
                      <SBDTableList search="SBD Id" searchType="sbds" data={dataDetails} />
                    </>
                  ) : (
                    <Box sx={{ p: 1 }}>No searched records found.</Box>
                  )}
                </Paper>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6} md={4}>
                    <TextEntry
                      errorText={validateSBDId()}
                      label="Search by Id"
                      value={id}
                      setValue={setId}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Button
                      sx={{ mt: 3 }}
                      onClick={() => searchClicked('sbds', 'id')}
                      variant="contained"
                      color="secondary"
                    >
                      Search
                    </Button>
                  </Grid>
                </Grid>
                <Paper elevation={2} sx={{ marginTop: 4 }}>
                  <Box sx={{ p: 1 }}>
                    {searchType === 'today' && <p>Showing records for today.</p>}
                    {searchType === 'last 7 days' && <p>Showing records for last 7 days.</p>}
                    {searchType === 'id' && created_after && created_before && (
                      <p>Showing records for searched dates.</p>
                    )}
                  </Box>
                  {expanded === 'sbd_panel' && dataDetails.length > 0 ? (
                    <>
                      <SBDTableList search="SBD Id" searchType="sbds" data={dataDetails} />
                    </>
                  ) : (
                    <Box sx={{ p: 1 }}>No searched records found.</Box>
                  )}
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
