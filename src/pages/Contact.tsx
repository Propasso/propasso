import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import PageLayout from "@/components/PageLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ChevronRight } from "lucide-react";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  message: z.string().trim().min(1, "Bericht is verplicht").max(2000),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const mailtoLink = `mailto:info@propasso.nl?subject=Contactformulier: ${encodeURIComponent(data.name)}&body=${encodeURIComponent(
        `Naam: ${data.name}\nE-mail: ${data.email}\n\nBericht:\n${data.message}`
      )}`;
      window.location.href = mailtoLink;
      toast({
        title: "Bedankt voor je bericht",
        description: "Je e-mailclient wordt geopend om het bericht te versturen.",
      });
      form.reset();
    } catch {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of mail direct naar info@propasso.nl.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <section className="py-16 md:py-24">
        <div className="section-container max-w-2xl">
          <p className="eyebrow">Contact</p>
          <h1 className="mt-5 text-4xl md:text-5xl font-bold leading-tight text-balance">
            Neem contact op
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            Wil je vrijblijvend kennismaken of heb je een vraag over exit planning en bedrijfsoverdracht? Vul het formulier in en we nemen zo snel mogelijk contact op.
          </p>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10 space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Naam</FormLabel>
                    <FormControl>
                      <Input placeholder="Je volledige naam" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mailadres</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="je@email.nl" {...field} />
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
                    <FormLabel>Bericht</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Waar kunnen we je mee helpen?" rows={5} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="rounded-full px-7 py-4 h-auto text-base font-semibold"
              >
                Verstuur bericht
                <ChevronRight size={18} />
              </Button>
            </form>
          </Form>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground">
              Of mail direct naar{" "}
              <a href="mailto:info@propasso.nl" className="font-semibold text-primary hover:underline">
                info@propasso.nl
              </a>
            </p>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
