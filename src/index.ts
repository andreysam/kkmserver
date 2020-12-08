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

async function sendCommand(
  name: 'DepositingCash' | 'PaymentCash',
  params: { Amount: number },
  customSettings?: unknown
): Promise<void>;
async function sendCommand(
  name: 'XReport',
  params?: Record<string, unknown>,
  customSettings?: unknown
): Promise<void>;
async function sendCommand(
  name: 'GetDataKKT',
  params?: Record<string, unknown>,
  customSettings?: unknown
): Promise<KKTDataResult>;
async function sendCommand(
  name: 'CloseShift',
  params?: Pick<CommandParams, 'NotPrint'>,
  customSettings?: unknown
): Promise<CloseShiftResult>;
async function sendCommand(
  name: 'OpenShift',
  params?: Pick<CommandParams, 'NotPrint'>,
  customSettings?: unknown
): Promise<OpenShiftResult>;
async function sendCommand(
  name: 'List',
  params?: DeviceSearch,
  customSettings?: unknown
): Promise<DeviceSearchResult>;
async function sendCommand(
  name: 'RegisterCheck',
  params: CommandParams,
  customSettings?: unknown
): Promise<RegisterCheckResult>;
async function sendCommand(
  name: string,
  params = {},
  customSettings = {
    cashierName: 'касса',
    cashierVATIN: '',
    serverAddress: 'http://localhost:5893/Execute',
    device: 0,
    auth: { username: 'User', password: '' },
    timeout: 0
  }
) {
  const {
    cashierName = 'касса',
    cashierVATIN = '',
    serverAddress = 'http://localhost:5893/Execute',
    device = 0,
    auth = { username: 'User', password: '' },
    timeout = 0
  } = customSettings;

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
      { auth, timeout }
    );

    return data;
  }

  return null;
}

interface CustomKKMSettings {
  cashierName?: string;
  cashierVATIN?: string;
  serverAddress?: string;
  device?: number;
  auth?: {
    username: string;
    password: string;
  };
  timeout?: number;
}

export async function getDevices(
  search: DeviceSearch = {},
  kkmSettings: CustomKKMSettings = {}
): Promise<DeviceSearchResult> {
  const data = await sendCommand('List', search, kkmSettings);

  return data;
}

export async function openShift(
  params: Pick<CommandParams, 'NotPrint'> = {},
  kkmSettings: CustomKKMSettings = {}
): Promise<OpenShiftResult> {
  const data = await sendCommand('OpenShift', params, kkmSettings);

  return data;
}

export async function closeShift(
  params: Pick<CommandParams, 'NotPrint'> = {},
  kkmSettings: CustomKKMSettings = {}
): Promise<CloseShiftResult> {
  const data = await sendCommand('CloseShift', params, kkmSettings);

  return data;
}

export async function printCheck(
  params: CommandParams,
  kkmSettings: CustomKKMSettings = {}
): Promise<RegisterCheckResult> {
  const data = await sendCommand('RegisterCheck', params, kkmSettings);

  if (
    data.Status !== StatusCodeEnum.ok &&
    (data.Error.includes('смена') || data.Error.includes('Смена'))
  ) {
    await closeShift({ NotPrint: params.NotPrint }, kkmSettings);
    return sendCommand('RegisterCheck', params, kkmSettings);
  }

  if (data.Error.includes('лиценз')) {
    return sendCommand('RegisterCheck', params, kkmSettings);
  }

  if (data.Status !== StatusCodeEnum.ok) {
    return Promise.reject(data.Error);
  }

  return data;
}

export async function getKKTData(
  kkmSettings: CustomKKMSettings = {}
): Promise<KKTDataResult> {
  try {
    const data = await sendCommand(
      'GetDataKKT',
      {},
      { timeout: 5000, ...kkmSettings }
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

export async function getXReport(
  kkmSettings: CustomKKMSettings = {}
): Promise<void> {
  await sendCommand('XReport', {}, kkmSettings);
}

export async function depositCash(
  amount: number,
  kkmSettings: CustomKKMSettings = {}
): Promise<void> {
  await sendCommand('DepositingCash', { Amount: amount }, kkmSettings);
}

export async function payCash(
  amount: number,
  kkmSettings: CustomKKMSettings = {}
): Promise<void> {
  await sendCommand('PaymentCash', { Amount: amount }, kkmSettings);
}

printCheck(
  {
    IsFiscalCheck: true,
    TypeCheck: 0,
    CheckStrings: [
      {
        Register: {
          Name:
            'B01.031.001  - Прием (осмотр, консультация) врача-педиатра первичный',
          Price: 800,
          Quantity: 1,
          Amount: 800,
          Tax: -1,
          SignCalculationObject: 4,
          SignMethodCalculation: 4
        }
      }
    ],
    ElectronicPayment: 800
  },
  { cashierName: 'Рудакова Юлия  Петровна', cashierVATIN: '' }
);
