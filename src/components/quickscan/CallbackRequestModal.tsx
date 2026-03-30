import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ConsentCheckboxes from "@/components/ConsentCheckboxes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";
import { pushEvent } from "@/lib/tracking";

const callbackSchema = z.object({
  name: z.string().trim().min(2, "Vul je naam in").max(100),
  phone: z.string().trim().min(6, "Vul je telefoonnummer in").max(20),
  message: z.string().trim().max(500).optional(),
});

type CallbackFormValues = z.infer<typeof callbackSchema>;

interface CallbackRequestModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const CallbackRequestModal = ({ open, onOpenChange }: CallbackRequestModalProps) => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<CallbackFormValues>({
    resolver: zodResolver(callbackSchema),
    defaultValues: { name: "", phone: "", message: "" },
  });

  const onSubmit = async (values: CallbackFormValues) => {
    if (!privacyChecked) {
      setPrivacyError("Je dient akkoord te gaan met de privacyverklaring.");
      return;
    }
    setPrivacyError("");
    setIsSubmitting(true);

    try {
      const { error } = await supabase.functions.invoke("send-callback-request", {
        body: {
          name: values.name,
          phone: values.phone,
          message: values.message || undefined,
        },
      });

      if (error) throw error;

      pushEvent("quickscan_callback_request", { event_source: "quickscan" });
      setIsSubmitted(true);
    } catch {
      toast({
        title: "Er ging iets mis",
        description: "Het formulier kon niet worden verzonden. Probeer het opnieuw.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (value: boolean) => {
    if (!value) {
      // Reset state on close
      setTimeout(() => {
        setIsSubmitted(false);
        setPrivacyChecked(false);
        setPrivacyError("");
        form.reset();
      }, 200);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md">
        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>
            <DialogHeader className="items-center">
              <DialogTitle className="text-xl">Bedankt!</DialogTitle>
              <DialogDescription className="mt-2 text-muted-foreground leading-relaxed">
                We nemen zo snel mogelijk contact met je op.
              </DialogDescription>
            </DialogHeader>
            <Button
              variant="outline"
              className="mt-6 rounded-full"
              onClick={() => handleOpenChange(false)}
            >
              Sluiten
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl tracking-tight">
                Laat je terugbellen
              </DialogTitle>
              <DialogDescription className="text-muted-foreground leading-relaxed">
                Laat je gegevens achter en we bellen je zo snel mogelijk terug voor een kort gesprek over je resultaten.
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Naam *</FormLabel>
                      <FormControl>
                        <Input placeholder="Je naam" className="h-11 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefoonnummer *</FormLabel>
                      <FormControl>
                        <Input type="tel" placeholder="06 1234 5678" className="h-11 rounded-xl" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Korte toelichting (optioneel)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Bijv. wanneer je het beste bereikbaar bent"
                          className="rounded-xl resize-none"
                          rows={3}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <ConsentCheckboxes
                  privacyChecked={privacyChecked}
                  onPrivacyChange={(v) => {
                    setPrivacyChecked(v);
                    if (v) setPrivacyError("");
                  }}
                  showNewsletter={false}
                  privacyError={privacyError}
                />

                <Button type="submit" disabled={isSubmitting} className="w-full rounded-full h-11">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Verzenden…
                    </>
                  ) : (
                    "Verzoek versturen"
                  )}
                </Button>
              </form>
            </Form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CallbackRequestModal;
