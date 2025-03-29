import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DeleteButton } from "@/components/AlertDialog/DeleteButton"
import { EditButton } from "@/components/AlertDialog/EditButton"

export type Post = {
  id: number
  email: string
  first_name: string
  last_name: string
  avatar: string
}

export const columns: ColumnDef<Post>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => ( <div className="ml-5">{row.getValue("id")}</div> )
  },
  {
    accessorKey: "avatar",
    header: "Avatar",
    cell: ({ row }) => {
      const avatar = row.getValue("avatar") as string
      return <img src={avatar} alt="avatar" className="w-10 h-10 rounded-full" />
    },
  },
  {
    accessorKey: "first_name",
    header: "First Name",
  },
  {
    accessorKey: "last_name",
    header: "Last Name",
  },
  {
    accessorKey: "email",
    header: "Email"
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original as Post
      return (
        <div className="flex space-x-2">
          <EditButton user={user}/>
          <DeleteButton id={user.id}/>
        </div>
      )
    }
  }
]