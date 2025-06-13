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
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Clients',
    url: '/',
    icon: Contact,
  },
  {
    title: 'Calendar',
    url: '/',
    icon: Calendar,
  },
  {
    title: 'Finance',
    url: '/',
    icon: CircleDollarSign,
  },
];

const registrationItems = [
  {
    title: 'Registrations',
    icon: ClipboardPen,
    options: [
      {
        name: 'Routines',
        action: 'newRoutine',
        icon: Plus,
      },
      // Add more registration options here
    ],
  },
];

export function AppSidebar() {
  const [expandedItems, setExpandedItems] = useState({});
  const { openModal } = useModal();

  const toggleExpanded = itemTitle => {
    setExpandedItems(prev => ({
      ...prev,
      [itemTitle]: !prev[itemTitle],
    }));
  };

  const handleOptionClick = action => {
    openModal(action);
  };

  return (
    <Sidebar>
      <SidebarContent className="px-2">
        {/* Profile Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-3 px-3 py-4 mb-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/images/marcelo.png" />
              <AvatarFallback>MC</AvatarFallback>
            </Avatar>
            <span className="font-medium">Marcelo Cavalcante</span>
          </SidebarGroupLabel>

          {/* Main Menu */}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {mainItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className="px-3 py-2">
                    <Link href={item.url} className="flex items-center gap-3">
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Registration Section */}
        <SidebarGroup className="mt-6">
          <SidebarGroupLabel className="px-3 py-2 text-sm font-medium text-muted-foreground">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {registrationItems.map(item => (
                <SidebarMenuItem key={item.title}>
                  <div>
                    {/* Main Item */}
                    <SidebarMenuButton
                      className="px-3 py-2 w-full justify-between"
                      onClick={() => toggleExpanded(item.title)}
                    >
                      <div className="flex items-center gap-3">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {expandedItems[item.title] ? (
                        <ChevronDown className="h-4 w-4" />
                      ) : (
                        <ChevronRight className="h-4 w-4" />
                      )}
                    </SidebarMenuButton>

                    {/* Submenu Options */}
                    {expandedItems[item.title] && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.options.map(option => (
                          <SidebarMenuButton
                            key={option.name}
                            className="px-3 py-2 text-sm"
                            onClick={() => handleOptionClick(option.action)}
                          >
                            <div className="flex items-center gap-2">
                              <option.icon className="h-3 w-3" />
                              <span>New {option.name}</span>
                            </div>
                          </SidebarMenuButton>
                        ))}
                      </div>
                    )}
                  </div>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
