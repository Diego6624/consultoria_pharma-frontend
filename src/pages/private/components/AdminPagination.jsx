import { Button } from "@/components/ui/button";

export default function AdminPagination({ pages, currentPage, onPageChange, disabled = false }) {
  if (!pages?.length || pages.length <= 1) return null;

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      {pages.map((pageNumber) => (
        <Button
          key={pageNumber}
          variant={currentPage === pageNumber ? "secondary" : "outline"}
          size="sm"
          onClick={() => onPageChange(pageNumber)}
          disabled={disabled}
        >
          {pageNumber + 1}
        </Button>
      ))}
    </div>
  );
}
