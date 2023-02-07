import StatusCodeEnum from '../models/StatusCodeEnum';
import sendCommand, { Options } from '../sendCommand';

interface ReturnValue {
  /** СОХРАНИТЕ ЭТО ПОЛЕ! Понадобится для отмены или возврата по транзакции */
  UniversalID: string;
  Amount: number;
  Slip: string;
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: string;
  Status: StatusCodeEnum;
}

/** Блокировка суммы на счете карты */
async function authorisationByPaymentCard(
  amount: number,
  options: Options = {}
): Promise<ReturnValue> {
  // Вызов команды
  const data = await sendCommand(
    'AuthorisationByPaymentCard',
    { Amount: amount },
    options
  );

  return data;
}

export default authorisationByPaymentCard;
