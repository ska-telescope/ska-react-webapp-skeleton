export class AppService {
  ebDetails = {
    eb_id: 'eb-t0001-20230523-00006',
    metadata: {
      created_by: 'DefaultUser',
      created_on: '2023-05-23T09:18:34.730469Z',
      last_modified_by: 'DefaultUser',
      last_modified_on: '2023-05-23T09:21:27.452906Z',
      version: 1
    },
    request_responses: [
      {
        request: 'ska_oso_scripting.functions.devicecontrol.telescope_on',
        request_args: "{'args': (), 'kwargs': {}}",
        request_sent_at: '2023-05-23T09:18:45.937698+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:18:46.178675+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.assign_resources_from_cdm',
        request_args:
          "{'args': (1, <ska_tmc_cdm.messages.central_node.assign_resources.AssignResourcesRequest object at 0x7f63f2ccc1c0>), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:10.682639+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:15.611902+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:27.346337+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:28.249880+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:28.291981+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:39.079687+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:39.104787+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:40.331367+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:40.406371+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:46.179164+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:46.203770+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:47.229856+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:47.282304+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:53.179842+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:53.204917+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:19:54.341854+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:19:54.392317+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:10.179297+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:20:10.204889+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:11.346403+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:20:11.440359+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:17.178447+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:20:17.208382+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:18.389768+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:20:18.438603+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:34.178543+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.configure_from_file',
        request_args:
          "{'args': (1, 'tmc_low_configure_request.json'), 'kwargs': {'with_processing': False, 'timeout': None}}",
        request_sent_at: '2023-05-23T09:20:34.206259+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:34.408672+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.scan',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:20:34.464688+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:20:39.762037+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.end',
        request_args: "{'args': (1,), 'kwargs': {}}",
        request_sent_at: '2023-05-23T09:21:22.240603+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:21:23.279564+00:00',
        status: 'OK'
      },
      {
        request: 'ska_oso_scripting.functions.devicecontrol.release_all_resources',
        request_args: "{'args': (1,), 'kwargs': {'timeout': None}}",
        request_sent_at: '2023-05-23T09:21:26.360223+00:00',
        response: {
          result: 'None'
        },
        response_received_at: '2023-05-23T09:21:27.408569+00:00',
        status: 'OK'
      }
    ]
  };
  public async getData(): Promise<any> {
    // const response = await fetch('https://k8s.stfc.skao.int/staging-ska-db-oda/api/v1/ebs/eb-t0001-20230523-00001');
    return await this.ebDetails;
  }
}
