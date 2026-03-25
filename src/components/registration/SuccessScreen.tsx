import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationStore } from '@/store/registrationStore';

const confettiColors = [
  'hsl(184, 78%, 22%)',
  'hsl(25, 76%, 63%)',
  'hsl(184, 60%, 45%)',
  'hsl(350, 60%, 55%)',
  'hsl(270, 50%, 55%)',
  'hsl(160, 50%, 45%)',
];

const SuccessScreen = () => {
  const navigate = useNavigate();
  const { registeredRole } = useRegistrationStore();
  const isPatient = registeredRole === 'paciente';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Celebratory background */}
      <div className="fixed inset-0 -z-10" style={{
        background: 'radial-gradient(ellipse at 50% 20%, hsl(184 45% 92%) 0%, hsl(184 20% 96%) 40%, hsl(210 11% 97%) 70%)'
      }} />

      {/* Confetti particles */}
      {confettiColors.map((color, i) => (
        <div
          key={i}
          className="confetti-particle"
          style={{
            background: color,
            left: `${15 + i * 13}%`,
            top: '-10px',
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${2.5 + i * 0.3}s`,
            borderRadius: i % 2 === 0 ? '50%' : '2px',
            width: i % 3 === 0 ? '10px' : '7px',
            height: i % 3 === 0 ? '10px' : '7px',
          }}
        />
      ))}

      <motion.div
        className="card-cadus text-center max-w-md w-full relative"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="relative mx-auto w-24 h-24 flex items-center justify-center mb-7"
        >
          {/* Pulse ring */}
          <div className="absolute inset-0 rounded-full pulse-ring" style={{
            background: 'hsl(184, 40%, 90%)',
          }} />
          <div className="absolute inset-0 rounded-full pulse-ring" style={{
            background: 'hsl(184, 40%, 92%)',
            animationDelay: '0.5s',
          }} />
          <div className="w-24 h-24 rounded-full flex items-center justify-center relative z-10" style={{
            background: 'linear-gradient(145deg, hsl(184, 40%, 90%), hsl(184, 40%, 82%))',
            boxShadow: '0 8px 32px rgba(13, 92, 99, 0.2)'
          }}>
            <CheckCircle size={52} className="text-primary" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Sparkles size={18} className="text-secondary" />
            <span className="text-sm font-display font-600 text-secondary uppercase tracking-wider shimmer-text" style={{
              WebkitTextFillColor: 'unset',
              background: 'none',
              color: 'hsl(25, 76%, 63%)',
            }}>Tudo certo!</span>
            <Sparkles size={18} className="text-secondary" />
          </div>
          <h1 className="text-3xl font-display font-800 text-foreground tracking-tight">
            {isPatient ? 'Cadastro concluído!' : 'Cadastro enviado!'}
          </h1>
          <p className="text-muted-foreground mt-4 font-body leading-relaxed text-base">
            {isPatient
              ? 'Seus dados foram salvos com sucesso. Agora você pode acessar sua área.'
              : 'Seus dados foram recebidos. A coordenação da sua clínica irá validar seu acesso em breve.'}
          </p>
        </motion.div>

        {isPatient ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/paciente/inicio')}
            className="btn-primary w-full mt-8 group"
          >
            Acessar minha área <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        ) : (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            onClick={() => navigate('/')}
            className="btn-outline w-full mt-8"
          >
            Voltar para o início
          </motion.button>
        )}
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
