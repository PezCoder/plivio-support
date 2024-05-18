import {
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "../ui/form";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {addMessageToConversation} from "../../app/backend/api";

const formSchema = z.object({
  message: z.string().nonempty({
    message: "Please enter a message.",
  }),
});

type NewUserProps = {
  conversationId: string;
  onMessage: () => void;
}

export function NewConversationMessage({ onMessage, conversationId }: NewUserProps) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: Error handle
    await addMessageToConversation(conversationId, values.message);

    // Clear form
    form.setValue('message', '');
    form.clearErrors('message');

    onMessage();
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-1">
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="flex-1 mr-4">
              <FormControl>
                <Input placeholder="Enter customer issue in detail..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="mt-0" type="submit">Log Message</Button> 
      </form>
    </Form>
  );
}
