import { Link } from 'react-router-dom';
import { User, Briefcase, UserCheck, ClipboardList, CheckCircle, ArrowRight, Smartphone, Clock, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroIllustration from '@/assets/hero-illustration.png';
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: 'easeOut' as const },
  }),
};

/* Hero illustration with organic blob shapes */
const HeroIllustration = () => (
  <div className="relative w-full max-w-[520px] flex items-center justify-center py-8">
    {/* Blob 1 — large teal, centered behind cards */}
    <motion.svg
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] z-0"
      viewBox="0 0 500 500"
      fill="none"
      animate={{ rotate: 360 }}
      transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M400,280Q370,460,200,400Q30,340,80,200Q130,60,300,80Q470,100,400,280Z"
        fill="hsl(184, 78%, 22%)"
        fillOpacity="0.22"
      />
    </motion.svg>

    {/* Blob 2 — amber accent, bottom-right */}
    <motion.svg
      className="absolute -right-10 -bottom-4 w-[380px] h-[380px] z-0"
      viewBox="0 0 500 500"
      fill="none"
      animate={{ rotate: -360 }}
      transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
    >
      <path
        d="M420,300Q380,480,200,420Q20,360,60,200Q100,40,280,60Q460,80,420,300Z"
        fill="hsl(25, 76%, 63%)"
        fillOpacity="0.25"
      />
    </motion.svg>

    {/* Blob 3 — teal vibrante, top-left */}
    <motion.svg
      className="absolute -left-6 -top-2 w-[260px] h-[260px] z-0"
      viewBox="0 0 500 500"
      fill="none"
      animate={{ scale: [0.92, 1.08, 0.92] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
    >
      <path
        d="M380,260Q340,420,200,380Q60,340,100,200Q140,60,300,100Q460,140,380,260Z"
        fill="hsl(184, 60%, 35%)"
        fillOpacity="0.18"
      />
    </motion.svg>

    {/* Blob 4 — small teal dot, accent */}
    <motion.svg
      className="absolute right-4 top-2 w-[140px] h-[140px] z-0"
      viewBox="0 0 500 500"
      fill="none"
      animate={{ scale: [1, 1.15, 1], rotate: 180 }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    >
      <circle cx="250" cy="250" r="200" fill="hsl(184, 78%, 22%)" fillOpacity="0.14" />
    </motion.svg>

    {/* Illustration */}
    <img
      src={heroIllustration}
      alt="Pessoas diversas conectadas digitalmente ao sistema Cadus"
      className="relative z-10 w-full max-w-[480px] h-auto drop-shadow-xl"
    />
  </div>
);

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient py-20 md:py-28">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-8">
            <motion.div
              className="flex-1 text-center md:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-display font-800 text-primary-foreground leading-[1.1] tracking-tight">
                Seus dados prontos
                <br />
                <span className="text-highlight">antes</span> da consulta.
              </h1>
              <p className="text-primary-foreground/80 mt-5 text-lg md:text-xl max-w-lg mx-auto md:mx-0 font-body leading-relaxed">
                Preencha seu cadastro pelo celular, no seu tempo. Quando chegar
                na clínica, já sabem quem você é.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-10 justify-center md:justify-start">
                <Link
                  to="/cadastro?role=paciente"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-card text-primary font-display font-700 text-base transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
                >
                  <User size={20} />
                  Sou Paciente
                </Link>
                <Link
                  to="/cadastro?role=profissional"
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-display font-700 text-base transition-all duration-200 hover:bg-primary-foreground/10"
                >
                  <Briefcase size={20} />
                  Sou Profissional
                </Link>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 mt-8 text-primary-foreground/60 text-sm font-body">
                <span className="flex items-center gap-1.5"><Smartphone size={14} /> Pelo celular</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> 5 minutos</span>
                <span className="flex items-center gap-1.5"><ShieldCheck size={14} /> Dados seguros</span>
              </div>
            </motion.div>

            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <HeroIllustration />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como funciona? — timeline premium */}
      <section className="py-20 md:py-28">
        <div className="container max-w-5xl">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="section-title">Como funciona?</h2>
            <p className="section-subtitle max-w-md mx-auto">Três passos simples. Sem complicação.</p>
          </motion.div>

          <div className="relative">
            {/* Linha conectora horizontal — desktop */}
            <motion.svg
              className="absolute top-[52px] left-[16.66%] right-[16.66%] h-[4px] hidden md:block z-0"
              viewBox="0 0 800 4"
              fill="none"
              preserveAspectRatio="none"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.line
                x1="0" y1="2" x2="800" y2="2"
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="8 6"
                strokeOpacity="0.25"
                variants={{
                  hidden: { pathLength: 0 },
                  visible: { pathLength: 1, transition: { duration: 1.2, delay: 0.3, ease: "easeInOut" } },
                }}
              />
            </motion.svg>

            {/* Linha conectora vertical — mobile */}
            <div className="absolute left-[28px] top-[60px] bottom-[60px] w-px border-l-2 border-dashed border-primary/20 md:hidden z-0" />

            <div className="grid md:grid-cols-3 gap-8 md:gap-6 relative z-10">
              {[
                {
                  num: '01',
                  icon: <UserCheck size={24} className="text-primary-foreground" />,
                  title: 'Escolha seu perfil',
                  desc: 'Paciente, profissional de saúde, gestor ou aluno — cada um tem seu caminho.',
                },
                {
                  num: '02',
                  icon: <ClipboardList size={24} className="text-primary-foreground" />,
                  title: 'Preencha seus dados',
                  desc: 'Responda no seu ritmo, pelo celular. Se parar no meio, seus dados ficam salvos.',
                },
                {
                  num: '03',
                  icon: <CheckCircle size={24} className="text-primary-foreground" />,
                  title: 'Tudo pronto',
                  desc: 'Seus dados já estão no sistema. É só chegar na clínica e ser atendido.',
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  className="relative group flex md:flex-col items-start md:items-center gap-5 md:gap-0 md:text-center"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i}
                >
                  {/* Ícone com gradiente */}
                  <div className="relative shrink-0 mb-0 md:mb-5">
                    <div className="w-14 h-14 md:w-[104px] md:h-[104px] rounded-2xl md:rounded-3xl bg-gradient-to-br from-primary to-[#14919B] flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300">
                      <div className="scale-100 md:scale-[1.6]">{step.icon}</div>
                    </div>
                  </div>

                  {/* Card de conteúdo */}
                  <div className="relative bg-card rounded-2xl p-5 md:p-6 shadow-sm border border-border/50 group-hover:-translate-y-1 group-hover:shadow-md transition-all duration-300 flex-1 md:flex-none md:w-full overflow-hidden">
                    {/* Número watermark */}
                    <span className="absolute -top-2 -right-1 text-[4rem] md:text-[5rem] font-display font-800 text-primary/[0.04] leading-none select-none pointer-events-none">
                      {step.num}
                    </span>

                    <span className="text-xs font-display font-700 text-muted-foreground tracking-widest uppercase">
                      Passo {step.num}
                    </span>
                    <h3 className="font-display font-700 text-lg md:text-xl text-foreground mt-1.5">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Para quem — visual chips layout */}
      <section className="py-20 md:py-28 bg-muted/40 relative overflow-hidden">
        {/* Decorative background shape */}
        <svg className="absolute -right-40 -top-40 w-[600px] h-[600px] opacity-[0.03]" viewBox="0 0 600 600" fill="none">
          <circle cx="300" cy="300" r="280" stroke="currentColor" strokeWidth="40" className="text-primary" />
          <circle cx="300" cy="300" r="180" stroke="currentColor" strokeWidth="20" className="text-primary" />
        </svg>

        <div className="container relative z-10">
          <motion.h2
            className="section-title text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            Para quem é o <span className="font-display font-800 text-primary">cadus<span className="text-highlight">.</span></span>
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {/* Paciente card */}
            <motion.div
              className="card-cadus relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-primary rounded-l-2xl" />
              <div className="pl-4">
                <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mb-5">
                  <User size={26} className="text-primary" />
                </div>
                <h3 className="font-display font-700 text-xl text-foreground mb-2">Para você, paciente</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Preencha sua ficha pelo celular, antes de chegar na clínica. Sem papel, sem fila.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Cadastro pelo celular', 'Dados sempre salvos', 'Atualiza quando quiser'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent text-accent-foreground text-xs font-display font-600">
                      <CheckCircle size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Profissional card */}
            <motion.div
              className="card-cadus relative overflow-hidden"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary rounded-l-2xl" />
              <div className="pl-4">
                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center mb-5">
                  <Briefcase size={26} className="text-secondary" />
                </div>
                <h3 className="font-display font-700 text-xl text-foreground mb-2">Para profissionais e equipes</h3>
                <p className="text-muted-foreground text-sm mb-5 leading-relaxed">
                  Profissionais de saúde, gestores e alunos — acesse os dados antes do atendimento.
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Dados antes da consulta', 'Acesso em qualquer lugar', 'Sem retrabalho'].map((tag) => (
                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/10 text-secondary text-xs font-display font-600">
                      <CheckCircle size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-gradient py-20 md:py-28 relative overflow-hidden">
        {/* Decorative SVG */}
        <svg className="absolute -left-20 -bottom-20 w-[300px] h-[300px] opacity-[0.06]" viewBox="0 0 300 300" fill="none">
          <circle cx="150" cy="150" r="130" stroke="white" strokeWidth="30" />
        </svg>
        <svg className="absolute -right-16 -top-16 w-[200px] h-[200px] opacity-[0.04]" viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="80" stroke="white" strokeWidth="20" />
        </svg>

        <div className="container text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-800 text-primary-foreground tracking-tight leading-tight">
              Seus dados, antes da consulta<span className="text-highlight">.</span>
            </h2>
            <p className="text-primary-foreground/70 mt-3 text-base font-body max-w-lg mx-auto">
              Cadastre-se agora e chegue na clínica pronto para ser atendido.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-10 justify-center">
              <Link
                to="/cadastro?role=paciente"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-card text-primary font-display font-700 text-base transition-all duration-200 hover:shadow-xl hover:scale-[1.02]"
              >
                <User size={18} />
                Cadastro de Paciente
              </Link>
              <Link
                to="/cadastro?role=profissional"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-display font-700 text-base transition-all duration-200 hover:bg-primary-foreground/10"
              >
                <Briefcase size={18} />
                Cadastro de Profissional
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
