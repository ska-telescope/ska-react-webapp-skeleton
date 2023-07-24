const ebDetails = {
  eb_id: 'eb-t0001-20230703-00001',
  metadata: {
    version: 1,
    created_by: 'DefaultUser',
    created_on: '2023-07-03T12:51:31.335762Z',
    last_modified_by: 'DefaultUser',
    last_modified_on: '2023-07-03T12:51:31.335762Z'
  },
  request_responses: [
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.telescope_on',
      response: {
        result: 'None'
      },
      request_args: "{'args': (), 'kwargs': {}}",
      request_sent_at: '2023-07-03T12:41:18.449844+00:00',
      response_received_at: '2023-07-03T12:41:18.983768+00:00'
    },
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.assign_resources_from_cdm',
      response: {
        result: 'None'
      },
      request_args:
        "{'args': (1, <ska_tmc_cdm.messages.central_node.assign_resources.AssignResourcesRequest object at 0x7f4348c263b0>), 'kwargs': {'timeout': None}}",
      request_sent_at: '2023-07-03T12:41:49.849414+00:00',
      response_received_at: '2023-07-03T12:41:59.712043+00:00'
    },
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.assign_resources_from_cdm',
      response: {
        result: 'None'
      },
      request_args:
        "{'args': (1, <ska_tmc_cdm.messages.central_node.assign_resources.AssignResourcesRequest object at 0x7f4348c269e0>), 'kwargs': {'timeout': None}}",
      request_sent_at: '2023-07-03T12:44:36.321163+00:00',
      response_received_at: '2023-07-03T12:44:36.492716+00:00'
    },
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.configure_from_cdm',
      response: {
        result: 'None'
      },
      request_args:
        "{'args': (1, <ska_tmc_cdm.messages.subarray_node.configure.ConfigureRequest object at 0x7f4348c651e0>), 'kwargs': {'timeout': None}}",
      request_sent_at: '2023-07-03T12:46:30.907287+00:00',
      response_received_at: '2023-07-03T12:46:32.549122+00:00'
    },
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.configure_from_cdm',
      response: {
        result: 'None'
      },
      request_args:
        "{'args': (1, <ska_tmc_cdm.messages.subarray_node.configure.ConfigureRequest object at 0x7f4348ce98d0>), 'kwargs': {'timeout': None}}",
      request_sent_at: '2023-07-03T12:47:46.591379+00:00',
      response_received_at: '2023-07-03T12:47:47.658319+00:00'
    },
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.end',
      response: {
        result: 'None'
      },
      request_args: "{'args': (1,), 'kwargs': {}}",
      request_sent_at: '2023-07-03T12:51:29.832999+00:00',
      response_received_at: '2023-07-03T12:51:30.117149+00:00'
    },
    {
      status: 'OK',
      request: 'ska_oso_scripting.functions.devicecontrol.release_all_resources',
      response: {
        result: 'None'
      },
      request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
      request_sent_at: '2023-07-03T12:51:31.124762+00:00',
      response_received_at: '2023-07-03T12:51:31.294096+00:00'
    }
  ]
};

export default ebDetails;
