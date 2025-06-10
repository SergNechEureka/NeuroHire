import type { Candidate } from "api./types/models";

export type Order = 'asc' | 'desc';

export type FileJob = {
    filename: string;
    jobId: string;
    status: string;
    progress: number;
    statusMessage?: string;
  };

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
  onSearch?: (type: "name" | "language" | "country", value: string) => void;
  uniqueValues: {
    languages: string[];
    countries: string[];
  };
  filters: {
    name: string;
    language: string;
    country: string;
  };
}