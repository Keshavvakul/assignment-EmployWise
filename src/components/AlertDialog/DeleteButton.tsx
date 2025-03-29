import { 
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel
} from "@/components/ui/alert-dialog" 
import { Button } from "@/components/ui/button"
import { deletePosts } from "@/services/api"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { useState } from "react"

export const DeleteButton = ({ id }: { id: number }) => {
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => deletePosts(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"]})
            setIsOpen(false)
        },
        onError: (e) => {
            console.error("Error deleting users ", e)
        }
    })

    const handleDelete = () => {
        mutate();
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="destructive">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete User</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete this user? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsOpen(true)}>Cancle</AlertDialogCancel>
                    <Button variant="outline" onClick={() => handleDelete()}>Delete</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}