import type { Candidate } from "../types/models";

export type Order = 'asc' | 'desc';

export interface EnhancedTableToolbarProps {
  numSelected: number;
};

export interface HeadCell {
  disablePadding: boolean;
  id: keyof Candidate;
  label: string;
  numeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Candidate) => void;
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}