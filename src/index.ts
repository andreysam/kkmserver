import authorisationByPaymentCard from './acquiring/authorisationByPaymentCard';
import cancelPaymentByPaymentCard from './acquiring/cancelPaymentByPaymentCard';
import authConfirmationByPaymentCard from './acquiring/authConfirmationByPaymentCard';
import parseUniversalID from './acquiring/parseUniversalID';
import payByPaymentCard from './acquiring/payByPaymentCard';
import returnPaymentByPaymentCard from './acquiring/returnPaymentByPaymentCard';
import settlement from './acquiring/settlement';
import terminalReport from './acquiring/terminalReport';
import cancelAuthorisationByPaymentCard from './acquiring/cancelAuthorisationByPaymentCard';
import CommandParams, {
  OpenShiftResult,
  CloseShiftResult,
  RegisterCheckResult
} from './models/Command';
import DeviceSearch, { DeviceSearchResult } from './models/DeviceSearch';
import KKTDataResult from './models/KKTData';
import StatusCodeEnum from './models/StatusCodeEnum';
import sendCommand, { Options } from './sendCommand';

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

export {
  payByPaymentCard,
  returnPaymentByPaymentCard,
  cancelPaymentByPaymentCard,
  authorisationByPaymentCard,
  authConfirmationByPaymentCard,
  parseUniversalID,
  cancelAuthorisationByPaymentCard,
  settlement,
  terminalReport
};
