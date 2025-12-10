'use client'
import {
  ArrowRightLeftIcon,
  CalendarClockIcon,
  ChartNoAxesCombinedIcon,
  ChartPieIcon,
  ChartSplineIcon,
  ClipboardListIcon,
  Clock9Icon,
  CrownIcon,
  FacebookIcon,
  FileIcon,
  HashIcon,
  InstagramIcon,
  KanbanIcon,
  LanguagesIcon,
  LinkedinIcon,
  SettingsIcon,
  SquareActivityIcon,
  TwitterIcon,
  Undo2Icon,
  UsersIcon
} from 'lucide-react'
import {
  AvatarGroup,
  AvatarMore,
} from "@/components/shadcnblocks/avatar-group";

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'
import { TreeView } from '@/components/tree-view'
import { useState } from 'react'
import PDFViewer from '@/components/components/PDFViewer'
import DataTable from '@/components/components/DataTable'
import Example from './example/page'
import GrantCustom from '@/components/grant-custom'
interface TreeDataItem {
    id: string
    name: string
    icon?: React.ComponentType<{ className?: string }>
    selectedIcon?: React.ComponentType<{ className?: string }>
    openIcon?: React.ComponentType<{ className?: string }>
    children?: TreeDataItem[]
    actions?: React.ReactNode
    onClick?: () => void
    draggable?: boolean
    droppable?: boolean
    disabled?: boolean
    className?: string
}

  enum Routes {
    Dashboard = "Dashboard",
    Planning = 'Planning',
    Files = 'Files'
  }


const ApplicationShell = () => {

  const data: TreeDataItem[] = [
    {
      id: "1",
      name: "SAP BTP – Global Account Administration",
      children: [
        {
          id: "2",
          name: "Subcategory – User & Role Management",
          children: [
            {
              id: "3",
              name: "Policy – Multi-Factor Authentication Enforcement"
            },
            {
              id: "4",
              name: "Policy – Password & Authentication Rules",
              children: [
                {
                  id: "41",
                  name: "Rules – Minimum Password Length & Complexity Requirements"
                },
                {
                  id: "42",
                  name: "Rules – Password Expiration, Rotation & Lockout Configurations",
                  children: [
                    {
                      id: "421",
                      name: "Configuration – Expiration Notifications & Forced Reset Policy"
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          id: "5",
          name: "Subcategory – Account Monitoring & Maintenance (Disabled)",
          disabled: true,
          children: [
            {
              id: "6",
              name: "Monitoring – Backup Scheduling & Retention Policies"
            }
          ]
        }
      ]
    },
    {
      id: "7",
      name: "SAP BTP – Observability, Monitoring & Analytics (Draggable)",
      draggable: true,
      children: [
        {
          id: "8",
          name: "Analytics Section – Performance & Usage Reports",
          children: [
            {
              id: "9",
              name: "Report – User Activity & Engagement Metrics by Subaccount"
            },
            {
              id: "10",
              name: "Report – Application Errors, Logs & Audit Trails Overview",
              children: [
                {
                  id: "101",
                  name: "Log Category – API Latency & Throughput Degradation Analysis"
                },
                {
                  id: "102",
                  name: "Log Category – Security Events & Failed Login Attempts"
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: "11",
      name: "SAP BTP – Subaccount & Environment Configurations",
      children: [
        {
          id: "12",
          name: "Environment – Dev Subaccount Configuration",
          children: [
            {
              id: "13",
              name: "Config – Feature Toggles & Beta Experiment Flags"
            },
            {
              id: "14",
              name: "Config – Backend Service & Resource Optimization Settings",
              children: [
                {
                  id: "141",
                  name: "Parameter – Cache Strategy & Invalidation Rules"
                },
                {
                  id: "142",
                  name: "Parameter – Database Connections & Pooling Thresholds"
                }
              ]
            }
          ]
        },
        {
          id: "15",
          name: "Environment – Production Subaccount Settings (Draggable & Disabled)",
          draggable: true,
          disabled: true,
          children: [
            {
              id: "16",
              name: "Deployment Strategy – Zero-Downtime Rollout Configurations"
            }
          ]
        }
      ]
    }
  ];


  const [route, setRoute] = useState<Routes>(Routes.Dashboard)

  return (
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem onClick={() => setRoute(Routes.Dashboard)}>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartNoAxesCombinedIcon />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className='bg-primary/10 rounded-full'>5</SidebarMenuBadge>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
            <SidebarGroup>
              <SidebarGroupLabel>Pages</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem onClick={() => setRoute(Routes.Dashboard)}>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartSplineIcon />
                        <span>Dashboard</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem onClick={() => setRoute(Routes.Planning)}>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        {/* <UsersIcon /> */}
                        <KanbanIcon />
                        <span>Project Planning</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem onClick={() => setRoute(Routes.Files)}>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        {/* <UsersIcon /> */}
                        <FileIcon />
                        <span>Files</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <div className='overflow-x-scroll'>
                      <TreeView data={data}/>
                    </div>
                  </SidebarMenuItem>
                  {/*<SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ChartPieIcon />
                        <span>Engagement Metrics</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <HashIcon />
                        <span>Hashtag Performance</span>
                      </a>
                    </SidebarMenuButton>
                    <SidebarMenuBadge className='bg-primary/10 rounded-full'>3</SidebarMenuBadge>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ArrowRightLeftIcon />
                        <span>Competitor Analysis</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <Clock9Icon />
                        <span>Campaign Tracking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <ClipboardListIcon />
                        <span>Sentiment Tracking</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <CrownIcon />
                        <span>Influencer</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem> */}
                </SidebarMenu>
              </SidebarGroupContent>
             </SidebarGroup>
            {/*<SidebarGroup>
              <SidebarGroupLabel>Supporting Features</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <SquareActivityIcon />
                        <span>Real Time Monitoring</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <CalendarClockIcon />
                        <span>Schedule Post & Calendar</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <Undo2Icon />
                        <span>Report & Export</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <SettingsIcon />
                        <span>Settings & Integrations</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild>
                      <a href='#'>
                        <UsersIcon />
                        <span>User Management</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup> */}
          </SidebarContent>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <header className='bg-card sticky top-0 z-50 border-b'>
            <div className='mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-2 sm:px-6'>
              <div className='flex items-center gap-4'>
                <SidebarTrigger className='[&_svg]:!size-5' />
                <Separator orientation='vertical' className='hidden !h-4 sm:block' />
                <Breadcrumb className='hidden sm:block'>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href='#'>Home</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Free</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className='flex items-center gap-1.5'>
                <LanguageDropdown
                  trigger={
                    <Button variant='ghost' size='icon'>
                      <LanguagesIcon />
                    </Button>
                  }
                />
                <ProfileDropdown
                  trigger={
                    <Button variant='ghost' size='icon' className='size-9.5'>
                      <Avatar className='size-9.5 rounded-md'>
                        <AvatarImage src='https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png' />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </Button>
                  }
                />
              </div>
            </div>
          </header>
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            <Card className='h-250'>
              <CardContent className='h-full'>
                {/* <div className='h-full rounded-md border bg-[repeating-linear-gradient(45deg,var(--muted),var(--muted)_1px,var(--card)_2px,var(--card)_15px)]' > */}
                  {/* <TreeView data={data} /> */}
                  {route === Routes.Dashboard && 
                    <>
                      {/* <div>Dashboard</div> */}
                      <PDFViewer />
                    </>
                  }
                  {route === Routes.Planning && 
                    <div className='w-full flex flex-col'>
                      {/* <TreeView data={data} />  */}
                      {/* <div>Planning</div> */}
                       <AvatarGroup className=' flex justify-end'>
                        <Avatar>
                          <AvatarImage src="https://github.com/haydenbleasel.png" />
                          <AvatarFallback>HB</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarImage src="https://github.com/shadcn.png" />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarImage src="https://github.com/leerob.png" />
                          <AvatarFallback>LR</AvatarFallback>
                        </Avatar>
                        <Avatar>
                          <AvatarImage src="https://github.com/serafimcloud.png" />
                          <AvatarFallback>SC</AvatarFallback>
                        </Avatar>
                        <AvatarMore count={2} />
                      </AvatarGroup>
                    <Example/>
                    {/* <GrantCustom/> */}
                    </div>
                  }
                {/* </div> */}
              </CardContent>
            </Card>
          </main>
          <footer>
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                  Shadcn/studio
                </a>
                , Made for better web design
              </p>
              <div className='flex items-center gap-5'>
                <a href='#'>
                  <FacebookIcon className='size-4' />
                </a>
                <a href='#'>
                  <InstagramIcon className='size-4' />
                </a>
                <a href='#'>
                  <LinkedinIcon className='size-4' />
                </a>
                <a href='#'>
                  <TwitterIcon className='size-4' />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default ApplicationShell
