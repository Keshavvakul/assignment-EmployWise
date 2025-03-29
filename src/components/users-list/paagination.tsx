import { Button } from "@/components/ui/button"
import { Post } from "@/constants/columns"
import { Table } from "@tanstack/react-table"


export const Pagination = ({ table, setPage }: {table: Table<Post>, setPage: (page: number) => void}) => {
  const pageIndex = table.getState().pagination.pageIndex;

    return (
        <div className="flex items-center justify-between space-x-2 py-4">
            <div className="flex-1 text-sm text-muted-foreground">
              Showing {pageIndex * table.getState().pagination.pageSize + 1} to{" "}
              {Math.min(
                (pageIndex + 1) * table.getState().pagination.pageSize,
                table.getFilteredRowModel().rows.length,
              )}{" "}
              of {table.getFilteredRowModel().rows.length} entries
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(pageIndex - 1)}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => setPage(pageIndex + 1)} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
        </div>
    )
}