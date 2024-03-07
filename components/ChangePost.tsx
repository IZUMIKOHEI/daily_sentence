import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface ChangePostProps {
  isSubmitting: boolean;
  form: UseFormReturn<{
    content: string;
    tag?: string | undefined;
  }>;
  handleSbumit: () => void;
  title: string;
}
const ChangePost = ({
  form,
  handleSbumit,
  isSubmitting,
  title,
}: ChangePostProps) => {
  return (
    <div className="w-full flex-center">
      <div className="max-container py-16 md:py-8 md:px-16 rounded-2xl mt-8 mb-58">
        <Card className="w-[320px] sm:w-[400px] md:w-[450px] flex-center flex-col shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl tracking-wider">{title}</CardTitle>
          </CardHeader>
          <Form {...form}>
            <form
              onSubmit={handleSbumit}
              className="w-full p-8 space-y-6"
            >
              <FormField
                name="content"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>写下你的一句</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        disabled={isSubmitting}
                        className="h-20 md:h-40"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                name="tag"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>标签名</FormLabel>
                    <Input {...field} disabled={isSubmitting} />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full"
              >
                {isSubmitting ? "提交..." : "提交"}
              </Button>
            </form>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default ChangePost;
