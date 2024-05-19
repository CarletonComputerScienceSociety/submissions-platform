import { v4 as uuidv4, validate } from "uuid";

export const create = (): string => {
  return uuidv4();
};

export const isValid = (uuid: string): boolean => {
  return validate(uuid);
};
