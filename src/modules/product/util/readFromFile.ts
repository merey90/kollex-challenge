import csv from 'csvtojson';
import { DataType } from '../models/util';
import { JsonProduct } from '../models/jsonProduct';
import { CsvProduct } from '../models/csvProduct';

const readFromFile = async (dataType: DataType): Promise<any> => {
  switch (dataType) {
    case DataType.JSON:
      return fileReaderModule.readFromJson();
      break;
    default:
      return fileReaderModule.readFromCsv();
      break;
  }
};

const readFromJson = async (): Promise<JsonProduct[]> => {
  try {
    const jsonData = await import(`${__dirname}/../../../data/wholesaler_b.json`);
    return jsonData.data;
  } catch (error) {
    console.log('TCL: error', error);
  }
  return [];
};

const readFromCsv = async (): Promise<CsvProduct[]> => {
  try {
    return csv({ delimiter: ';' })
      .fromFile(`${__dirname}/../../../data/wholesaler_a.csv`);
  } catch (error) {
    console.log('TCL: error', error);
  }
  return [];
};

export const fileReaderModule = {
  readFromFile,
  readFromJson,
  readFromCsv,
};
