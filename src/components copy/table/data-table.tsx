"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

export interface Meta {
   
  id?: string; 
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface DataTableProps<T> {
  columns: Array<{
    id?: string; // এটি ইউনিক কি হিসেবে কাজ করবে
    accessorKey?: string; // এখানে ? যোগ করো (Optional)
    
    header: string;
    cell?: (row: T) => React.ReactNode;
  }>;
  data: T[];
  title?: string;
  pagination?: boolean;
  paginationMeta?: Meta;
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onSearch?: (value: string) => void;
}

export function DataTable<T extends { id?: string }>({
  columns,
  data,
  title,
  pagination,
  paginationMeta,
  onPaginationChange,
  onSearch,
}: DataTableProps<T>) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (value: string) => {
    setSearchValue(value);
    onSearch?.(value);
  };

  const handlePreviousPage = () => {
    if (paginationMeta && paginationMeta.page > 1 && onPaginationChange) {
      onPaginationChange({
        pageIndex: paginationMeta.page - 2,
        pageSize: paginationMeta.limit,
      });
    }
  };

  const handleNextPage = () => {
    if (
      paginationMeta &&
      paginationMeta.page < paginationMeta.totalPages &&
      onPaginationChange
    ) {
      onPaginationChange({
        pageIndex: paginationMeta.page,
        pageSize: paginationMeta.limit,
      });
    }
  };

  return (
    <div className="space-y-4">
      {title && <h2 className="text-lg font-semibold text-black">{title}</h2>}

      {onSearch && (
        <Input
          placeholder="Search..."
          value={searchValue}
          onChange={(e) => handleSearch(e.target.value)}
          className="max-w-sm"
        />
      )}

      <div className="rounded-md border border-slate-200 overflow-hidden">
        <Table>
          <TableHeader className="bg-slate-50">
            <TableRow>
              {columns.map((column, index) => (
                /* ইউনিক কি ফিক্স: id থাকলে সেটা নেবে, না থাকলে accessorKey, আর কিছুই না থাকলে index */
                <TableHead key={column.id || column.accessorKey || `header-${index}`} className="font-bold text-black uppercase text-[11px] tracking-wider">
                  {column.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
    <TableBody>
  {data.length ? (
    data.map((row, rowIdx) => (
      <TableRow key={row.id || `row-${rowIdx}`} className="hover:bg-slate-50/50 transition-colors">
        {columns.map((column, colIdx) => (
          <TableCell key={column.id || column.accessorKey || `cell-${colIdx}`}>
            {column.cell
              ? column.cell(row)
              : column.accessorKey // এখানে চেক করা হচ্ছে accessorKey আছে কি না
                ? (row as Record<string, any>)[column.accessorKey]
                : "—"} 
          </TableCell>
        ))}
      </TableRow>
    ))
  ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-10 text-gray-400 italic">
                  No records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {pagination && paginationMeta && (
        <div className="flex items-center justify-between px-2">
          <div className="text-xs font-medium text-slate-500">
            Showing <span className="text-black font-bold">{paginationMeta.page}</span> of <span className="text-black font-bold">{paginationMeta.totalPages}</span> pages 
            <span className="ml-1 text-slate-300">({paginationMeta.total} results)</span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handlePreviousPage}
              disabled={paginationMeta.page <= 1}
              className="rounded-lg h-8 text-[11px] font-bold uppercase tracking-tight"
            >
              <ChevronLeft className="w-3 h-3 mr-1" />
              Prev
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleNextPage}
              disabled={paginationMeta.page >= paginationMeta.totalPages}
              className="rounded-lg h-8 text-[11px] font-bold uppercase tracking-tight"
            >
              Next
              <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}