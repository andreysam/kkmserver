import SignCalculationEnum from './SignCalculationEnum';
import SignMethodEnum from './SignMethodEnum';

interface CheckString {
  /** Строка с печатью картинки */
  PrintImage?: {
    /** Картинка в Base64. Картинка будет преобразована в 2-х цветное изображение- поэтому лучше посылать 2-х цветный bmp */
    Image: string;
  };
  /** Строка с печатью простого текста */
  PrintText?: {
    Text: string;
    Font?: 1 | 2 | 3 | 4;
    Intensity?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
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
    /** НДС в процентах или ТЕГ НДС */
    Tax: -1 | 0 | 10 | 20 | 110 | 120;
    /** Признак способа расчета. */
    SignMethodCalculation: SignMethodEnum;
    /** Признак предмета расчета */
    SignCalculationObject: SignCalculationEnum;
  };
}

export default CheckString;
