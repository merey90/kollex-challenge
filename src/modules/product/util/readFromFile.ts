import csv from 'csvtojson';
import { DataType } from '../../../models/util';

export const readFromFile = (dataType: DataType): any => {
  switch (dataType) {
    case DataType.JSON:
      return readFromJson();
      break;
    default:
      return readFromCsv();
      break;
  }
};

export const readFromJson = async (): Promise<any[]> => {
  return import(`${__dirname}/../../../data/wholesaler_b.json`);
};

export const readFromCsv = async (): Promise<any[]> => {
  try {
    return csv({ delimiter: ';' })
      .fromFile(`${__dirname}/../../../data/wholesaler_a.csv`);
  } catch (error) {
    console.log('TCL: error', error);
  }
  return [];
};
