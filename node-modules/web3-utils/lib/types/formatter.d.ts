import { DataFormat, FormatType } from 'web3-types';
import { JsonSchema, ValidationSchemaInput } from 'web3-validator';
export declare const isDataFormat: (dataFormat: unknown) => dataFormat is DataFormat;
/**
 * Converts a value depending on the format
 * @param value - value to convert
 * @param ethType - The type of the value to be parsed
 * @param format - The format to be converted to
 * @returns - The value converted to the specified format
 */
export declare const convertScalarValue: (value: unknown, ethType: string, format: DataFormat) => unknown;
/**
 * Converts the data to the specified format
 * @param data - data to convert
 * @param schema - The JSON schema that describes the structure of the data
 * @param dataPath - A string array that specifies the path to the data within the JSON schema
 * @param format  - The format to be converted to
 * @param oneOfPath - An optional array of two-element tuples that specifies the "oneOf" option to choose, if the schema has oneOf and the data path can match multiple subschemas
 * @returns - The data converted to the specified format
 */
export declare const convert: (data: Record<string, unknown> | unknown[] | unknown, schema: JsonSchema, dataPath: string[], format: DataFormat, oneOfPath?: [string, number][]) => unknown;
export declare const format: <DataType extends unknown, ReturnType_1 extends DataFormat>(schema: ValidationSchemaInput | JsonSchema, data: DataType, returnFormat?: ReturnType_1) => FormatType<DataType, ReturnType_1>;
//# sourceMappingURL=formatter.d.ts.map