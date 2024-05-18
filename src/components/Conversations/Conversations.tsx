import {Spinner} from "../../components/Spinner";
import {Button} from "../../components/ui/button";
import {Table, TableHeader, TableRow, TableHead, TableBody, TableCell} from "@/components/ui/table";
import {Card, CardHeader, CardTitle, CardDescription, CardContent} from "../../components/ui/card";
import {formatDate} from "../../utils/dateUtils";
import {Badge} from "@/components/ui/badge";
import {useConversations} from "./useConversations";
import {ConversationWithUser} from "../../app/backend/api";

type ConversationsProps = {
  conversations: ConversationWithUser[] | null;
  onRowClick: (id: string) => void;
}
export const Conversations = ({ conversations, onRowClick }: ConversationsProps) => {

  if (!conversations) {
    return <Spinner />;
  }

  return (
      <Card x-chunk="dashboard-05-chunk-3" className="flex-1">
        <CardHeader className="px-7">
          <CardTitle>Conversations</CardTitle>
          <CardDescription>
            All user conversations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Conversation</TableHead>
                <TableHead>User</TableHead>
                <TableHead className="hidden sm:table-cell">
                  Status
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Created At
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Updated At
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                conversations.map(conversation => (
                  <TableRow key={conversation.id} onClick={() => onRowClick(conversation.id)} className="cursor-pointer">
                    <TableCell>
                      {conversation.id}
                    </TableCell>
                    <TableCell>
                      {conversation.last_message ?? '-'}
                    </TableCell>
                    <TableCell>
                      {conversation.user.name}
                    </TableCell>
                    <TableCell>
                      <Badge className="text-xs" variant="secondary">
                        Fulfilled
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {formatDate(conversation.createdAt)}
                    </TableCell>
                    <TableCell>
                      {formatDate(conversation.updatedAt)}
                    </TableCell>
                    <TableCell>
                      <Button variant="outline">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </CardContent>
      </Card>
  );
};
