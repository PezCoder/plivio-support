import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {createUser, startConversation} from "../../app/backend/api";
import {useState} from "react";
import {User} from "../../app/backend/types";
import {getCurrentDateTimeString} from "../../utils/dateUtils";
import {ChevronsUpDown, Check} from "lucide-react";
import {cn} from "../../lib/utils";
import {Popover, PopoverTrigger, PopoverContent} from "@radix-ui/react-popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  userId: z.string({
    required_error: "Please select a user.",
  }),
});

type NewConversationProps = {
  onCreate: (id: string) => void;
}

const users: User[] = [{
  id: '101',
  createdAt: getCurrentDateTimeString(),
  name: 'rahul'
}, {
  id: '102',
  createdAt: getCurrentDateTimeString(),
  name: 'rohit'
}];

export function NewConversation({ onCreate }: NewConversationProps) {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Add toast
    // TODO: Error handle
    console.log('>> rahul', values);
    const {id} = await startConversation(values.userId);

    // Clear form
    form.setValue('userId', '');
    form.clearErrors('userId');

    setIsOpen(false);
    onCreate(id);
  }

  return (
    <Dialog  open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
      <DialogTrigger>
        <Button>
          Start Conversation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-2">
          <DialogTitle>Start Conversation</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="userId"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>User</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? users.find(
                              (user) => user.id === field.value
                            )?.name
                            : "Select user"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 border-gray-50">
                      <Command className="border-solid border-2 border-gray-100">
                        <CommandInput placeholder="Search user..." />
                        <CommandEmpty>No user found.</CommandEmpty>
                        <CommandGroup>
                          <CommandList>
                            {users.map((user) => (
                              <CommandItem
                                value={user.name}
                                key={user.id}
                                onSelect={() => {
                                  form.setValue("userId", user.id)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    user.id === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {user.name}
                              </CommandItem>
                            ))}
                          </CommandList>
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
