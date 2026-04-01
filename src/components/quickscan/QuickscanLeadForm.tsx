import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/integrations/supabase/client";
import { DiagnoseScores, SnapshotData } from "@/data/diagnoseData";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ConsentCheckboxes from "@/components/ConsentCheckboxes";
import { useToast } from "@/hooks/use-toast";
import { Loader2, FileText } from "lucide-react";
import { pushEvent } from "@/lib/tracking";

const formSchema = z.object({
  name: z.string().trim().min(2, "Vul uw naam in").max(100),
  email: z.string().trim().email("Vul een geldig e-mailadres in").max(255),
  company: z.string().trim().max(100).optional(),
  phone: z.string().trim().max(20).optional()
});

type FormValues = z.infer<typeof formSchema>;

interface QuickscanLeadFormProps {
  scores: DiagnoseScores;
  snapshot: SnapshotData;
  answers: Record<number, string>;
  onSuccess: () => void;
}

const QuickscanLeadForm = ({ scores, snapshot, answers, onSuccess }: QuickscanLeadFormProps) => {
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [newsletterChecked, setNewsletterChecked] = useState(false);
  const [privacyError, setPrivacyError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", company: "", phone: "" }
  });

  const onSubmit = async (values: FormValues) => {
    if (!privacyChecked) {
      setPrivacyError("U dient akkoord te gaan met de privacyverklaring.");
      return;
    }
    setPrivacyError("");
    setIsSubmitting(true);

    try {
      const payload = {
        name: values.name,
        email: values.email,
        company: values.company || undefined,
        phone: values.phone || undefined,
        newsletter: newsletterChecked,
        scores: {
          business_attractiveness_score: scores.attractiveness.toString(),
          business_readiness_score: scores.readiness.toString(),
          owner_readiness_score: scores.owner.toString()
        },
        snapshot: {
          revenue_band: snapshot.revenueBand,
          employee_band: snapshot.employeeBand,
          role_type: snapshot.roleType,
          profitability: snapshot.profitability,
          exit_horizon: snapshot.exitHorizon
        }
      };

      const { error } = await supabase.functions.invoke("send-diagnose-results", {
        body: payload
      });

      if (error) throw error;

      pushEvent("quickscan_lead_submit", { event_source: "quickscan" });
      toast({
        title: "Rapport verzonden",
        description: `Uw persoonlijk rapport is verstuurd naar ${values.email}.`
      });
      onSuccess();
    } catch {
      toast({
        title: "Er ging iets mis",
        description: "Het rapport kon niet worden verzonden. Probeer het opnieuw.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-xl p-6 md:p-10 bg-muted border-accent border-2">
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 text-muted-foreground font-medium text-sm uppercase tracking-wider mb-3">
          <FileText className="w-4 h-4 text-primary" />
          Gratis persoonlijk rapport
        </span>
        <h3 className="text-2xl md:text-[1.65rem] font-bold text-foreground tracking-tight leading-snug">
          Ontvang gratis 2–3 concrete adviezen per onderdeel
        </h3>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto leading-relaxed">
          Op basis van uw scores stellen wij een persoonlijk rapport samen met praktische verbeterpunten per dimensie; de Aantrekkelijkheid van uw bedrijf voor een koper en uw Persoonlijke en Bedrijfsmatige Verkoopklaarheid.
Direct zichtbaar en in uw inbox.
        
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField control={form.control}
            name="name"
            render={({ field }) =>
            <FormItem>
                  <FormLabel>Naam *</FormLabel>
                  <FormControl>
                    <Input placeholder="Uw naam" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
            } />
            
            <FormField
              control={form.control}
              name="email"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="uw@email.nl" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              } />
            
            <FormField
              control={form.control}
              name="company"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>Bedrijfsnaam</FormLabel>
                  <FormControl>
                    <Input placeholder="Uw bedrijf" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              } />
            
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) =>
              <FormItem>
                  <FormLabel>Telefoonnummer</FormLabel>
                  <FormControl>
                    <Input type="tel" placeholder="06 1234 5678" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              } />
            
          </div>

          <ConsentCheckboxes
            privacyChecked={privacyChecked}
            onPrivacyChange={(v) => {
              setPrivacyChecked(v);
              if (v) setPrivacyError("");
            }}
            newsletterChecked={newsletterChecked}
            onNewsletterChange={setNewsletterChecked}
            privacyError={privacyError} />
          

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ?
            <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verzenden…
              </> :

            "Ontvang uw persoonlijk rapport"
            }
          </Button>
        </form>
      </Form>
    </div>);

};

export default QuickscanLeadForm;