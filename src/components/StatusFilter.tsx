import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Circle, Clock, Filter } from "lucide-react";
import {ConversationStatus, ConversationStatusType} from '../app/backend/types';
import {Button} from './ui/button';
import {Badge} from './ui/badge';

const iconClass = "inline-flex mr-2";
const statusIcons = {
  OPEN: <Circle size="15px" className={iconClass} />,
  PENDING: <Clock size="15px" className={iconClass} />,
  CLOSED: <Circle fill="gray" size="15px" className={iconClass} />,
} as const;

export const StatusFilter = ({ onStatusChange }: { onStatusChange: (statuses: ConversationStatusType[]) => void }) => {
  const [selectedStatuses, setSelectedStatuses] = useState<ConversationStatusType[]>([ConversationStatus.OPEN, ConversationStatus.PENDING]);
  const statuses = Object.values(ConversationStatus);

  const handleStatusChange = (status: ConversationStatusType) => {
    const newSelectedStatuses = selectedStatuses.includes(status)
      ? selectedStatuses.filter(s => s !== status)
      : [...selectedStatuses, status];

    setSelectedStatuses(newSelectedStatuses);
    onStatusChange(newSelectedStatuses);
  };


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">
          <Filter size="15px" className="mr-2" />
          Status
          {selectedStatuses.length > 0 && (
            <Badge className="ml-2">
              {selectedStatuses.length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {statuses.map((status) => (
          <DropdownMenuCheckboxItem 
            key={status} 
            checked={selectedStatuses.includes(status)}
            onCheckedChange={() => handleStatusChange(status)}
          >
            {statusIcons[status]} {status}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default StatusFilter;
