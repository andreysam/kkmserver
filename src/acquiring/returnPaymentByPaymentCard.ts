import StatusCodeEnum from '../models/StatusCodeEnum';
import sendCommand, { Options } from '../sendCommand';

interface Params {
  /** Полный банковский идентификатор транзакции, полученный в PayByPaymentCard */
  UniversalID: string;
  Amount: number;
}

interface ReturnValue {
  UniversalID: string;
  Amount: number;
  Slip: string;
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: string;
  Status: StatusCodeEnum;
}

/** Вернуть платеж по платежной карте */
async function returnPaymentByPaymentCard(
  params: Params,
  options: Options = {}
): Promise<ReturnValue> {
  // Вызов команды
  const data = await sendCommand('ReturnPaymentByPaymentCard', params, options);

  return data;
}

export default returnPaymentByPaymentCard;
