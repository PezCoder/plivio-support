import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import React from "react";
import {ConversationStatus, ConversationStatusType} from "../../app/backend/types";
import {Circle, Clock} from "lucide-react";


const iconClass ="inline-flex mr-2";
const statusIcons = {
  OPEN: <Circle size="15px" className={iconClass}/>,
  PENDING: <Clock size="15px" className={iconClass}/>,
  CLOSED: <Circle fill="gray" size="15px" className={iconClass} />,
} as const;

export const ConversationStatusSelect = ({ value, onChange }: {
  onChange: (value: ConversationStatusType) => void
  value: ConversationStatusType
}) => {
  return (
    <Select onValueChange={(value) => onChange(value as ConversationStatusType)} value={value}>
      <SelectTrigger className="w-[150px]">
        <SelectValue>{statusIcons[value]}{value}</SelectValue>
      </SelectTrigger>
      <SelectContent className="w-[150px]">
        <SelectItem value={ConversationStatus.OPEN}>
          {statusIcons.OPEN}Open
        </SelectItem>
        <SelectItem value={ConversationStatus.PENDING}>
          {statusIcons.PENDING}Pending
        </SelectItem>
        <SelectItem value={ConversationStatus.CLOSED}>
          {statusIcons.CLOSED}Closed
        </SelectItem>
      </SelectContent>
    </Select>
  );
};
