import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationStore } from '@/store/registrationStore';

const SuccessScreen = () => {
  const navigate = useNavigate();
  const { registeredRole, patientData, professionalData } = useRegistrationStore();
  const isPatient = registeredRole === 'paciente';

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <motion.div
        className="card-cadus text-center max-w-md w-full"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="mx-auto w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6"
        >
          <CheckCircle size={48} className="text-primary" />
        </motion.div>

        <h1 className="text-2xl font-display font-800 text-foreground tracking-tight">
          {isPatient ? 'Cadastro feito com sucesso!' : 'Cadastro enviado!'}
        </h1>
        <p className="text-muted-foreground mt-3 font-body leading-relaxed">
          {isPatient
            ? 'Seus dados foram salvos. Agora você pode acessar sua área.'
            : `Seus dados foram recebidos. A coordenação da sua clínica irá validar seu acesso em breve. Você receberá uma confirmação por e-mail em ${professionalData.email || 'seu e-mail'}.`}
        </p>

        {isPatient ? (
          <button
            onClick={() => navigate('/paciente/inicio')}
            className="btn-primary w-full mt-8"
          >
            Acessar minha área <ArrowRight size={18} />
          </button>
        ) : (
          <button
            onClick={() => navigate('/')}
            className="btn-outline w-full mt-8"
          >
            Voltar para o início
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default SuccessScreen;
