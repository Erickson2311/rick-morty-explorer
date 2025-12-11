import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  hasNext,
  hasPrev,
  onPageChange
}) => {
  const handlePrevious = () => {
    if (hasPrev) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-center gap-4 py-4">
      <button
        onClick={handlePrevious}
        disabled={!hasPrev}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Previous
      </button>
      
      <div className="flex items-center gap-2">
        <span className="text-gray-700">Page</span>
        <span className="font-bold text-blue-600">{currentPage}</span>
        <span className="text-gray-700">of</span>
        <span className="font-bold text-gray-900">{totalPages}</span>
      </div>
      
      <button
        onClick={handleNext}
        disabled={!hasNext}
        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Next
      </button>
    </div>
  );
};