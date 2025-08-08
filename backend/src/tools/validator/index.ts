import Ajv from "ajv";
import addFormats from 'ajv-formats';
import ajvErrors from "ajv-errors";

import schemas from "./schemas";

const ajv = new Ajv({ allErrors: true, coerceTypes: true, allowUnionTypes: true });
addFormats(ajv);
ajvErrors(ajv);

export default (data: any, schemaName: string) => {
  const schema = schemas[schemaName];
  const validate = ajv.compile(schema);
  const valid = validate(data);
  const errors = validate.errors?.map(error => error.message);
  return { valid, errors };
}