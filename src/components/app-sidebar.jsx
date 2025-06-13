'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Calendar,
  Home,
  CircleDollarSign,
  Contact,
  ClipboardPen,
  ChevronDown,
  ChevronRight,
  Plus,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useModal } from '@/context/ModalContext';

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

const mainItems = [
  {
    title: 'Página Inicial',
    url: '/',
    icon: Home,
  },
  {
    title: 'Clientes',
    url: '/',
    icon: Contact,
  },
  {
    title: 'Agenda',
    url: '/',
    icon: Calendar,
  },
  {
    title: 'Financeiro',
    url: '/',
    icon: CircleDollarSign,
  },
];

export function AppSidebar() {
  const { openModal } = useModal();

  const handleAddRoutine = () => {
    openModal('newRoutine');
  };

  return (
    <Sidebar className="sm:pt-9">
      <SidebarContent className="px-4">
        {/* Profile Section */}
        <SidebarGroup>
          <SidebarGroupContent className="p-0">
            <div className="flex items-center gap-3 pb-4 border-b">
              <Avatar className="h-9 w-9">
                <AvatarImage
                  src="/images/marcelo.png"
                  alt="Marcelo Cavalcante"
                />
                <AvatarFallback className="text-sm font-medium">
                  MC
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="text-sm font-medium leading-none">
                  Marcelo Cavalcante
                </span>
                <span className="text-xs text-muted-foreground mt-1">
                  Administrator
                </span>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Registration Section */}
        <SidebarGroup>
          <SidebarGroupLabel>
            {' '}
            <ClipboardPen />
            Cadastros
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="pl-4 text-primary">
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleAddRoutine}>
                  <span>Rotinas</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
