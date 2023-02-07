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
  /** Количество копий документа */
  NumberCopies?: number;
  /** Продавец */
  CashierName?: string;
  /** ИНН продавца */
  CashierVATIN?: string;
  /** Почта покупателя для отправки чека */
  ClientAddress?: string;
  /** Покупатель (клиент) - наименование организации или фамилия, имя, отчество (при наличии), серия и номер паспорта покупателя(клиента).
   * Только с использованием наличных / электронных денежных средств и при выплате выигрыша, получении страховой премии или при страховой выплате.
   */
  ClientInfo?: string;
  /** ИНН Организации или покупателя(клиента).
   * Только с использованием наличных / электронных денежных средств и при выплате выигрыша, получении страховой премии или при страховой выплате.
   */
  ClientINN?: string;
  /** Aдрес электронной почты отправителя чека, Тег ОФД 1117 (если задан при регистрации можно не указывать)
   * Формат: Email {С}@{C}
   */
  SenderEmail?: string;
  /** Адрес расчетов (если не задано - берется из регистрационных данных ККТ)*/
  AddressSettle?: string;
  /** Место расчетов (если не задано - берется из регистрационных данных ККТ)*/
  PlaceMarket?: string;
  /** Система налогообложения (СНО) применяемая для чека */
  TaxVariant?: TaxVariantEnum;
  ClientId?: string;
  /** Ключ суб-лицензии */
  KeySubLicensing?: string;
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
