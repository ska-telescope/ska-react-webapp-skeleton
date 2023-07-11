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

const ebsByDate = [
  createData('eb-t0001-20230518-00001'),
  createData('eb-t0001-20230518-00002'),
  createData('eb-t0001-20230518-00003'),
  createData('eb-t0001-20230518-00004'),
  createData('eb-t0001-20230518-00005'),
  createData('eb-t0001-20230518-00006'),
  createData('eb-t0001-20230518-00007'),
  createData('eb-t0001-20230518-00008'),
  createData('eb-t0001-20230518-00009'),
  createData('eb-t0001-20230518-00010'),
  createData('eb-t0001-20230518-00011'),
  createData('eb-t0001-20230518-00012'),
  createData('eb-t0001-20230518-00013')
];

export default ebsByDate;
