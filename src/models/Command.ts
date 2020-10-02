import CheckString from './CheckString';
import CheckTypeEnum from './CheckTypeEnum';
import StatusCodeEnum from './StatusCodeEnum';
import TaxVariantEnum from './TaxVariantEnum';

interface CommandParams {
  /** Это фискальный или не фискальный чек */
  IsFiscalCheck: boolean;
  /** Тип чека */
  TypeCheck: CheckTypeEnum;
  /** Не печатать чек на бумагу */
  NotPrint?: boolean;
  /** Почта покупателя для отправки чека */
  ClientAddress?: string;
  /** Система налогообложения (СНО) применяемая для чека */
  TaxVariant?: TaxVariantEnum;
  /** Строки чека */
  CheckStrings: CheckString[];
  /** Наличная оплата */
  Cash?: number;
  /** Сумма электронной оплаты */
  ElectronicPayment?: number;
  /** Сумма из предоплаты (зачетом аванса) */
  AdvancePayment?: number;
  /** Сумма постоплатой(в кредит)  */
  Credit?: number;
  /** Сумма оплаты встречным предоставлением (сертификаты, др. мат.ценности) */
  CashProvision?: number;
}

export interface RegisterCheckResult {
  /** Номер документа */
  CheckNumber: number;
  /** Номер смены */
  SessionNumber: number;
  /** Ссылка на чек в ОФД */
  URL: string;
  /** Данные в распечатанном QR коде */
  QRCode: string;
  Command: 'RegisterCheck';
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: string;
  Status: StatusCodeEnum;
}

export interface OpenShiftResult {
  /** Номер документа */
  CheckNumber: 1;
  /** Номер смены */
  SessionNumber: 23;
  QRCode: 't=20170904T141100&fn=9999078900002287&i=108&fp=605445600';
  Command: 'OpenShift';
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: string;
  Status: StatusCodeEnum;
}

export interface CloseShiftResult {
  /** Номер документа */
  CheckNumber: 1;
  /** Номер смены */
  SessionNumber: 23;
  QRCode: 't=20170904T141100&fn=9999078900002287&i=108&fp=605445600';
  Command: 'CloseShift';
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: string;
  Status: StatusCodeEnum;
}

export default CommandParams;
