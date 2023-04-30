import axios from 'axios';
import { v4 } from 'uuid';
import CommandParams, { RegisterCheckResult } from './models/Command';

export interface Options {
  /** @default 'http://localhost:5893/Execute' */
  address?: string;
  /** @default 0 */
  device?: number;
  /** @default { username: 'User', password: '' } */
  auth?: { username: string; password: string };
  /** @default 0 */
  timeout?: number;
  /** @default касса */
  cashierName?: string;
}

async function sendCommand(name: string, params = {}, options: Options = {}) {
  const {
    address = 'http://localhost:5893/Execute',
    device = 0,
    auth = { username: 'User', password: '' },
    timeout = 0,
    cashierName = 'касса'
  } = options;

  if (typeof params === 'object') {
    const { data } = await axios.post(
      address,
      {
        CashierName: cashierName,
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

export default sendCommand;
