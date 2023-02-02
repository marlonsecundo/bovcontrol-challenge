import snakecaseKeys from 'snakecase-keys';

export abstract class BaseModel {
  toJsonAPI() {
    return snakecaseKeys(this);
  }

  convertToJSON() {
    return JSON.stringify(this);
  }
}
