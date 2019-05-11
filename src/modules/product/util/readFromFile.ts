import csv from 'csvtojson';
import { DataType } from '../../../models/util';

export const readFromFile = async (dataType: DataType): Promise<any> => {
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
  try {
    const jsonData = await import(`${__dirname}/../../../data/wholesaler_b.json`);
    return jsonData.data;
  } catch (error) {
    console.log('TCL: error', error);
  }
  return [];
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
