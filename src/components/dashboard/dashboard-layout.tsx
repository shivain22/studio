'use client';

import * as React from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Home, MapPin, Users, FileText, BarChart2, Settings, LogOut, Sprout } from 'lucide-react';

type Role = 'farmer' | 'field-agent' | 'supervisor' | 'local-partner' | 'aurigraph-spox' | 'vvb' | 'unknown';

interface DashboardLayoutProps {
  children: React.ReactNode;
  role: Role;
  roleDisplayName: string;
}

// Define navigation items for each role
const navItems: Record<Role, { href: string; label: string; icon: React.ElementType }[]> = {
  farmer: [
    { href: '/dashboard/farmer', label: 'Dashboard', icon: Home },
    { href: '/dashboard/farmer/plots', label: 'My Plots', icon: MapPin },
    { href: '/dashboard/farmer/settings', label: 'Settings', icon: Settings },
  ],
  'field-agent': [
    { href: '/dashboard/field-agent', label: 'Dashboard', icon: Home },
    { href: '/dashboard/field-agent/farmers', label: 'My Farmers', icon: Users },
    { href: '/dashboard/field-agent/plots', label: 'Plot Approvals', icon: FileText },
    { href: '/dashboard/field-agent/settings', label: 'Settings', icon: Settings },
  ],
  supervisor: [
    { href: '/dashboard/supervisor', label: 'Dashboard', icon: Home },
    { href: '/dashboard/supervisor/field-agents', label: 'My Field Agents', icon: Users },
    { href: '/dashboard/supervisor/approvals', label: 'Plot Approvals', icon: FileText },
    { href: '/dashboard/supervisor/reports', label: 'Reports', icon: BarChart2 },
    { href: '/dashboard/supervisor/settings', label: 'Settings', icon: Settings },
  ],
  'local-partner': [
    { href: '/dashboard/local-partner', label: 'Dashboard', icon: Home },
    { href: '/dashboard/local-partner/supervisors', label: 'My Supervisors', icon: Users },
    { href: '/dashboard/local-partner/reports', label: 'Area Reports', icon: BarChart2 },
    { href: '/dashboard/local-partner/settings', label: 'Settings', icon: Settings },
  ],
  'aurigraph-spox': [
    { href: '/dashboard/aurigraph-spox', label: 'Dashboard', icon: Home },
    { href: '/dashboard/aurigraph-spox/local-partners', label: 'Local Partners', icon: Users },
    { href: '/dashboard/aurigraph-spox/overview', label: 'Project Overview', icon: BarChart2 },
    { href: '/dashboard/aurigraph-spox/settings', label: 'Settings', icon: Settings },
  ],
  vvb: [
     { href: '/dashboard/vvb', label: 'Dashboard', icon: Home },
     { href: '/dashboard/vvb/validation', label: 'Validation Tasks', icon: FileText },
     { href: '/dashboard/vvb/reports', label: 'Validation Reports', icon: BarChart2 },
     { href: '/dashboard/vvb/settings', label: 'Settings', icon: Settings },
  ],
  unknown: [], // No items for unknown role
};


export function DashboardLayout({ children, role, roleDisplayName }: DashboardLayoutProps) {
  const currentNavItems = navItems[role] || [];

  const handleLogout = () => {
     // Placeholder for logout logic
     console.log('Logging out...');
     window.location.href = '/'; // Redirect to home/login page
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="border-b border-sidebar-border">
           <div className="flex items-center gap-2 p-2">
              <Sprout className="h-6 w-6 text-primary" />
               <span className="font-semibold">RiceWise AWD</span>
           </div>
        </SidebarHeader>
        <SidebarContent className="p-2 flex-grow">
          <SidebarMenu>
            {currentNavItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                 <Link href={item.href} passHref legacyBehavior>
                   <SidebarMenuButton
                     tooltip={item.label} // Show tooltip when collapsed
                   >
                     <item.icon />
                     <span>{item.label}</span>
                   </SidebarMenuButton>
                 </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2 border-t border-sidebar-border">
           <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} tooltip="Logout">
                   <LogOut />
                   <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
           </SidebarMenu>
          <div className="flex items-center gap-2 p-2 mt-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://picsum.photos/40/40" alt="User Avatar" data-ai-hint="person avatar" />
              <AvatarFallback>{roleDisplayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="text-sm font-medium group-data-[collapsible=icon]:hidden">
              {roleDisplayName}
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="flex flex-col">
         <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6 shadow-sm">
            <SidebarTrigger className="md:hidden" /> {/* Hamburger for mobile */}
            <h1 className="text-xl font-semibold">{roleDisplayName} Dashboard</h1>
             {/* Maybe add other header elements like search or notifications later */}
             <div>{/* Placeholder for actions */}</div>
         </header>
         <main className="flex-1 overflow-auto p-4 md:p-6">
           {children}
         </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
