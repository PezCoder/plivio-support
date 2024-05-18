import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import {useState} from "react";
import {NewConversationForm} from "./NewConversationForm";

type NewConversationProps = {
  onCreate: (id: string) => void;
}

export function NewConversation({ onCreate }: NewConversationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (id: string) => {
    setIsOpen(false);
    onCreate(id);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger>
        <Button>
          Start Conversation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Start Conversation</DialogTitle>
        </DialogHeader>
        <NewConversationForm onSubmit={handleSubmit} />
      </DialogContent>
    </Dialog>
  )
}
