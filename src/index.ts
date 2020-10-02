import axios from 'axios';
import { v4 } from 'uuid';

import CommandParams, {
  OpenShiftResult,
  CloseShiftResult,
  RegisterCheckResult
} from './models/Command';
import DeviceSearch, { DeviceSearchResult } from './models/DeviceSearch';

async function sendCommand(
  name: 'CloseShift',
  params?: Pick<CommandParams, 'NotPrint'>,
  ignoreSettings?: boolean
): Promise<CloseShiftResult>;
async function sendCommand(
  name: 'OpenShift',
  params?: Pick<CommandParams, 'NotPrint'>,
  ignoreSettings?: boolean
): Promise<OpenShiftResult>;
async function sendCommand(
  name: 'List',
  params?: DeviceSearch,
  ignoreSettings?: boolean
): Promise<DeviceSearchResult>;
async function sendCommand(
  name: 'RegisterCheck',
  params: CommandParams,
  ignoreSettings?: boolean
): Promise<RegisterCheckResult>;
async function sendCommand(name: string, params = {}, ignoreSettings = false) {
  let KKMSettings = {
    cashierName: 'касса',
    cashierVATIN: '',
    serverAddress: 'http://localhost:5893/Execute',
    device: 0,
    auth: { username: 'User', password: '' }
  };

  if (!ignoreSettings) {
    try {
      const settingsString = localStorage.getItem('kkmSettings');

      if (settingsString) {
        KKMSettings = JSON.parse(settingsString);
      }
    } catch (e) {
      console.error(e);
    }
  }

  const {
    cashierName = 'касса',
    cashierVATIN = '',
    serverAddress = 'http://localhost:5893/Execute',
    device = 0,
    auth = { username: 'User', password: '' }
  } = KKMSettings;

  if (typeof params === 'object') {
    const { data } = await axios.post(
      serverAddress,
      {
        ...params,
        Command: name,
        NumDevice: device,
        IdCommand: v4(),
        CashierName: cashierName,
        CashierVATIN: cashierVATIN
      },
      { auth }
    );

    return data;
  }

  return null;
}

export async function getDevices(
  search: DeviceSearch = {}
): Promise<DeviceSearchResult> {
  const data = await sendCommand('List', search, true);

  return data;
}

export async function openShift(
  params: Pick<CommandParams, 'NotPrint'> = {}
): Promise<OpenShiftResult> {
  const data = await sendCommand('OpenShift', params);

  return data;
}

export async function closeShift(
  params: Pick<CommandParams, 'NotPrint'> = {}
): Promise<CloseShiftResult> {
  const data = await sendCommand('CloseShift', params);

  return data;
}

export async function printCheck(
  params: CommandParams
): Promise<RegisterCheckResult> {
  return sendCommand('RegisterCheck', params);
}
