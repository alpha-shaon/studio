'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  LayoutDashboard,
  Upload,
  Settings,
  User,
  LogOut,
  ChevronDown,
} from 'lucide-react';
import { Logo } from '@/components/icons';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ReportGenerator from '@/components/report/report-generator';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/upload', label: 'Upload Data', icon: Upload },
];

const settingsItem = {
  href: '#',
  label: 'Settings',
  icon: Settings,
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();
  const [role, setRole] = useState<'Admin' | 'User'>('Admin');

  return (
    <>
      <Sidebar
        variant="inset"
        collapsible={isMobile ? 'offcanvas' : 'icon'}
        className="border-r"
      >
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-8 h-8 text-primary" />
            <span className="font-bold text-lg font-headline text-primary">
              FinanceFlow
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.label}>
                <Link href={item.href} legacyBehavior passHref>
                  <SidebarMenuButton
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    asChild
                  >
                    <a>
                      <item.icon />
                      <span>{item.label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={pathname === settingsItem.href}
                tooltip={settingsItem.label}
                disabled
              >
                <settingsItem.icon />
                <span>{settingsItem.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="p-2">
          {/* User profile dropdown will be in the header */}
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <div className="flex-1" />
          <ReportGenerator isAdmin={role === 'Admin'} />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="https://placehold.co/40x40" alt="@user" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <div className="text-left hidden md:block">
                  <p className="text-sm font-medium">User</p>
                  <p className="text-xs text-muted-foreground">{role}</p>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setRole(role === 'Admin' ? 'User' : 'Admin')}>
                Switch to {role === 'Admin' ? 'User' : 'Admin'}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main>{children}</main>
      </SidebarInset>
    </>
  );
}
