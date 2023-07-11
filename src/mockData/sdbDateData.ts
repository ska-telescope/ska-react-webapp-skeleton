function createData(id: string) {
  return {
    id,
    history: [
      {
        id: 'eb-t0001-20230518-00001',
        sbd_id: 'sbd-t0001-20230518-00001',
        created_by: 'DefaultUser',
        created_on: '2023-05-18 06:43:50.991066'
      }
    ]
  };
}

const sbdByDate = [
  createData('sbd-t0001-20230518-00001'),
  createData('sbd-t0001-20230518-00002'),
  createData('sbd-t0001-20230518-00003'),
  createData('sbd-t0001-20230518-00004'),
  createData('sbd-t0001-20230518-00005'),
  createData('sbd-t0001-20230518-00006'),
  createData('sbd-t0001-20230518-00007'),
  createData('sbd-t0001-20230518-00008'),
  createData('sbd-t0001-20230518-00009'),
  createData('sbd-t0001-20230518-00010'),
  createData('sbd-t0001-20230518-00011'),
  createData('sbd-t0001-20230518-00012'),
  createData('sbd-t0001-20230518-00013')
];

export default sbdByDate;
