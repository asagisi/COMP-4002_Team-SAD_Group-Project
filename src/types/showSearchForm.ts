import {type Show } from './Show';

export type ShowSearchFormProps = {
  searchShow: string;
  setSearchShow: (value: string) => void;
  filteredShow: Show[];
  toggleHide: (id: number) => void;
};