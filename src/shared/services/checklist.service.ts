import {AxiosError} from 'axios';
import Checklist from '../../database/models/checklist';
import ChecklistRepository from '../../database/repositories/checklist.repository';
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

    let checklists: any[] = result.data.map(c => Checklist.fromJSON(c));

    return checklists;
  }

  async create(checklist: Checklist): Promise<Checklist> {
    try {
      const result = await this.axiosAPI.post('/checklist', {
        checklists: [{...checklist.toJsonAPI(), id: ''}],
      });

      checklist.id = result?.data.idCreate[0];
    } catch (error) {
      const err = error as AxiosError;
      console.log(err.response?.data);
    }

    return checklist;
  }
  async update(checklist: Checklist): Promise<Checklist> {
    const result = await this.axiosAPI.put(
      `/checklist/${checklist.id}`,
      checklist.toJsonAPI(),
    );

    const updatedChecklist = Checklist.fromJSON({
      ...checklist,
      ...result?.data,
    });

    return updatedChecklist;
  }

  async delete(checklist: Checklist): Promise<number | null> {
    const result = await this.axiosAPI.delete(`/checklist/${checklist.id}`);

    return result.status;
  }
}
