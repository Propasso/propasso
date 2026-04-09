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
import ConsentCheckboxes from "@/components/ConsentCheckboxes";
import { pushEvent } from "@/lib/tracking";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
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
        "https://wa.me/31610057566",
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

const directContactItems = [
  {
    icon: Phone,
    label: "Bellen",
    value: "06 1005 7566",
    href: "tel:+31610057566",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "06 1005 7566",
    href: "https://wa.me/31610057566?text=Hallo%20Karel%2C%20ik%20heb%20een%20vraag%20over%20exit%20planning.",
    iconColor: "text-green-700",
    iconBg: "bg-green-100",
  },
  {
    icon: Mail,
    label: "E-mail",
    value: "hallo@propasso.nl",
    href: "mailto:hallo@propasso.nl",
    iconColor: "text-primary",
    iconBg: "bg-primary/10",
  },
];

const scrollToAgenda = () => {
  document.getElementById("agenda")?.scrollIntoView({ behavior: "smooth" });
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

      {/* ── Sectie 1: Hero ── */}
      <section className="py-16 md:py-24 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-accent/5 -translate-y-1/4 translate-x-1/4 blur-3xl pointer-events-none" />

        <div className="section-container relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
              <p className="eyebrow">Contact</p>
              <h1 className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-balance">
                Laten we kennismaken
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-[1.75] max-w-xl">
                Een open gesprek over jouw situatie, zonder verplichtingen.
                Ik denk graag mee — persoonlijk en vrijblijvend.
              </p>
              <button
                onClick={scrollToAgenda}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-base font-semibold text-primary-foreground hover:bg-teal-medium transition-colors w-full sm:w-auto"
              >
                Plan een kennismaking
                <ChevronRight size={18} />
              </button>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="hidden lg:block">
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-primary/5 to-accent/10" />
                <div className="absolute -inset-4 rounded-3xl border border-primary/5" />
                <img
                  src={karelImg}
                  alt="Karel Cremers in gesprek met ondernemers over exit planning"
                  className="relative rounded-2xl w-full object-cover aspect-[3/4] shadow-xl"
                  loading="eager"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sectie 2: Twee contactpaden ── */}
      <section id="agenda" className="py-16 md:py-24 lg:py-36 section-neutral-bg">
        <div className="section-container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
            className="mb-12"
          >
            <p className="eyebrow">Kennismaken</p>
            <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-[-0.01em]">
              Kies wat bij je past
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10">
            {/* Pad A — Agenda */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={1}
            >
              <div className="bg-background rounded-2xl border border-border/40 p-4 md:p-8 shadow-sm overflow-hidden h-full">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                    <ChevronRight className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <h3 className="text-lg font-medium text-foreground">
                    Plan een kennismaking
                  </h3>
                </div>
                <p className="text-sm text-muted-foreground mb-6 leading-[1.75]">
                  Kies een moment in mijn agenda. Vrijblijvend, 30 minuten, online of op locatie.
                </p>
                <HubSpotMeetingsEmbed />
              </div>
            </motion.div>

            {/* Pad B — Direct contact + adres */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={2}
            >
              <div className="bg-background rounded-2xl border border-border/40 p-6 md:p-8 shadow-sm h-full flex flex-col">
                <h3 className="text-lg font-medium text-foreground mb-6">
                  Direct contact
                </h3>

                <div className="space-y-3">
                  {directContactItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      {...(item.label === "WhatsApp" ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 p-4 rounded-xl border border-border/40 hover:border-primary/30 hover:shadow-md transition-all duration-300"
                    >
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105 ${item.iconBg}`}>
                        <item.icon className={`w-5 h-5 ${item.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          {item.label}
                        </span>
                        <span className="block text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                          {item.value}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </a>
                  ))}
                </div>

                <p className="mt-5 text-sm text-muted-foreground leading-[1.75]">
                  Bereikbaar op werkdagen. Reactie binnen 24 uur.
                </p>

                {/* Bezoekadres */}
                <div className="mt-6 pt-6 border-t border-border/40">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                        Bezoekadres
                      </p>
                      <p className="text-sm font-medium text-foreground leading-relaxed">
                        Nieuwe Linie 12<br />5264 PJ Vught
                      </p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=Nieuwe+Linie+12+5264+PJ+Vught"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-primary hover:underline"
                      >
                        Bekijk op Google Maps
                        <ArrowRight className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Sectie 3: Formulier + vertrouwen ── */}
      <section className="py-16 md:py-24 lg:py-36 section-alt-bg relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/5 blur-3xl pointer-events-none" />

        <div className="section-container relative">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Linkerkolom — vertrouwen */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeUp}
              custom={0}
              className="lg:col-span-2"
            >
              <p className="eyebrow">Stuur een bericht</p>
              <h2 className="mt-4 text-2xl md:text-3xl font-bold tracking-[-0.01em]">
                Liever een bericht sturen?
              </h2>
              <p className="mt-4 text-muted-foreground leading-[1.75]">
                Vul het formulier in en ik neem persoonlijk contact met je op.
                Geen verplichtingen, geen verkooppraatje.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Persoonlijke reactie binnen 24 uur",
                  "Vrijblijvend en vertrouwelijk",
                  "20+ jaar ervaring met ondernemers",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>

              {/* Testimonial */}
              <div className="mt-10 rounded-xl bg-background/60 border border-border/30 p-5">
                <p className="text-sm italic text-muted-foreground leading-[1.75]">
                  "Karel denkt echt mee. Geen verkooppraatje, gewoon een eerlijk gesprek
                  over wat er speelt en wat de opties zijn."
                </p>
                <p className="mt-3 text-xs font-semibold text-foreground">
                  — MKB-ondernemer, maakindustrie
                </p>
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

            {/* Rechterkolom — formulier */}
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
                    <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium text-foreground">Dank voor je bericht</h3>
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

      {/* ── Sectie 4: Afsluitende CTA ── */}
      <section className="py-16 md:py-24 lg:py-36 relative overflow-hidden bg-primary">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-accent/10 translate-x-1/3 -translate-y-1/3 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary-foreground/5 -translate-x-1/3 translate-y-1/3 blur-2xl" />

        <div className="section-container relative z-10 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-3xl md:text-4xl font-bold max-w-3xl mx-auto leading-tight text-primary-foreground text-balance tracking-[-0.01em]">
              Elke succesvolle exit begint met een goed gesprek
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/70 max-w-2xl mx-auto leading-[1.75]">
              Geen verplichtingen. Geen verkooppraatje. Gewoon een eerlijk gesprek
              over jouw situatie en wat de mogelijkheden zijn.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToAgenda}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-7 py-4 text-base font-semibold text-accent-foreground hover:brightness-110 transition"
              >
                Plan een kennismaking
                <ChevronRight className="w-4 h-4" />
              </button>
              <a
                href="tel:+31610057566"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-primary-foreground/30 px-7 py-4 text-base font-semibold text-primary-foreground hover:border-primary-foreground/60 hover:bg-primary-foreground/5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                Bel direct
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Contact;
