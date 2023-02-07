import StatusCodeEnum from './StatusCodeEnum';
import TaxVariantEnum from './TaxVariantEnum';

interface DeviceSearch {
  /** Отбор по ИНН */
  InnKkm?: string;
  /** Отбор активных */
  Active?: boolean;
  /** Отбор выключенны-включенных */
  OnOff?: boolean;
  /** Отбор наличию ошибок ОФВ */
  OFD_Error?: boolean;
  /** Отбор всех у которых дата не переданного документа в ОФД меньше указанной
   * @example '2100-01-01T00:00:00'
   */
  OFD_DateErrorDoc?: string;
  /** Отбор всех у которых дата окончания работы ФН меньше указанной
   * @example '2100-01-01T00:00:00'
   */
  FN_DateEnd?: string;
  /** Отбор всех у которых заканчивается память ФН */
  FN_MemOverflowl?: boolean;
  /** Отбор фискализирован ФН или нет */
  FN_IsFiscal?: boolean;
}

export interface DeviceSearchResult {
  ListUnit: [
    {
      /** Номер устройства, по которому можно обращаться */
      NumDevice: number;
      /** Уникальный идентификатор устройства */
      IdDevice: string;
      /** Включено / выключено ли устройство */
      OnOf: boolean;
      /** Готово ли устройство к работе */
      Active: boolean;
      /** Тип устройства */
      TypeDevice: string;
      /** Производитель устройства */
      IdTypeDevice: string;
      /** Адрес устройства */
      IP: string;
      /** Порт устройства */
      Port: string;
      /** Название устройства */
      NameDevice: string;
      /** ЗН ККТ */
      KktNumber: string;
      /** ИНН */
      INN: string;
      /** ИНН */
      TaxVariant: TaxVariantEnum; // Описание смотри в команде KkmRegOfd
      /** Дата добавления */
      AddDate: string;
      /** Ошибка ОФД */
      OFD_Error: string;
      /** Количество документов с ошибкой ОФД */
      OFD_NumErrorDoc: number;
      /** Дата последней ошибки ОФД */
      OFD_DateErrorDoc: string;
      /** Дата окончания ФН */
      FN_DateEnd: string;
      /** Заполнена ли память ФН */
      FN_MemOverflowl: boolean;
      /** Фискализирован ли ФН */
      FN_IsFiscal: boolean;
      /** Закончилась ли бумага */
      PaperOver: boolean;
    }
  ];
  Command: 'List';
  /** Текст ошибки если была - обязательно показать пользователю - по содержанию ошибки можно в 90% случаях понять как ее устранять */
  Error: '';
  Status: StatusCodeEnum;
}

export default DeviceSearch;
