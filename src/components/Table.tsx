import React from 'react';
import { ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export interface Column<T> {
  header: string;
  accessor: keyof T;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, item: T) => React.ReactNode;
  width?: string;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  onRowClick?: (item: T) => void;
  isLoading?: boolean;
  emptyMessage?: string;
}

function Table<T extends { id?: string | number }>({
  data,
  columns,
  className = '',
  onRowClick,
  isLoading = false,
  emptyMessage = 'No data available'
}: TableProps<T>) {
  // Get P&L column and action column
  const plColumn = columns.find(col => col.header === 'P&L');
  const actionColumn = columns.find(col => col.header === 'Actions');
  const regularColumns = columns.filter(col => col.header !== 'P&L' && col.header !== 'Actions');

  return (
    <div className={`neu-card p-4 ${className}`}>
      {/* Desktop View */}
      <div className="hidden md:block overflow-x-auto scrollbar-thin">
        <div className="inline-block min-w-full">
          <div className="relative rounded-xl">
            {/* Header Section with Gradient Background */}
            <div className="sticky top-0 z-10 backdrop-blur-sm bg-[#1a1b1e]/80">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 via-purple-400/5 to-blue-400/5 animate-gradient-x opacity-50" />
                <div className="absolute inset-[1px] rounded-xl bg-[#1a1b1e]/90 shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025]" />
                <div className="relative p-4 flex items-center">
                  {regularColumns.map((column, index) => (
                    <div
                      key={index}
                      className={`
                        flex-1
                        ${column.align === 'right' ? 'text-right' : 
                          column.align === 'center' ? 'text-center' : 'text-left'}
                        group
                        cursor-pointer
                        px-2
                      `}
                    >
                      <div className="relative py-2 px-3 rounded-lg transition-all duration-150 hover:scale-[1.02]">
                        <div className="relative flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-gray-200 tracking-wide uppercase whitespace-nowrap group-hover:text-blue-400 transition-colors duration-150">
                            {column.header}
                          </span>
                          <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-all duration-150 transform translate-x-2 group-hover:translate-x-0">
                            <ChevronUp className="h-3 w-3 -mb-1 text-blue-400" />
                            <ChevronDown className="h-3 w-3 -mt-1 text-blue-400" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  {plColumn && (
                    <div className="w-[150px] px-2">
                      <div className="relative py-2 px-3 rounded-lg transition-all duration-150 hover:scale-[1.02]">
                        <div className="relative flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-gray-200 tracking-wide uppercase whitespace-nowrap group-hover:text-blue-400 transition-colors duration-150">
                            {plColumn.header}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  {actionColumn && (
                    <div className="w-[300px] px-2">
                      <div className="relative py-2 px-3 rounded-lg transition-all duration-150 hover:scale-[1.02]">
                        <div className="relative flex items-center justify-center gap-2">
                          <span className="text-sm font-bold text-gray-200 tracking-wide uppercase whitespace-nowrap group-hover:text-blue-400 transition-colors duration-150">
                            {actionColumn.header}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Body Section */}
            <div className="neu-concave mt-4 rounded-xl">
              {isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-400 border-t-transparent" />
                </div>
              ) : data.length === 0 ? (
                <div className="text-center text-gray-400 py-8">{emptyMessage}</div>
              ) : (
                <div className="space-y-2 p-3">
                  {data.map((item, rowIndex) => (
                    <div
                      key={item.id || rowIndex}
                      onClick={() => onRowClick?.(item)}
                      className="relative overflow-hidden rounded-lg transition-all duration-150 hover:scale-[1.01] cursor-pointer group bg-[#1a1b1e] hover:bg-[#1c1d20]"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                      <div className="absolute inset-[1px] rounded-lg bg-[#1a1b1e] group-hover:shadow-[inset_2px_2px_4px_#151617,_inset_-2px_-2px_4px_#1f2025] transition-shadow duration-150" />
                      <div className="relative p-3 flex items-center">
                        {regularColumns.map((column, colIndex) => {
                          const value = item[column.accessor];
                          return (
                            <div
                              key={colIndex}
                              className={`
                                flex-1
                                ${column.align === 'right' ? 'text-right' : 
                                  column.align === 'center' ? 'text-center' : 'text-left'}
                                px-2
                                transition-all
                                duration-150
                                group-hover:scale-[1.02]
                              `}
                            >
                              {column.render ? column.render(value, item) : String(value)}
                            </div>
                          );
                        })}
                        {plColumn && (
                          <div className="w-[150px] px-2 text-right">
                            {plColumn.render ? plColumn.render(item[plColumn.accessor], item) : String(item[plColumn.accessor])}
                          </div>
                        )}
                        {actionColumn && (
                          <div className="w-[300px] px-2">
                            {actionColumn.render ? actionColumn.render(item[actionColumn.accessor], item) : String(item[actionColumn.accessor])}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile View */}
      <div className="block md:hidden space-y-4">
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-400 border-t-transparent" />
          </div>
        ) : data.length === 0 ? (
          <div className="text-center text-gray-400 py-8">{emptyMessage}</div>
        ) : (
          <div className="space-y-6">
            {data.map((item, rowIndex) => (
              <div
                key={item.id || rowIndex}
                onClick={() => onRowClick?.(item)}
                className="group"
              >
                <div className="relative">
                  {/* Main Card */}
                  <div className="relative neu-card p-5 transition-all duration-300 group-hover:scale-[1.02] group-active:scale-[0.98]">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-purple-400/5 to-blue-400/5 opacity-0 group-hover:opacity-100 transition-all duration-300 rounded-2xl" />
                    
                    {/* Content Container */}
                    <div className="relative space-y-4">
                      {/* Script Name Header */}
                      {regularColumns[0] && (
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 neu-button flex items-center justify-center">
                              <span className="text-xl font-bold text-blue-400">
                                {String(item[regularColumns[0].accessor]).charAt(0)}
                              </span>
                            </div>
                            <div>
                              {regularColumns[0].render ? (
                                regularColumns[0].render(item[regularColumns[0].accessor], item)
                              ) : (
                                <span className="text-lg font-bold text-gray-200">
                                  {String(item[regularColumns[0].accessor])}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Main Content Grid */}
                      <div className="grid grid-cols-2 gap-3">
                        {regularColumns.slice(1).map((column, colIndex) => {
                          const value = item[column.accessor];
                          return (
                            <div 
                              key={colIndex}
                              className="neu-concave p-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                            >
                              <div className="flex flex-col gap-1">
                                <span className="text-sm text-gray-400">
                                  {column.header}
                                </span>
                                <div className="flex items-center justify-end gap-1">
                                  {column.render ? (
                                    column.render(value, item)
                                  ) : (
                                    <span className="text-base font-semibold text-gray-200">
                                      {String(value)}
                                    </span>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* P&L Section */}
                      {plColumn && (
                        <div className="w-full neu-concave p-4 rounded-xl">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm text-gray-400">
                              {plColumn.header}
                            </span>
                            <div className="flex items-center justify-end gap-1">
                              {plColumn.render ? (
                                plColumn.render(item[plColumn.accessor], item)
                              ) : (
                                <span className="text-base font-semibold text-gray-200">
                                  {String(item[plColumn.accessor])}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Action Buttons */}
                      {actionColumn && (
                        <div className="space-y-3">
                          {actionColumn.render && actionColumn.render(item[actionColumn.accessor], item)}
                        </div>
                      )}
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 opacity-30" />
                    <div className="absolute bottom-3 left-3 w-2 h-2 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 opacity-30" />
                  </div>

                  {/* Background Glow Effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-blue-400/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-50 transition-all duration-300 -z-10" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Table;