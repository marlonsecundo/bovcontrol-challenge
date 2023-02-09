import snakecaseKeys from 'snakecase-keys';

export class BaseModel {
  _id?: string;

  toJsonAPI() {
    return snakecaseKeys(this);
  }

  convertToJSON() {
    return JSON.stringify(this);
  }
}
