import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import PreviewIcon from '@mui/icons-material/Preview';
import { Card, Grid, Tab, Tabs } from '@mui/material';
import moment from 'moment';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '800px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: 'scroll',
  height: '550px'
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
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
interface EntryFieldProps {
  sbId: string;
}

const ViewSBDInfo = (props: EntryFieldProps) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(0);
  const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const more_details = {
    sbd_id: 'sbd-t0001-20230518-00001',
    targets: [
      {
        target_id: 'Polaris Australis',
        pointing_pattern: {
          active: 'FivePointParameters',
          parameters: [
            {
              kind: 'FivePointParameters',
              offset_arcsec: 5
            },
            {
              pa: 7.89,
              kind: 'RasterParameters',
              n_rows: 2,
              unidirectional: true,
              row_length_arcsec: 1.23,
              row_offset_arcsec: 4.56
            },
            {
              kind: 'StarRasterParameters',
              n_rows: 2,
              unidirectional: true,
              row_offset_angle: 4.56,
              row_length_arcsec: 1.23
            }
          ]
        },
        reference_coordinate: {
          ra: '21:08:47.92',
          dec: '-88:57:22.9',
          kind: 'equatorial',
          unit: ['hourangle', 'deg'],
          reference_frame: 'ICRS'
        }
      },
      {
        target_id: 'M83',
        pointing_pattern: {
          active: 'SinglePointParameters',
          parameters: [
            {
              kind: 'SinglePointParameters',
              offset_x_arcsec: 0,
              offset_y_arcsec: 0
            }
          ]
        },
        reference_coordinate: {
          ra: '13:37:00.919',
          dec: '-29:51:56.74',
          kind: 'equatorial',
          unit: ['hourangle', 'deg'],
          reference_frame: 'ICRS'
        }
      }
    ],
    metadata: {
      version: 1,
      created_by: 'DefaultUser',
      created_on: '2023-06-21T09:00:55.251841',
      last_modified_by: 'DefaultUser',
      last_modified_on: '2023-06-21T09:00:55.251841'
    },
    interface: 'https://schema.skao.int/ska-oso-pdm-sbd/0.1',
    telescope: 'ska_mid',
    activities: {
      observe: {
        kind: 'git',
        path: 'git://relative/path/to/scriptinsiderepo.py',
        repo: 'https://gitlab.com/script_repo/operational_scripts',
        branch: 'main',
        function_args: {
          init: {
            args: ['posarg1', 'posarg2'],
            kwargs: {
              argname: 'argval'
            }
          },
          main: {
            args: ['posarg1', 'posarg2'],
            kwargs: {
              argname: 'argval'
            }
          }
        }
      },
      allocate: {
        kind: 'filesystem',
        path: 'file:///path/to/allocatescript.py',
        function_args: {
          init: {
            args: ['posarg1', 'posarg2'],
            kwargs: {
              argname: 'argval'
            }
          },
          main: {
            args: ['posarg1', 'posarg2'],
            kwargs: {
              argname: 'argval'
            }
          }
        }
      }
    },
    scan_sequence: ['calibrator scan', 'science scan', 'science scan', 'calibrator scan'],
    dish_allocations: {
      receptor_ids: ['0001', '0002']
    },
    scan_definitions: [
      {
        target: 'Polaris Australis',
        scan_type: 'calibration_B',
        scan_duration: 60000,
        csp_configuration: 'csp config 123',
        dish_configuration: 'dish config 123',
        scan_definition_id: 'calibrator scan'
      },
      {
        target: 'M83',
        scan_type: 'science_A',
        scan_duration: 60000,
        csp_configuration: 'csp config 123',
        dish_configuration: 'dish config 123',
        scan_definition_id: 'science scan'
      }
    ],
    sdp_configuration: {
      resources: {
        csp_links: [1, 2, 3, 4],
        receptors: [
          'FS4',
          'FS8',
          'FS16',
          'FS17',
          'FS22',
          'FS23',
          'FS30',
          'FS31',
          'FS32',
          'FS33',
          'FS36',
          'FS52',
          'FS56',
          'FS57',
          'FS59',
          'FS62',
          'FS66',
          'FS69',
          'FS70',
          'FS72',
          'FS73',
          'FS78',
          'FS80',
          'FS88',
          'FS89',
          'FS90',
          'FS91',
          'FS98',
          'FS108',
          'FS111',
          'FS132',
          'FS144',
          'FS146',
          'FS158',
          'FS165',
          'FS167',
          'FS176',
          'FS183',
          'FS193',
          'FS200',
          'FS345',
          'FS346',
          'FS347',
          'FS348',
          'FS349',
          'FS350',
          'FS351',
          'FS352',
          'FS353',
          'FS354',
          'FS355',
          'FS356',
          'FS429',
          'FS430',
          'FS431',
          'FS432',
          'FS433',
          'FS434',
          'FS465',
          'FS466',
          'FS467',
          'FS468',
          'FS469',
          'FS470'
        ],
        receive_nodes: 10
      },
      execution_block: {
        beams: [
          {
            beam_id: 'vis0',
            function: 'visibilities'
          },
          {
            beam_id: 'pss1',
            function: 'pulsar search',
            search_beam_id: 1
          },
          {
            beam_id: 'pss2',
            function: 'pulsar search',
            search_beam_id: 2
          },
          {
            beam_id: 'pst1',
            function: 'pulsar search',
            timing_beam_id: 1
          },
          {
            beam_id: 'pst2',
            function: 'pulsar search',
            timing_beam_id: 2
          },
          {
            beam_id: 'vlbi',
            function: 'vlbi',
            vlbi_beam_id: 1
          }
        ],
        eb_id: 'eb-mvp01-20200325-00001',
        context: {
          baz: 123,
          foo: 'bar'
        },
        channels: [
          {
            channels_id: 'vis_channels',
            spectral_windows: [
              {
                count: 744,
                start: 0,
                stride: 2,
                freq_max: 368000000,
                freq_min: 350000000,
                link_map: [
                  [0, 0],
                  [200, 1],
                  [744, 2],
                  [944, 3]
                ],
                spectral_window_id: 'fsp_1_channels'
              },
              {
                count: 744,
                start: 2000,
                stride: 1,
                freq_max: 368000000,
                freq_min: 360000000,
                link_map: [
                  [2000, 4],
                  [2200, 5]
                ],
                spectral_window_id: 'fsp_2_channels'
              },
              {
                count: 744,
                start: 4000,
                stride: 1,
                freq_max: 361000000,
                freq_min: 360000000,
                link_map: [
                  [4000, 6],
                  [4200, 7]
                ],
                spectral_window_id: 'zoom_window_1'
              }
            ]
          },
          {
            channels_id: 'pulsar_channels',
            spectral_windows: [
              {
                count: 744,
                start: 0,
                freq_max: 368000000,
                freq_min: 350000000,
                spectral_window_id: 'pulsar_fsp_channels'
              }
            ]
          }
        ],
        max_length: 100,
        scan_types: [
          {
            beams: [
              {
                beam_id: 'vis0',
                channels_id: 'vis_channels',
                polarisations_id: 'all'
              },
              {
                beam_id: 'pss1',
                field_id: 'M83',
                channels_id: 'pulsar_channels',
                polarisations_id: 'all'
              },
              {
                beam_id: 'pss2',
                field_id: 'Polaris Australis',
                channels_id: 'pulsar_channels',
                polarisations_id: 'all'
              },
              {
                beam_id: 'pst1',
                field_id: 'M83',
                channels_id: 'pulsar_channels',
                polarisations_id: 'all'
              },
              {
                beam_id: 'pst2',
                field_id: 'Polaris Australis',
                channels_id: 'pulsar_channels',
                polarisations_id: 'all'
              },
              {
                beam_id: 'vlbi',
                field_id: 'Polaris Australis',
                channels_id: 'vlbi_channels',
                polarisations_id: 'all'
              }
            ],
            scan_type_id: '.default'
          },
          {
            beams: [
              {
                beam_id: 'vis0',
                field_id: 'M83'
              }
            ],
            derive_from: '.default',
            scan_type_id: '.default'
          }
        ],
        polarisations: [
          {
            corr_type: ['XX', 'XY', 'YY', 'YX'],
            polarisations_id: 'all'
          }
        ]
      },
      processing_blocks: [
        {
          pb_id: 'pb-mvp01-20200325-00001',
          script: {
            kind: 'realtime',
            name: 'vis_receive',
            version: '0.1.0'
          },
          sbi_ids: ['sbi-mvp01-20200325-00001'],
          parameters: {}
        },
        {
          pb_id: 'pb-mvp01-20200325-00002',
          script: {
            kind: 'realtime',
            name: 'test_realtime',
            version: '0.1.0'
          },
          sbi_ids: ['sbi-mvp01-20200325-00001'],
          parameters: {}
        },
        {
          pb_id: 'pb-mvp01-20200325-00003',
          script: {
            kind: 'batch',
            name: 'ical',
            version: '0.1.0'
          },
          sbi_ids: ['sbi-mvp01-20200325-00001'],
          parameters: {},
          dependencies: [
            {
              kind: ['visibilities'],
              pb_id: 'pb-mvp01-20200325-00001'
            }
          ]
        },
        {
          pb_id: 'pb-mvp01-20200325-00004',
          script: {
            kind: 'batch',
            name: 'dpreb',
            version: '0.1.0'
          },
          sbi_ids: ['sbi-mvp01-20200325-00001'],
          parameters: {},
          dependencies: [
            {
              kind: ['calibration'],
              pb_id: 'pb-mvp01-20200325-00003'
            }
          ]
        }
      ]
    },
    csp_configurations: [
      {
        cbf: {
          fsp: [
            {
              fsp_id: 1,
              zoom_factor: 0,
              function_mode: 'CORR',
              channel_offset: 0,
              output_link_map: [
                [0, 0],
                [200, 1]
              ],
              frequency_slice_id: 1,
              integration_factor: 1,
              channel_averaging_map: [
                [0, 2],
                [744, 0]
              ]
            },
            {
              fsp_id: 2,
              zoom_factor: 1,
              function_mode: 'CORR',
              frequency_slice_id: 2,
              integration_factor: 1,
              zoom_window_tuning: 650000
            }
          ]
        },
        common: {
          subarray_id: 1,
          band_5_tuning: [5.85, 7.25]
        },
        subarray: {
          subarray_name: 'science period 23'
        },
        config_id: 'csp config 123'
      }
    ],
    dish_configurations: [
      {
        receiver_band: '5a',
        dish_configuration_id: 'dish config 123'
      }
    ]
  };

  return (
    <div>
      <span
        onClick={handleOpen}
        style={{ cursor: 'pointer', color: 'blue', textDecoration: 'underline' }}
      >
        {props.sbId}
      </span>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h3">
            Detail view for Scheduling Block Defination
          </Typography>
          <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                textColor="secondary"
                indicatorColor="secondary"
                value={value}
                onChange={handleChangeTab}
                aria-label="basic tabs example"
              >
                <Tab label="Basic Details" {...a11yProps(0)} />
                <Tab label="Detail Info" {...a11yProps(1)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <span style={{ fontWeight: 'bold' }}>SBD Id: </span>
                  <span>sbd-t0001-20230518-00001</span>
                </Grid>
                <Grid item xs={6}>
                  <span style={{ fontWeight: 'bold' }}>Created On:</span>
                  <span>{moment('2023-05-18 06:43:50.991066').format('DD-MM-YYYY')} </span>
                </Grid>
                <Grid item xs={6}>
                  <span style={{ fontWeight: 'bold' }}>Created by:</span>
                  <span>DefaultUser</span>
                </Grid>

                <Grid item xs={6}>
                  <span style={{ fontWeight: 'bold' }}>Last modified by:</span>
                  <span>DefaultUser</span>
                </Grid>
                <Grid item xs={6}>
                  <span style={{ fontWeight: 'bold' }}>Last modified On:</span>
                  <span> {moment('2023-05-18 06:43:50.991066').format('DD-MM-YYYY')} </span>
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Card sx={{ p: 2 }}>
                <pre>{JSON.stringify(more_details, null, 1)}</pre>
              </Card>
            </TabPanel>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ViewSBDInfo;
