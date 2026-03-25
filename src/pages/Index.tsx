import { Link } from 'react-router-dom';
import { User, Stethoscope, ClipboardList, UserCheck, CheckCircle, ArrowRight } from 'lucide-react';
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
      <section className="py-12 md:py-20">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <motion.div
              className="flex-1 text-center md:text-left"
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              custom={0}
            >
              <h1 className="text-3xl md:text-5xl font-display font-800 text-foreground leading-tight tracking-tight">
                Faça seu cadastro antes de chegar na clínica<span className="text-highlight">.</span>
              </h1>
              <p className="section-subtitle mt-4 max-w-lg mx-auto md:mx-0">
                Com o Cadus, você preenche seus dados pelo celular, no seu tempo.
                Quando chegar na consulta, o profissional já sabe quem você é.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center md:justify-start">
                <Link to="/cadastro?role=paciente" className="btn-primary text-base px-8">
                  <User size={20} />
                  Sou Paciente
                </Link>
                <Link to="/cadastro?role=profissional" className="btn-secondary text-base px-8">
                  <Stethoscope size={20} />
                  Sou Profissional
                </Link>
              </div>
              <p className="text-sm text-muted-foreground mt-4">
                Rápido, gratuito e seguro.
              </p>
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
                className="max-w-[320px] md:max-w-[400px] w-full h-auto"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="py-16 bg-card">
        <div className="container">
          <motion.h2
            className="section-title text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            É muito simples. Veja como:
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6 mt-10">
            {[
              {
                icon: <UserCheck size={28} className="text-primary" />,
                title: 'Escolha seu perfil',
                desc: 'Diga se você é paciente ou profissional de saúde.',
                borderColor: 'border-l-primary',
              },
              {
                icon: <ClipboardList size={28} className="text-secondary" />,
                title: 'Preencha seus dados',
                desc: 'Responda as perguntas no seu celular, no seu ritmo. Salva automaticamente.',
                borderColor: 'border-l-secondary',
              },
              {
                icon: <CheckCircle size={28} className="text-primary" />,
                title: 'Pronto! Acesse sua área',
                desc: 'Seus dados ficam salvos. O profissional já pode te atender melhor.',
                borderColor: 'border-l-primary',
              },
            ].map((step, i) => (
              <motion.div
                key={i}
                className={`bg-background rounded-2xl p-6 border-l-4 ${step.borderColor} flex flex-col gap-3`}
                style={{ boxShadow: 'var(--shadow-card)' }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
              >
                <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  {step.icon}
                </div>
                <h3 className="font-display font-700 text-lg text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Para quem */}
      <section className="py-16">
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
          <div className="grid md:grid-cols-2 gap-6 mt-10">
            <motion.div
              className="rounded-2xl p-6 md:p-8 bg-accent"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={0}
            >
              <h3 className="font-display font-700 text-xl text-foreground mb-4">Para você, paciente</h3>
              <ul className="space-y-3">
                {[
                  'Preencha sua ficha antes de chegar',
                  'Seus dados ficam salvos com segurança',
                  'Atualize quando precisar',
                  'Tudo pelo celular, sem papel',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <CheckCircle size={20} className="text-primary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="rounded-2xl p-6 md:p-8 bg-secondary/10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              custom={1}
            >
              <h3 className="font-display font-700 text-xl text-foreground mb-4">Para profissionais de saúde</h3>
              <ul className="space-y-3">
                {[
                  'Veja os dados dos seus pacientes antes da consulta',
                  'Histórico completo de atualizações',
                  'Acesse de qualquer dispositivo',
                  'Sem papel, sem retrabalho',
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground">
                    <CheckCircle size={20} className="text-secondary mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-primary">
        <div className="container text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={0}
          >
            <h2 className="text-2xl md:text-3xl font-display font-800 text-primary-foreground tracking-tight">
              Pronto para começar?
            </h2>
            <p className="text-primary-foreground/80 mt-2 text-lg">Leva menos de 5 minutos.</p>
            <Link
              to="/cadastro"
              className="inline-flex items-center gap-2 mt-6 px-8 py-3.5 rounded-xl bg-card text-primary font-display font-700 text-base transition-all duration-200 hover:opacity-90"
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
