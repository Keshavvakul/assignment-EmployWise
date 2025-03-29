import { useState } from "react"
import {
  type ColumnFiltersState,
  type SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useQuery } from "@tanstack/react-query"
import { columns } from "@/constants/columns"
import { fetchPost } from "@/services/api"
import { DataTable } from "./dataTable"
import { Pagination } from "./paagination"

export const Dashboard = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState({})
  const [page, setPage] = useState(0);
  const [pageSize] = useState<number>(10)

  // Fetch data using useQuery
  const { data = [], error, isLoading } = useQuery({
    queryKey: ["posts", page],
    queryFn: async () => {
        const result = await fetchPost(page + 1, pageSize);
        console.log("Api Response: ", result)
        return result
    },
    staleTime: 30000,
  })

  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination: {
        pageIndex: page,
        pageSize: pageSize
      }
    },
    pageCount: -1,
    manualPagination: true
  })

  // Handle loading and error states safely
  if (isLoading)
    return (
      <div className="flex justify-center items-center h-40">
        <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 border-solid"></div>
      </div>
    )  
  if (error) return <div className="text-center p-4 text-red-500">Error loading data: {(error as Error).message}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dashboard Data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
            {/* <ToolBar table={table}/> */}
            <DataTable table={table}/>
            <Pagination table={table} setPage={setPage}/>
        </div>
      </CardContent>
    </Card>
  )
}