import axios from 'axios';
import { v4 } from 'uuid';

import CommandParams, {
  OpenShiftResult,
  CloseShiftResult,
  RegisterCheckResult
} from './models/Command';
import DeviceSearch, { DeviceSearchResult } from './models/DeviceSearch';
import KKTDataResult from './models/KKTData';
import StatusCodeEnum from './models/StatusCodeEnum';

interface Options {
  /** @default 'http://localhost:5893/Execute' */
  address?: string;
  /** @default 0 */
  device?: number;
  /** @default { username: 'User', password: '' } */
  auth?: { username: string; password: string };
  /** @default 0 */
  timeout?: number;
}

async function sendCommand(
  name: 'DepositingCash' | 'PaymentCash',
  params: { Amount: number },
  options?: Options
): Promise<void>;
async function sendCommand(
  name: 'XReport',
  params?: Record<string, unknown>,
  options?: Options
): Promise<void>;
async function sendCommand(
  name: 'GetDataKKT',
  params?: Record<string, unknown>,
  options?: Options
): Promise<KKTDataResult>;
async function sendCommand(
  name: 'CloseShift',
  params?: Pick<CommandParams, 'NotPrint'>,
  options?: Options
): Promise<CloseShiftResult>;
async function sendCommand(
  name: 'OpenShift',
  params?: Pick<CommandParams, 'NotPrint'>,
  options?: Options
): Promise<OpenShiftResult>;
async function sendCommand(
  name: 'List',
  params?: DeviceSearch,
  options?: Options
): Promise<DeviceSearchResult>;
async function sendCommand(
  name: 'RegisterCheck',
  params: CommandParams,
  options?: Options
): Promise<RegisterCheckResult>;
async function sendCommand(name: string, params = {}, options: Options = {}) {
  const {
    address = 'http://localhost:5893/Execute',
    device = 0,
    auth = { username: 'User', password: '' },
    timeout = 0
  } = options;

  if (typeof params === 'object') {
    const { data } = await axios.post(
      address,
      {
        CashierName: 'касса',
        CashierVATIN: '',
        ...params,
        Command: name,
        NumDevice: device,
        IdCommand: v4()
      },
      { auth, timeout }
    );

    return data;
  }

  return null;
}

export async function getDevices(
  search: DeviceSearch = {},
  options: Options = {}
): Promise<DeviceSearchResult> {
  const data = await sendCommand('List', search, options);

  return data;
}

export async function openShift(
  params: Pick<CommandParams, 'NotPrint'> = {},
  options: Options = {}
): Promise<OpenShiftResult> {
  const data = await sendCommand('OpenShift', params, options);

  return data;
}

export async function closeShift(
  params: Pick<CommandParams, 'NotPrint'> = {},
  options: Options = {}
): Promise<CloseShiftResult> {
  const data = await sendCommand('CloseShift', params, options);

  return data;
}

export async function printCheck(
  params: CommandParams,
  options: Options = {}
): Promise<RegisterCheckResult> {
  const data = await sendCommand('RegisterCheck', params, options);

  if (
    data.Status !== StatusCodeEnum.ok &&
    (data.Error.includes('смена') || data.Error.includes('Смена'))
  ) {
    await closeShift({ NotPrint: params.NotPrint }, options);
    return sendCommand('RegisterCheck', params, options);
  }

  if (data.Error.includes('лиценз')) {
    return sendCommand('RegisterCheck', params, options);
  }

  if (data.Status !== StatusCodeEnum.ok) {
    return Promise.reject(data.Error);
  }

  return data;
}

export async function getKKTData(
  options: Options = {}
): Promise<KKTDataResult> {
  try {
    const data = await sendCommand(
      'GetDataKKT',
      {},
      { timeout: 5000, ...options }
    );

    if (data.Status === StatusCodeEnum.ok) {
      return data;
    } else {
      throw new Error('not ok');
    }
  } catch (e) {
    return Promise.reject(new Error('kkm error'));
  }
}

export async function getXReport(options: Options = {}): Promise<void> {
  await sendCommand('XReport', {}, options);
}

export async function depositCash(
  amount: number,
  options: Options = {}
): Promise<void> {
  await sendCommand('DepositingCash', { Amount: amount }, options);
}

export async function payCash(
  amount: number,
  options: Options = {}
): Promise<void> {
  await sendCommand('PaymentCash', { Amount: amount }, options);
}
