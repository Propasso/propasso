import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import climbingImg from "@/assets/propasso-climbing.png";
import teamImg from "@/assets/propasso-team.png";
import moneyImg from "@/assets/propasso-money.png";

const posts = [
  {
    image: climbingImg,
    title: "Successieplanning uitgelegd: hoe je een exitstrategie voor het familiebedrijf ontwikkelt",
    href: "#",
  },
  {
    image: teamImg,
    title: "Waarom je team je bedrijfswaarde bepaalt (niet jij)",
    href: "#",
  },
  {
    image: moneyImg,
    title: "Van cijfers naar inzicht: hoe bepaal je de waarde van je MKB-bedrijf",
    href: "#",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
};

const BlogSection = () => {
  return (
    <section id="inzichten" className="py-20 md:py-28 section-alt-bg">
      <div className="section-container">
        <motion.div {...fadeInUp} transition={{ duration: 0.6 }}>
          <p className="eyebrow">Inzichten & artikelen</p>
        </motion.div>

        <motion.h2
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl md:text-4xl lg:text-5xl font-bold max-w-3xl leading-tight"
        >
          Recente inzichten over exit planning
        </motion.h2>

        <motion.p
          {...fadeInUp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 text-base text-muted-foreground max-w-xl"
        >
          Praktische inzichten over waardecreatie en het verkoopklaar maken van
          bedrijven.
        </motion.p>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {posts.map((post, i) => (
            <motion.article
              key={post.title}
              {...fadeInUp}
              transition={{ duration: 0.5, delay: 0.15 * i }}
              className="group"
            >
              <a href={post.href} className="block">
                <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-secondary mb-5">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-2.5 transition-all">
                  Verder lezen <ArrowRight size={14} />
                </span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
