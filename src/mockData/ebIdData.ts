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

const ebById = [createData('eb-t0001-20230518-00001ddddd')];

export default ebById;
