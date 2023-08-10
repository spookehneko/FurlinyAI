"use client"
import Link from 'next/link';
import { Poppins } from 'next/font/google';
import { Menu, Sparkles } from 'lucide-react';
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from './mode-toggle';

import { cn } from '@/lib/utils';
import { Button } from "@/components/ui/button"

const font = Poppins({
    weight: "600",
    subsets: ["latin"]
})

function Navbar() {
  return (
    <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary">
        <div className="flex items-center">
            <Menu className="block md:hidden"/>
            <Link href="/">
                <h1 className={cn(
                    'hidden md:block text-xl md:text-3xl font-bold text-primary',
                    font.className
                    )}>YourChara.ai</h1>
            </Link>
        </div>
        <div className='flex items-center gap-x-3'>
            <Button variant="premium" size="sm">
                Upgrade
                <Sparkles className="h-4 w-4 fill-white text-white ml-2" />
            </Button>
            <ModeToggle />
            <UserButton afterSignOutUrl="/"/>
        </div>
    </div>
  )
}

export default Navbar