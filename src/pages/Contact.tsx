import { useState } from "react";
import SEO from "@/components/SEO";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import PageLayout from "@/components/PageLayout";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useCookieConsent } from "@/hooks/use-cookie-consent";
import ConsentCheckboxes from "@/components/ConsentCheckboxes";
import { pushEvent } from "@/lib/tracking";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Linkedin,
  Building2,
  CheckCircle2,
  ArrowRight,
  MapPinned,
} from "lucide-react";
import karelImg from "@/assets/images/karel-met-ondernemers.png";
import HubSpotMeetingsEmbed from "@/components/HubSpotMeetingsEmbed";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Naam is verplicht").max(100),
  email: z.string().trim().email("Ongeldig e-mailadres").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Bericht is verplicht").max(2000),
  privacy: z.literal(true, {
    errorMap: () => ({ message: "Je dient akkoord te gaan met de privacyverklaring" }),
  }),
  newsletter: z.boolean().optional(),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const contactOptions = [
  {
    icon: Phone,
    label: "Bel direct",
    value: "06 1005 7566",
    href: "tel:+31610057566",
    description: "Bereikbaar op werkdagen",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "hallo@propasso.nl",
    href: "mailto:hallo@propasso.nl",
    description: "Reactie binnen 24 uur",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "Karel Cremers",
    href: "https://www.linkedin.com/in/karelcremers",
    description: "Persoonlijk profiel",
    external: true,
  },
  {
    icon: Building2,
    label: "LinkedIn",
    value: "Propasso",
    href: "https://www.linkedin.com/company/propasso",
    description: "Bedrijfspagina",
    external: true,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  }),
};

const pageDescription =
  "Neem vrijblijvend contact op voor een persoonlijke kennismaking over exit planning, bedrijfsoverdracht en verkoopklaarheid in het MKB.";

const contactSchemas = [
  {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact | Propasso",
    url: "https://propasso.nl/contact",
    description: pageDescription,
    inLanguage: "nl-NL",
    mainEntity: {
      "@type": "Organization",
      name: "Propasso",
      url: "https://propasso.nl/",
      email: "hallo@propasso.nl",
      telephone: "+31 6 1005 7566",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Nieuwe Linie 12",
        postalCode: "5264PJ",
        addressLocality: "Vught",
        addressCountry: "NL",
      },
      sameAs: [
        "https://www.linkedin.com/company/propasso",
        "https://www.linkedin.com/in/karelcremers",
      ],
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://propasso.nl/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://propasso.nl/contact" },
    ],
  },
];

const GoogleMapsEmbed = () => {
  const { hasConsent } = useCookieConsent();

  if (!hasConsent("marketing")) {
    return (
      <div className="w-full h-[300px] bg-muted rounded-t-2xl flex flex-col items-center justify-center gap-3 text-center p-6">
        <MapPinned className="w-10 h-10 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground font-medium">
          Accepteer cookies om de Google Maps-kaart te laden.
        </p>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Nieuwe+Linie+12+5264+PJ+Vught"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Bekijk locatie op Google Maps
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    );
  }

  return (
    <iframe
      title="Propasso locatie - Nieuwe Linie 12, Vught"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2487.5!2d5.2918!3d51.6565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6e9a0a3a0a1%3A0x0!2sNieuwe+Linie+12%2C+5264+PJ+Vught!5e0!3m2!1snl!2snl!4v1700000000000"
      width="100%"
      height="300"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="pointer-events-none"
    />
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
      privacy: undefined as unknown as true,
      newsletter: false,
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: data.name,
          email: data.email,
          phone: data.phone || undefined,
          message: data.message,
          newsletter: data.newsletter,
        },
      });

      if (error) throw error;

      setIsSubmitted(true);
      form.reset();
      pushEvent("contact_submit", { event_source: "contact" });
      toast({
        title: "Bericht verzonden",
        description: "Bedankt. Ik neem zo snel mogelijk contact met je op.",
      });
    } catch {
      toast({
        title: "Er ging iets mis",
        description: "Probeer het later opnieuw of mail direct naar hallo@propasso.nl.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageLayout>
      <SEO
        title="Contact voor Exit Planning en bedrijfsoverdracht"
        description={pageDescription}
        canonical="https://propasso.nl/contact"
        ogTitle="Contact | Propasso"
        ogDescription={pageDescription}
        ogType="website"
        jsonLd={contactSchemas}
      />

      {/* Hero / Intro */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <p className="eyebrow">Contact</p>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] text-balance">
                Meer weten?{" "}
                <span className="block">Of gelijk aan de slag.</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Neem vrijblijvend contact op voor een persoonlijke kennismaking.
                Ik denk graag mee over jouw situatie, zonder verplichtingen.
              </p>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl tint-teal-bg" />
                <img
                  src={karelImg}
                  alt="Karel Cremers in gesprek met ondernemers over exit planning"
                  className="relative rounded-2xl w-full object-cover aspect-[3/4]"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Direct Contact Options */}
      <section className="py-16 md:py-20 section-neutral-bg">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <p className="eyebrow">Direct contact</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold text-left">Neem direct contact op</h2>
            <p className="mt-3 text-muted-foreground max-w-lg">
              Kies de manier die bij je past. Ik ben persoonlijk bereikbaar.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {contactOptions.map((option, i) => (
              <motion.a
                key={option.value}
                href={option.href}
                target={option.external ? "_blank" : undefined}
                rel={option.external ? "noopener noreferrer" : undefined}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                variants={fadeUp}
                custom={i + 1}
                className="group relative flex flex-col items-center text-center p-6 md:p-8 rounded-2xl bg-background border border-border/30 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/15 transition-colors">
                  <option.icon className="w-5 h-5 text-primary" />
                </div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                  {option.label}
                </span>
                <span className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
                  {option.value}
                </span>
                <span className="text-sm text-muted-foreground mt-1">{option.description}</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground mt-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Address + Map */}
      <section className="py-16 md:py-20">
        <div className="section-container">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
            >
              <p className="eyebrow">Bezoekadres</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold">Kom langs voor een kop koffie</h2>
              <div className="mt-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">Propasso</p>
                  <p className="text-muted-foreground">
                    Nieuwe Linie 12
                    <br />
                    5264 PJ Vught
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Nieuwe+Linie+12+5264+PJ+Vught"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-primary hover:underline"
                  >
                    Bekijk op Google Maps
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <motion.a
              href="https://www.google.com/maps/search/?api=1&query=Nieuwe+Linie+12+5264+PJ+Vught"
              target="_blank"
              rel="noopener noreferrer"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
              className="block rounded-2xl overflow-hidden border border-border/30 hover:shadow-lg transition-shadow"
            >
              <GoogleMapsEmbed />
              <div className="p-4 bg-background flex items-center justify-between">
                <span className="text-sm font-medium text-muted-foreground">Open in Google Maps</span>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Meetings Embed */}
      <section className="py-16 md:py-20 section-alt-bg">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="max-w-3xl mx-auto text-center mb-10"
          >
            <p className="eyebrow">Afspraak inplannen</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold">
              Liever direct een moment inplannen?
            </h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto leading-relaxed">
              Kies hieronder een geschikt tijdstip in mijn agenda voor een
              vrijblijvende kennismaking. Geen verplichtingen, gewoon een
              open gesprek over jouw situatie.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={1}
            className="max-w-3xl mx-auto bg-background rounded-2xl border border-border/30 p-4 md:p-8 shadow-sm overflow-hidden"
          >
            <HubSpotMeetingsEmbed />
          </motion.div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-20 section-alt-bg">
        <div className="section-container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="lg:col-span-2"
            >
              <p className="eyebrow">Stuur een bericht</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold">Liever een bericht sturen?</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Vul het formulier in en ik neem persoonlijk contact met je op.
                Geen verplichtingen, geen verkooppraatje. Een open gesprek
                over jouw situatie.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Persoonlijke reactie binnen 24 uur",
                  "Vrijblijvend en vertrouwelijk",
                  "20+ jaar ervaring met ondernemers",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 lg:hidden">
                <img
                  src={karelImg}
                  alt="Karel Cremers - Propasso oprichter en exit planning specialist"
                  className="rounded-2xl w-full max-w-sm object-cover aspect-[4/3]"
                  loading="lazy"
                />
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
              className="lg:col-span-3"
            >
              <div className="bg-background rounded-2xl border border-border/30 p-6 md:p-10 shadow-sm">
                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Dank voor je bericht</h3>
                    <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                      Ik neem zo spoedig mogelijk contact met je op.
                    </p>
                    <Button
                      variant="outline"
                      className="mt-8 rounded-full"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Nieuw bericht sturen
                    </Button>
                  </div>
                ) : (
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid sm:grid-cols-2 gap-5">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Naam *</FormLabel>
                              <FormControl>
                                <Input placeholder="Je volledige naam" className="h-12 rounded-xl" {...field} />
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
                              <FormLabel>E-mailadres *</FormLabel>
                              <FormControl>
                                <Input type="email" placeholder="je@email.nl" className="h-12 rounded-xl" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              Telefoon <span className="text-muted-foreground font-normal">(optioneel)</span>
                            </FormLabel>
                            <FormControl>
                              <Input type="tel" placeholder="06 1234 5678" className="h-12 rounded-xl" {...field} />
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
                            <FormLabel>Bericht *</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Waar kan ik je mee helpen?"
                                rows={5}
                                className="rounded-xl resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <ConsentCheckboxes
                        privacyChecked={form.watch("privacy") === true}
                        onPrivacyChange={(checked) =>
                          form.setValue("privacy", checked as true, { shouldValidate: true })
                        }
                        newsletterChecked={form.watch("newsletter") ?? false}
                        onNewsletterChange={(checked) => form.setValue("newsletter", checked)}
                        showNewsletter={true}
                        privacyError={form.formState.errors.privacy?.message}
                      />

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-full px-8 py-4 h-auto text-base font-semibold w-full sm:w-auto"
                      >
                        {isSubmitting ? "Bezig met versturen..." : "Verstuur bericht"}
                        <ChevronRight size={18} />
                      </Button>
                    </form>
                  </Form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust CTA */}
      <section className="py-16 md:py-24 lg:py-36 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/15 translate-x-1/3 -translate-y-1/3" />

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight text-primary-foreground text-balance">
              Elke succesvolle exit begint met een goed gesprek
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed">
              Geen verplichtingen. Geen verkooppraatje. Gewoon een eerlijk gesprek
              over jouw situatie en wat de mogelijkheden zijn.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+31610057566"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground hover:brightness-110 transition"
              >
                <Phone className="w-4 h-4" />
                Bel 06 1005 7566
              </a>
              <a
                href="mailto:hallo@propasso.nl"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/30 px-7 py-4 text-base font-semibold text-primary-foreground hover:border-primary-foreground/60 transition-colors"
              >
                <Mail className="w-4 h-4" />
                Mail direct
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
