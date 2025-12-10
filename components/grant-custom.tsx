'use client';
import { faker } from '@faker-js/faker';
import {
  GanttCreateMarkerTrigger,
  GanttFeatureItem,
  GanttFeatureList,
  GanttFeatureListGroup,
  GanttHeader,
  GanttMarker,
  GanttProvider,
  GanttSidebar,
  GanttSidebarGroup,
  GanttSidebarItem,
  GanttTimeline,
  GanttToday,
} from '@/components/ui/shadcn-io/gantt';
import { groupBy } from "lodash";
import { Eye, Link, Trash } from 'lucide-react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

const statuses = [
  { id: faker.string.uuid(), name: 'Not Started', color: '#6B7280' },
  { id: faker.string.uuid(), name: 'In Progress', color: '#F59E0B' },
  { id: faker.string.uuid(), name: 'Completed', color: '#10B981' },
  { id: faker.string.uuid(), name: 'On Hold', color: '#EF4444' },
];

const engineers = Array.from({ length: 6 })
  .fill(null)
  .map(() => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    image: faker.image.avatar(),
  }));

const constructionPhases = [
  { id: faker.string.uuid(), name: 'Foundation & Structure' },
  { id: faker.string.uuid(), name: 'Envelope & Exterior' },
  { id: faker.string.uuid(), name: 'MEP Systems' },
  { id: faker.string.uuid(), name: 'Interior Finishes' },
  { id: faker.string.uuid(), name: 'Site Work' },
];

const projects = [
  { id: faker.string.uuid(), name: 'Residential Complex A' },
  { id: faker.string.uuid(), name: 'Commercial Tower B' },
  { id: faker.string.uuid(), name: 'Infrastructure Project C' },
];

const contractors = [
  { id: faker.string.uuid(), name: 'General Contractor Alpha' },
  { id: faker.string.uuid(), name: 'Specialty Contractor Beta' },
];

const constructionTasks = [
  'Excavation and earthwork',
  'Concrete foundation pouring',
  'Steel frame erection',
  'Masonry wall construction',
  'Roof structure installation',
  'Exterior cladding',
  'Window and door installation',
  'Electrical rough-in',
  'Plumbing installation',
  'HVAC ductwork',
  'Drywall installation',
  'Flooring installation',
  'Painting and finishing',
  'Elevator installation',
  'Fire safety systems',
  'Landscaping',
  'Parking lot paving',
  'Site utilities connection',
  'Final inspections',
  'Punch list completion',
];

const constructionFeatures = Array.from({ length: 20 })
  .fill(null)
  .map((_, index) => ({
    id: faker.string.uuid(),
    name: constructionTasks[index],
    startAt: faker.date.recent({ days: 180 }),
    endAt: faker.date.soon({ days: 180 }),
    status: faker.helpers.arrayElement(statuses),
    owner: faker.helpers.arrayElement(engineers),
    phase: faker.helpers.arrayElement(constructionPhases),
    project: faker.helpers.arrayElement(projects),
    contractor: faker.helpers.arrayElement(contractors),
  }));

const constructionMilestones = [
  {
    id: faker.string.uuid(),
    date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000),
    label: 'Project Kickoff',
    className: 'bg-blue-100 text-blue-900',
  },
  {
    id: faker.string.uuid(),
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
    label: 'Foundation Complete',
    className: 'bg-green-100 text-green-900',
  },
  {
    id: faker.string.uuid(),
    date: new Date(),
    label: 'Structure Review',
    className: 'bg-purple-100 text-purple-900',
  },
  {
    id: faker.string.uuid(),
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    label: 'MEP Inspection',
    className: 'bg-orange-100 text-orange-900',
  },
  {
    id: faker.string.uuid(),
    date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    label: 'Final Delivery',
    className: 'bg-teal-100 text-teal-900',
  },
];

const ConstructionGantt = () => {
  const [features, setFeatures] = useState(constructionFeatures);
  const groupedFeatures = groupBy(features, 'phase.name');

  const sortedGroupedFeatures = Object.fromEntries(
    Object.entries(groupedFeatures).sort(([nameA], [nameB]) =>
      nameA.localeCompare(nameB)
    )
  );

  const handleViewFeature = (id: string) => console.log(`Task selected: ${id}`);
  const handleCopyLink = (id: string) => console.log(`Copy link: ${id}`);
  const handleRemoveFeature = (id: string) =>
    setFeatures((prev) => prev.filter((feature) => feature.id !== id));
  const handleRemoveMarker = (id: string) => console.log(`Remove milestone: ${id}`);
  const handleCreateMarker = (date: Date) =>
    console.log(`Create milestone: ${date.toISOString()}`);

  const handleMoveFeature = (id: string, startAt: Date, endAt: Date | null) => {
    if (!endAt) {
      return;
    }
    setFeatures((prev) =>
      prev.map((feature) =>
        feature.id === id ? { ...feature, startAt, endAt } : feature
      )
    );
    console.log(`Move task: ${id} from ${startAt} to ${endAt}`);
  };

  const handleAddFeature = (date: Date) =>
    console.log(`Add task: ${date.toISOString()}`);

  return (
    <GanttProvider
      value={{
        onMoveFeature: handleMoveFeature,
        onAddFeature: handleAddFeature,
      }}
    >
      <GanttHeader />
      <div className="flex">
        <GanttSidebar>
          {Object.entries(sortedGroupedFeatures).map(([phase, features]) => (
            <GanttSidebarGroup key={phase} name={phase}>
              {features.map((feature) => (
                <GanttSidebarItem key={feature.id} featureId={feature.id}>
                  <ContextMenu>
                    <ContextMenuTrigger asChild>
                      <button
                        className="flex items-center gap-2 w-full text-left"
                        onClick={() => handleViewFeature(feature.id)}
                        type="button"
                      >
                        <div
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: feature.status.color }}
                        />
                        <span className="truncate flex-1">{feature.name}</span>
                        {feature.owner && (
                          <Avatar className="w-5 h-5">
                            <AvatarImage src={feature.owner.image} />
                            <AvatarFallback className="text-xs">
                              {feature.owner.name?.slice(0, 2)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </button>
                    </ContextMenuTrigger>
                    <ContextMenuContent>
                      <ContextMenuItem onClick={() => handleViewFeature(feature.id)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View task
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => handleCopyLink(feature.id)}>
                        <Link className="w-4 h-4 mr-2" />
                        Copy link
                      </ContextMenuItem>
                      <ContextMenuItem onClick={() => handleRemoveFeature(feature.id)}>
                        <Trash className="w-4 h-4 mr-2" />
                        Remove task
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                </GanttSidebarItem>
              ))}
            </GanttSidebarGroup>
          ))}
        </GanttSidebar>
        <GanttTimeline>
          <GanttToday />
          <GanttFeatureList>
            {Object.entries(sortedGroupedFeatures).map(([phase, features]) => (
              <GanttFeatureListGroup key={phase}>
                {features.map((feature) => (
                  <GanttFeatureItem
                    key={feature.id}
                    id={feature.id}
                    start={feature.startAt}
                    end={feature.endAt}
                    className="cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: feature.status.color }}
                    onClick={() => handleViewFeature(feature.id)}
                  />
                ))}
              </GanttFeatureListGroup>
            ))}
          </GanttFeatureList>
          {constructionMilestones.map((marker) => (
            <GanttMarker
              key={marker.id}
              id={marker.id}
              date={marker.date}
              label={marker.label}
              className={marker.className}
              onRemove={() => handleRemoveMarker(marker.id)}
            />
          ))}
          <GanttCreateMarkerTrigger onCreate={handleCreateMarker} />
        </GanttTimeline>
      </div>
    </GanttProvider>
  );
};

export default ConstructionGantt;