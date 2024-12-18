"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Home,
    Users,
    Calendar,
    MessageSquare,
    FileText,
    Settings,
    Menu,
    LogOut,
    LayoutDashboardIcon,
    X,
} from "lucide-react";
import { SignOutButton, UserButton, useAuth } from "@clerk/nextjs";

const sidebarItems = [
    { name: "Home", href: "/home", icon: Home },
    // { name: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { name: "Appointments", href: "/appointments", icon: Calendar },
    // { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Records", href: "/records", icon: FileText },
    // { name: "Settings", href: "/settings", icon: Settings },
];

export default function MySidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const { userId } = useAuth();

    useEffect(() => {
        if (!userId) {
            router.push("/");
        }
    }, []);
    if (
        pathname === "/" ||
        pathname.includes("/meeting/live/") ||
        !userId ||
        pathname.includes("/auth") ||
        pathname.includes("whiteboard")
    )
        return null;

    // if (typeof window === "undefined") return null;

    if (window.innerWidth > 800) {
        return (
            <div
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                className={cn(
                    "absolute  top-0 left-0 z-50 flex flex-col h-screen p-4 bg-white shadow-sm border-r  border-gray-200 transition-all duration-300 ease-in-out ",
                    isOpen ? "w-64" : "w-28"
                )}
            >
                <div className="flex items-center justify-center mb-40">
                    <UserButton />
                </div>
                <ScrollArea className="flex-grow mt-8">
                    <div className="space-y-4 ">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3  pl-2 rounded-lg transition-colors",
                                    pathname === item.href && isOpen
                                        ? "bg-[#FF7F50] text-white"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-4 py-3 rounded-lg flex items-center justify-center",
                                        pathname === item.href
                                            ? "bg-[#FF7F50] text-white"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <span
                                    className={cn(
                                        "transition-opacity duration-300",
                                        isOpen ? "opacity-100" : "opacity-0"
                                    )}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <div className="mt-auto">
                    <SignOutButton>
                        <Button
                            variant="ghost"
                            className="w-full justify-start space-x-4"
                        >
                            <LogOut className="w-6 h-6" />
                            <span
                                className={cn(
                                    "transition-opacity duration-300",
                                    isOpen ? "opacity-100" : "opacity-0"
                                )}
                            >
                                Log out
                            </span>
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        );
    } else {
        return (
            <div
                className={cn(
                    "absolute  top-0 left-0 z-50 flex flex-col h-screen p-4 bg-white shadow-sm border-r  border-gray-200 transition-all duration-300 ease-in-out -translate-x-[100%] ",
                    "w-28"
                )}
                id="sidebar"
            >
                <div className="absolute top-0 left-0 w-full p-2 flex justify-end items-center">
                    <X
                        className="w-5 h-5 text-gray-600 cursor-pointer"
                        onClick={() => {
                            document
                                .getElementById("sidebar")
                                .classList.add("-translate-x-[100%]");
                        }}
                    />
                </div>
                <div className="flex items-center justify-center mb-40 mt-6">
                    <UserButton />
                </div>
                <ScrollArea className="flex-grow mt-8">
                    <div className="space-y-4 ">
                        {sidebarItems.map((item) => (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={cn(
                                    "flex items-center space-x-3  pl-2 rounded-lg transition-colors",
                                    pathname === item.href && isOpen
                                        ? "bg-[#FF7F50] text-white"
                                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                )}
                            >
                                <div
                                    className={cn(
                                        "px-4 py-3 rounded-lg flex items-center justify-center",
                                        pathname === item.href
                                            ? "bg-[#FF7F50] text-white"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                >
                                    <item.icon className="w-7 h-7" />
                                </div>
                                <span
                                    className={cn(
                                        "transition-opacity duration-300",
                                        isOpen ? "opacity-100" : "opacity-0"
                                    )}
                                >
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </ScrollArea>
                <div className="mt-auto">
                    <SignOutButton>
                        <Button
                            variant="ghost"
                            className="w-full justify-start space-x-4"
                        >
                            <LogOut className="w-6 h-6" />
                            <span
                                className={cn(
                                    "transition-opacity duration-300",
                                    isOpen ? "opacity-100" : "opacity-0"
                                )}
                            >
                                Log out
                            </span>
                        </Button>
                    </SignOutButton>
                </div>
            </div>
        );
    }
}
