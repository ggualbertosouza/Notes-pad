'use client'

import { ModeToggle } from "@/components/themeToggle"
import { useScroll } from "@/hooks/useScroll"
import { cn } from "@/lib/utils"
import {useConvexAuth} from 'convex/react'
import {SignInButton, UserButton} from '@clerk/clerk-react'
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/spinner"
import Link from "next/link"

export const NavBar = () => {
    const { isAuthenticated, isLoading } = useConvexAuth()
    const scrolled = useScroll()
    return(
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-center w-full p-6 dark:bg-[#1F1F1F]",
            scrolled && 'border-b shadow-sm'
        )}>
            <p className="whitespace-nowrap font-bold text-xl">Notes-Pad</p>
            <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
                {isLoading && 
                <Spinner />}
                {!isAuthenticated && !isLoading && (
                    <>
                        <SignInButton mode="modal">
                            <Button variant={'ghost'} size={'sm'}>Login</Button>
                        </SignInButton>
                    </>
                )}
                {isAuthenticated && !isLoading && (
                    <>
                        <Button size={'sm'} asChild>
                            <Link href='/documents'>Enter notes</Link>
                        </Button>
                        <UserButton 
                        afterSignOutUrl="/"
                        />
                    </>
                )}
                <ModeToggle /> 
            </div>
        </div>
    )
}