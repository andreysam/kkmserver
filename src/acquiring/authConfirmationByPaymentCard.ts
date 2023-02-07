import StatusCodeEnum from '../models/StatusCodeEnum';
import sendCommand, { Options } from '../sendCommand';

interface Params {
  /** Полный банковский идентификатор транзакции, полученный в blockByPaymentCard */
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

/** Списать блокированную сумму со счета карты */
async function authConfirmationByPaymentCard(
  params: Params,
  options: Options = {}
): Promise<ReturnValue> {
  // Вызов команды
  const data = await sendCommand(
    'AuthConfirmationByPaymentCard',
    params,
    options
  );

  return data;
}

export default authConfirmationByPaymentCard;
