import { Post } from "@/constants/columns"
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
import { Input } from "@/components/ui/input"
import { useState, useEffect } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import { updatePosts } from "@/services/api"
 

export const EditButton = ({ user }: { user: Post}) => {
    const [editData, setEditData] = useState<Post>(user);
    const [isOpen, setIsOpen] = useState(false)
    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: () => updatePosts(editData),
        onSuccess: (updatedData) => {
            console.log("Mutation Success: Updated Data", updatedData);
            
            queryClient.getQueryCache().findAll({ queryKey: ["posts"]}).forEach((query) => {
                queryClient.setQueryData(query.queryKey, (oldData: Post[] | undefined) => {
                    console.log("Old Data Before Update:", oldData);
                    if (!oldData) return [];
                    const newData = oldData.map((post: Post) => 
                        post.id === editData.id ? updatedData : post
                    );
                    console.log("New Data After Update:", newData);
                    return newData;
                });

            })
           
            setIsOpen(false)
        },
        onError: (e) => {
            console.error("Error Updating User", e)
        }
    })

    useEffect(() => {
        setEditData(user);
    }, [user]);

    const handleOpenChange = (open: boolean) => {
        if (open) {
            setEditData(user);
        }
        setIsOpen(open);
    };

    const handleUpdate = () => {
        mutate();
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
            <AlertDialogTrigger asChild>
                <Button size="sm" variant="default">Edit</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Edit User</AlertDialogTitle>
                    <AlertDialogDescription>Update the user details and save changes.</AlertDialogDescription>
                </AlertDialogHeader>
                <div className="space-y-2">
                    <Input 
                        placeholder="First name"
                        value={editData.first_name}
                        onChange={(e) => setEditData({ ...editData, first_name: e.target.value })}
                        className="border border-gray-300 focus:border-black focus:ring-0"
                    />
                    <Input 
                        placeholder="Last name"
                        value={editData.last_name}
                        onChange={(e) => setEditData({ ...editData, last_name: e.target.value})}
                        className="border border-gray-300 focus:border-black focus:ring-0"
                    />
                    <Input 
                        placeholder="Email"
                        value={editData.email}
                        onChange={(e) => setEditData({ ...editData, email: e.target.value})}
                        className="border border-gray-300 focus:border-black focus:ring-0"
                    />
                </div>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <Button variant="default" onClick={() => handleUpdate()}>Save</Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}