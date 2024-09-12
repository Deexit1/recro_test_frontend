'use client'

import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { LayoutDashboard, Users, Briefcase, Calendar, FileText, Settings, Menu, LogOutIcon } from 'lucide-react'
import Cookies from 'js-cookie'
import { useQueryClient } from '@tanstack/react-query'

const sidebarItems = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Candidates', href: '/candidates', icon: Users },
]

export function Sidebar() {
    const location = useLocation()
    const pathname = location.pathname
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    return (
        <>
            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="md:hidden fixed top-4 left-4 z-40">
                        <Menu className="h-6 w-6" />
                        <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left" className="p-0">
                    <MobileMenu pathname={pathname} setIsMobileMenuOpen={setIsMobileMenuOpen} />
                </SheetContent>
            </Sheet>

            {/* Desktop Sidebar */}
            <div className="hidden md:flex">
                <DesktopSidebar pathname={pathname} />
            </div>
        </>
    )
}

function MobileMenu({ pathname, setIsMobileMenuOpen }) {

    const navigate = useNavigate()
    const handleLogout = () => {
        console.log("executing logout");
        Cookies.remove('token');
        navigate('/')
    }
    return (
        <ScrollArea className="h-full py-6 pl-6 pr-6">
            <h2 className="text-lg font-semibold mb-6 text-center">Recruitment Portal</h2>
            <div className="relative space-y-2">
                {sidebarItems.map((item) => (
                    <MobileMenuItem
                        key={item.href}
                        item={item}
                        pathname={pathname}
                        setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />
                ))}
                <Button variant="outlined" className="w-full" onClick={handleLogout}>
                    <LogOutIcon className="h-4 w-4 mr-2" />
                    Logout
                </Button>
            </div>
        </ScrollArea>
    )
}

function MobileMenuItem({ item, pathname, setIsMobileMenuOpen }) {
    return (
        <Link
            to={item.href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={cn(
                "flex items-center py-3 px-4 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
            )}
        >
            <item.icon className="mr-3 h-5 w-5" />
            {item.name}
        </Link>
    )
}

function DesktopSidebar({ pathname }) {
    const navigate = useNavigate()

    const handleLogout = () => {
        console.log("executing logout");
        Cookies.remove('token')
        navigate('/')
    }
    return (
        <div className="space-y-4 py-4 flex flex-col h-screen bg-background">
            <div className="px-3 py-2">
                <h2 className="mb-2 px-4 text-lg font-semibold">Recruitment Portal</h2>
                <div className="space-y-1">
                    {sidebarItems.map((item) => (
                        <DesktopMenuItem key={item.href} item={item} pathname={pathname} />
                    ))}
                    <Button variant="outlined" className="w-full" onClick={handleLogout}>
                        <LogOutIcon className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    )
}

function DesktopMenuItem({ item, pathname }) {
    return (
        <Link
            to={item.href}
            className={cn(
                "flex items-center py-2 px-3 rounded-lg text-sm font-medium transition-colors",
                pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
            )}
        >
            <item.icon className="mr-2 h-4 w-4" />
            {item.name}
        </Link>
    )
}