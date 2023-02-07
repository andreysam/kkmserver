import SignCalculationEnum from './SignCalculationEnum';
import SignMethodEnum from './SignMethodEnum';

interface CheckString {
  /** Строка с печатью картинки */
  PrintImage?: {
    /** Картинка в Base64. Картинка будет преобразована в 2-х цветное изображение- поэтому лучше посылать 2-х цветный bmp */
    Image: string;
  };
  /** Строка с печатью простого текста.
   * Описание спец символов доступно на kkmserver.ru
   */
  PrintText?: {
    Text: string;
    Font?: 0 | 1 | 2 | 3 | 4;
    Intensity?:
      | 0
      | 1
      | 2
      | 3
      | 4
      | 5
      | 6
      | 7
      | 8
      | 9
      | 10
      | 11
      | 12
      | 13
      | 14
      | 15;
  };
  /** Строка с печатью фискальной строки */
  Register?: {
    /** Наименование товара 64 символа */
    Name: string;
    /** Количество товара (3 знака после запятой) */
    Quantity: number;
    /** Цена за шт. без скидки (2 знака после запятой) */
    Price: number;
    /** Конечная сумма строки с учетом всех скидок/наценок; (2 знака после запятой) */
    Amount: number;
    /** Отдел, по которому ведется продажа */
    Department: number;
    /** НДС в процентах или ТЕГ НДС */
    Tax: -1 | 0 | 10 | 20 | 110 | 120;
    /** Признак способа расчета. */
    SignMethodCalculation: SignMethodEnum;
    /** Признак предмета расчета */
    SignCalculationObject: SignCalculationEnum;
    /** Единица измерения предмета расчета. Можно не указывать */
    MeasurementUnit?: string;
  };
  BarCode?: {
    /** Тип штрих-кода  */
    BarcodeType: 'EAN13' | 'CODE39' | 'CODE128' | 'QR' | 'PDF417';
    /** Значение штрих-кода */
    Barcode: string;
  };
}

export default CheckString;
