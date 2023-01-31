import {AxiosError} from 'axios';
import Checklist from '../../database/models/checklist';
import API from './api';

export class ChecklistService {
  api: API;

  get axiosAPI() {
    return this.api.axiosApi;
  }

  constructor(api: API) {
    this.api = api;
  }

  async findAll(): Promise<Checklist[] | null> {
    const result = await this.axiosAPI.get(`/checklist/`);

    return result.data.map(c => Checklist.fromJSON(c));
  }

  async findById(id: string): Promise<Checklist | null> {
    const result = await this.axiosAPI.get(`/checklist/${id}`);

    return Checklist.fromJSON(result?.data);
  }

  async create(checklist: Checklist): Promise<Checklist | null> {
    const result = await this.axiosAPI.post('/checklist', {
      checklists: [checklist.toJsonAPI()],
    });

    checklist.id = result?.data[0];

    return checklist;
  }
  async update(checklist: Checklist): Promise<Checklist | null> {
    const result = await this.axiosAPI.put(
      `/checklist/${checklist.id}`,
      checklist.toJsonAPI(),
    );

    return Checklist.fromJSON({...checklist, ...result?.data});
  }

  async delete(id: string): Promise<number | null> {
    const result = await this.axiosAPI.delete(`/checklist/${id}`);

    return result?.status;
  }
}
