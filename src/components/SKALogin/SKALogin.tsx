import React from 'react';
import { Grid, Typography } from '@mui/material';
import { importRemote } from '@module-federation/utilities';
import { Spacer, SPACER_VERTICAL } from '@ska-telescope/ska-gui-components';
import axios from 'axios';
import Loader from '../Loader/Loader';

const HEADER_HEIGHT = 70;

const URL = 'http://localhost:4201';
const DOMAIN = 'http://localhost';
const ERR_MSG = 'WE ARE UNABLE TO PROVIDE YOU LOGIN FUNCTIONALITY AT THIS TIME';

interface LoginUserProps {
    open: boolean;
    setOpen: Function;
    confirmFunction: Function;
    cancelFunction: Function;
  }
  
function standardErrorPage() {
  return (
    <>
      <Spacer size={HEADER_HEIGHT} axis={SPACER_VERTICAL} />
      <Grid container m={2} direction="row" justifyContent="space-between">
        <Grid item xs={4} />
        <Grid
          item
          xs={4}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography
            m={2}
            data-testid="devHomeDesc"
            variant="h4"
            component="div"
          >
            Unable to get remote
          </Typography>
        </Grid>
        <Grid item xs={4} />

        <Grid item xs={2} />
        <Grid
          item
          xs={8}
          container
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <Typography data-testid="errorMessage" variant="h5" component="div">
            {ERR_MSG}
          </Typography>
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </>
  );
}

export function SKALogin({
  open,
  setOpen,
  confirmFunction,
  cancelFunction
}: LoginUserProps) {
  const [available, setAvailable] = React.useState(0);

  React.useEffect(() => {
    const checkAvailable = async () => {
      try {
        const result = await axios.get(URL, { timeout: 4000 });
        if (result.status !== 404) {
          setAvailable(1);
        }
      } catch (error) {
        setAvailable(2);
      }
    };

    checkAvailable();
  }, []);

  const Component =
    available !== 1
      ? null
      : React.lazy(() =>
          importRemote({
            url: async () => Promise.resolve(URL), // This is a working alternative
            remoteEntryFileName: 'remoteEntry.js',
            scope: 'skaLoginPage',
            module: 'LoginDialog'
          })
        );

  return (
    <React.Suspense fallback={<Loader />}>
      {available === 1 && 
          Component && (
          <Component
            openDialog={open}
            setOpenDialog={setOpen}
            LoginFunction={confirmFunction}
            CancelFunction={cancelFunction}
            domain={DOMAIN}
          />
        )}
      {available === 2 && standardErrorPage()}
    </React.Suspense>
  );
}

export default SKALogin;
