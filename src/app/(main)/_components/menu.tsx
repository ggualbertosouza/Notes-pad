'use client'

import { useRouter } from "next/navigation"
import { Id } from "../../../../convex/_generated/dataModel"
import { useUser } from "@clerk/clerk-react"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Trash } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface menuProps {
    documentId: Id<'documents'>
}

export const Menu = ({documentId}: menuProps) => {
    const router = useRouter()
    const {user} = useUser()
    const archive = useMutation(api.document.archive)


    const onArchive = () => {
        const promise = archive({id: documentId})

        toast.promise(promise, {
            loading: 'Moving to trash...',
            success: 'Note moved to trash!',
            error: 'Failed to archive'
        })

        router.push('/document')
    }


    return(
        <DropdownMenu>
            <DropdownMenuTrigger >
                <Button size='sm' variant='ghost' >
                    <MoreHorizontal className="w-4 h-4"/>
                </Button>
                <DropdownMenuContent className="w-60" align="end" alignOffset={8} forceMount>
                    <DropdownMenuItem
                    onClick={onArchive}
                    >
                        <Trash className="w-4 h-4 mr-2"/>
                        Delete
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <div className="text-xs text-muted-foreground p-2">
                        Last edited by: {user?.fullName}
                    </div>
                </DropdownMenuContent>

            </DropdownMenuTrigger>
        </DropdownMenu>
        )
}

Menu.Skeleton = function MenuSkeleton(){
    return(
        <Skeleton className="h-10 h-10"/>
    )
}