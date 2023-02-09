import {convertToCamelCase} from '~/utils/camelcase-keys';
import Checklist from '../checklist';

export const checklistMock = Checklist.fromJSON(
  convertToCamelCase({
    _id: 769967,
    type: 'BPA',
    amount_of_milk_produced: '300',
    farmer: {
      name: 'Fazenda São Rock',
      city: 'São Rock',
    },
    from: {
      name: 'Luciano Camargo',
    },
    to: {
      name: 'Fernando Siqueira',
    },
    number_of_cows_head: '17',
    had_supervision: false,
    location: {
      latitude: -23.5,
      longitude: -46.6,
    },
    created_at: '2022-02-01T10:10:21.748Z',
    updated_at: '2022-02-01T10:10:21.748Z',
    __v: 0,
  }),
);
