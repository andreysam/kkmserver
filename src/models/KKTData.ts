import StatusCodeEnum from './StatusCodeEnum';

interface KKTDataResult {
  /** Номер последнего документа */
  CheckNumber: number;
  /** Номер текущей смены */
  SessionNumber: number;
  /** Ширина строки */
  LineLength: number;
  URL: string;
  Info: {
    UrlServerOfd: string;
    PortServerOfd: string;
    NameOFD: string;
    UrlOfd: string;
    InnOfd: string;
    NameOrganization: string;
    /** Строка через запятую из элементов TaxVariantEnum например: "0,2,5" */
    TaxVariant: string;
    /** Адрес установки */
    AddressSettle: string;
    EncryptionMode: boolean;
    OfflineMode: boolean;
    AutomaticMode: boolean;
    InternetMode: boolean;
    BSOMode: boolean;
    ServiceMode: boolean;
    InnOrganization: string;
    /** Заводской номер */
    KktNumber: string;
    /** Номер ФН */
    FnNumber: string;
    /** Регистрационный номер ККТ (из налоговой) */
    RegNumber: string;
    Command: string;
    FN_IsFiscal: boolean;
    OFD_Error: string;
    OFD_NumErrorDoc: number;
    OFD_DateErrorDoc: string;
    FN_DateEnd: string;
    /** Статус сессии 1-Закрыта, 2-Открыта, 3-Открыта, но закончилась (3 статус на старых ККМ может быть не опознан) */
    SessionState: number;
  };
  Command: 'GetDataKKT';
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: string;
  Status: StatusCodeEnum;
}

export default KKTDataResult;
