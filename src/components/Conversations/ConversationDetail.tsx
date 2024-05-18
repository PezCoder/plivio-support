import {ConversationById} from "../../app/backend/api";
import {Avatar, AvatarImage, AvatarFallback} from "../ui/avatar";
import {Card, CardHeader, CardTitle, CardContent, CardFooter} from "../ui/card";
import {formatDate} from "../../utils/dateUtils";

export const ConversationDetail = ({ conversation }: { conversation: ConversationById }) => {
     return <div className="container mx-auto mt-8">
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage />
              <AvatarFallback>{conversation.user.name.substring(0, 2)}</AvatarFallback>
            </Avatar>

            <div>
              <CardTitle>{conversation.user.name}</CardTitle>
            </div>
          </div>
          {/*
          <Badge variant={conversation.status === 'open' ? 'secondary' : 'default'}>
            {conversation.status}
          </Badge>
          */}
        </div>
      </CardHeader>

      <CardContent>
        {conversation.messages.map((message) => (
          <Card key={message.id} className="mb-4"> 
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

      <CardFooter>
      </CardFooter>
    </Card>
    </div>
};
