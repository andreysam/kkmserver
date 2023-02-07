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

/** Разблокировать сумму на счете карты */
async function cancelAuthorisationByPaymentCard(
  params: Params,
  options: Options = {}
): Promise<ReturnValue> {
  // Вызов команды
  const data = await sendCommand(
    'CancelAuthorisationByPaymentCard',
    params,
    options
  );

  return data;
}

export default cancelAuthorisationByPaymentCard;
