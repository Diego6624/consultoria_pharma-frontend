import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function AdminPagination({ pages, currentPage, onPageChange, disabled = false }) {
  if (!pages?.length || pages.length <= 1) return null;

  const goToPage = (pageNumber) => (event) => {
    event.preventDefault();
    if (!disabled && pageNumber >= 0 && pageNumber < pages.length) {
      onPageChange(pageNumber);
    }
  };

  return (
    <Pagination className="mt-4 justify-end sm:justify-center">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            text="Anterior"
            onClick={goToPage(currentPage - 1)}
            aria-disabled={disabled || currentPage === 0}
            className={disabled || currentPage === 0 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>

        {pages.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              href="#"
              isActive={currentPage === pageNumber}
              onClick={goToPage(pageNumber)}
              aria-disabled={disabled}
              className={disabled ? "pointer-events-none opacity-50" : ""}
            >
              {pageNumber + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            text="Siguiente"
            onClick={goToPage(currentPage + 1)}
            aria-disabled={disabled || currentPage === pages.length - 1}
            className={disabled || currentPage === pages.length - 1 ? "pointer-events-none opacity-50" : ""}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
