import {ConversationById} from "../../app/backend/api";
import {Avatar, AvatarImage, AvatarFallback} from "../ui/avatar";
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "../ui/card";
import {formatDate} from "../../utils/dateUtils";
import {NewConversationMessage} from "./NewConversationMessage";
import {useConversationById} from "./useConversationById";
import {Spinner} from "../Spinner";
import {useEffect, useRef} from "react";
import {ConversationStatus} from "../../app/backend/types";

export const ConversationDetail = ({ id }: { id: string }) => {
  const {conversation, refetch} = useConversationById(id);
  const cardContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (cardContentRef.current) {
      cardContentRef.current.scrollTop = cardContentRef.current.scrollHeight;
    }
  }, [conversation?.messages]);

  if (!conversation) {
    return <Spinner />
  }

  return <div className="container mx-auto mt-8">
    <Card>
      <CardHeader className="flex items-center justify-between p-4 border-b-2 border-gray-100">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage />
            <AvatarFallback>{conversation.user.name.substring(0, 2)}</AvatarFallback>
          </Avatar>

          <div>
            <CardTitle>{conversation.user.name}</CardTitle>
          </div>
        </div>

        {/* (Optional) Badge for conversation status */}
        {/* <Badge variant={conversation.status === 'open' ? 'secondary' : 'default'}>
    {conversation.status}
  </Badge> */}
      </CardHeader>

      <CardContent  ref={cardContentRef} className="space-y-4 max-h-[400px] overflow-y-auto">
        {conversation.messages.map((message) => (
          <Card key={message.id} className="mt-4 mb-4"> 
            <CardContent className="space-y-2 p-6">
              <p className="text-sm text-gray-600">
                {message.text}
              </p>
              <div className="text-xs text-gray-400">
                Created: {formatDate(message.createdAt)} 
                {message.createdAt !== message.updatedAt && (
                  <> | Updated: {formatDate(message.updatedAt)}</>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </CardContent>

      { conversation.status !== ConversationStatus.CLOSED && <CardFooter className="flex items-center border-t-2 border-gray-100 p-4">
        <NewConversationMessage conversationId={id} onMessage={refetch} />
      </CardFooter>}
    </Card>
  </div>
};
