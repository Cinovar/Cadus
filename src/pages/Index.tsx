import { Link } from 'react-router-dom';
import { User, Stethoscope, UserCheck, ClipboardList, CheckCircle, ArrowRight, Shield, Clock, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import heroImg from '@/assets/hero-illustration.png';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' as const },
  }),
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient py-16 md:py-24">
        <div className="container relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              className="flex-1 text-center md:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 text-primary-foreground text-sm font-body mb-6">
                <Shield size={14} />
                Clínicas-escola UFPE/NUTES
              </div>

              <h1 className="text-3xl md:text-5xl lg:text-6xl font-display font-800 text-primary-foreground leading-tight tracking-tight">
                Faça seu cadastro antes de chegar na clínica<span className="text-highlight">.</span>
              </h1>
              <p className="text-primary-foreground/80 mt-4 text-lg max-w-lg mx-auto md:mx-0 font-body">
                Com o Cadus, você preenche seus dados pelo celular, no seu tempo.
                Quando chegar na consulta, o profissional já sabe quem você é.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
                <Link to="/cadastro?role=paciente" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-card text-primary font-display font-700 text-base transition-all duration-200 hover:shadow-lg">
                  <User size={20} />
                  Sou Paciente
                </Link>
                <Link to="/cadastro?role=profissional" className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full border-2 border-primary-foreground/30 text-primary-foreground font-display font-700 text-base transition-all duration-200 hover:bg-primary-foreground/10">
                  <Stethoscope size={20} />
                  Sou Profissional
                </Link>
              </div>

              <div className="flex items-center justify-center md:justify-start gap-6 mt-8 text-primary-foreground/70 text-sm font-body">
                <span className="flex items-center gap-1.5"><Sparkles size={14} /> 100% gratuito</span>
                <span className="flex items-center gap-1.5"><Clock size={14} /> Cadastro em 5 min</span>
                <span className="flex items-center gap-1.5"><Shield size={14} /> Dados seguros</span>
              </div>
            </motion.div>
            <motion.div
              className="flex-1 flex justify-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={heroImg}
                alt="Pessoas usando o Cadus no celular"
                width={400}
                height={400}
                className="max-w-[320px] md:max-w-[420px] w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="section-title">É muito simples. Veja como:</h2>
            <p className="section-subtitle max-w-xl mx-auto">Três passos para deixar tudo pronto antes da consulta.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 mt-14">
            {[
              {
                num: '01',
                icon: <UserCheck size={24} className="text-primary" />,
                title: 'Escolha seu perfil',
                desc: 'Diga se você é paciente ou profissional de saúde.',
              },
              {
                num: '02',
                icon: <ClipboardList size={24} className="text-primary" />,
                title: 'Preencha seus dados',
                desc: 'Responda as perguntas no seu celular, no seu ritmo. Salva automaticamente.',
              },
              {
                num: '03',
                icon: <CheckCircle size={24} className="text-primary" />,
                title: 'Pronto! Acesse sua área',
                desc: 'Seus dados ficam salvos. O profissional já pode te atender melhor.',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className="card-cadus relative overflow-hidden"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <span className="absolute top-4 right-4 text-5xl font-display font-800 text-primary/8 select-none">{step.num}</span>
                <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                  {step.icon}
                </div>
                <h3 className="font-display font-700 text-lg text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <motion.h2
            className="section-title text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            Para quem é o Cadus
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8 mt-14">
            <motion.div
              className="card-cadus border-l-4 border-l-primary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-4">
                <User size={24} className="text-primary" />
              </div>
              <h3 className="font-display font-700 text-xl text-foreground mb-4">Para você, paciente</h3>
              <ul className="space-y-3">
                {[
                  'Preencha sua ficha antes de chegar',
                  'Seus dados ficam salvos com segurança',
                  'Atualize quando precisar',
                  'Tudo pelo celular, sem papel',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-foreground text-sm">
                    <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="card-cadus border-l-4 border-l-secondary"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Stethoscope size={24} className="text-secondary" />
              </div>
              <h3 className="font-display font-700 text-xl text-foreground mb-4">Para profissionais de saúde</h3>
              <ul className="space-y-3">
                {[
                  'Veja os dados dos seus pacientes antes da consulta',
                  'Histórico completo de atualizações',
                  'Acesse de qualquer dispositivo',
                  'Sem papel, sem retrabalho',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-foreground text-sm">
                    <CheckCircle size={18} className="text-secondary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="cta-gradient py-20">
        <div className="container text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-2xl md:text-4xl font-display font-800 text-primary-foreground tracking-tight">
              Pronto para começar?
            </h2>
            <p className="text-primary-foreground/70 mt-3 text-lg font-body">Leva menos de 5 minutos.</p>
            <Link
              to="/cadastro"
              className="inline-flex items-center gap-2 mt-8 px-10 py-4 rounded-full bg-card text-primary font-display font-700 text-base transition-all duration-200 hover:shadow-xl"
            >
              Fazer meu cadastro agora
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
