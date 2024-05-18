import React from 'react';
import {Badge} from "@/components/ui/badge";
import {Conversation} from '../app/backend/types';

const statusStyles = {
  OPEN: 'outline',
  PENDING: 'secondary',
  CLOSED: 'default',
} as const;

const Status = ({ value }: {value: Conversation['status']}) => {
  const statusText = value;

  return (
    <Badge variant={statusStyles[value]}>
      {statusText}
    </Badge>
  );
};

export default Status;
