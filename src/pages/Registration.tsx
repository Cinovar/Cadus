import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistrationStore } from '@/store/registrationStore';
import StepProfile from '@/components/registration/StepProfile';
import StepPatientPersonal from '@/components/registration/StepPatientPersonal';
import StepPatientAddress from '@/components/registration/StepPatientAddress';
import StepPatientComplaint from '@/components/registration/StepPatientComplaint';
import StepPatientAccess from '@/components/registration/StepPatientAccess';
import StepProfPersonal from '@/components/registration/StepProfPersonal';
import StepProfClinic from '@/components/registration/StepProfClinic';
import StepProfAccess from '@/components/registration/StepProfAccess';
import SuccessScreen from '@/components/registration/SuccessScreen';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const patientSteps = ['Perfil', 'Dados pessoais', 'Endereço', 'Queixa', 'Acesso'];
const profSteps = ['Perfil', 'Dados profissionais', 'Clínica', 'Acesso'];

const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { role, setRole, currentStep, setCurrentStep, isRegistered } = useRegistrationStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const preselect = searchParams.get('role');
    if (preselect === 'paciente' || preselect === 'profissional') {
      setRole(preselect);
      if (currentStep === 1) setCurrentStep(2);
    }
  }, []);

  const steps = role === 'profissional' ? profSteps : patientSteps;
  const totalSteps = steps.length;

  const goNext = () => {
    setDirection(1);
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const goBack = () => {
    setDirection(-1);
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      if (currentStep === 2 && role) {
        setRole(null);
      }
    } else {
      navigate('/');
    }
  };

  if (showSuccess || isRegistered) {
    return <SuccessScreen />;
  }

  const renderStep = () => {
    if (currentStep === 1) return <StepProfile onNext={goNext} />;
    if (role === 'paciente') {
      switch (currentStep) {
        case 2: return <StepPatientPersonal onNext={goNext} onBack={goBack} />;
        case 3: return <StepPatientAddress onNext={goNext} onBack={goBack} />;
        case 4: return <StepPatientComplaint onNext={goNext} onBack={goBack} />;
        case 5: return <StepPatientAccess onNext={goNext} onBack={goBack} />;
      }
    }
    if (role === 'profissional') {
      switch (currentStep) {
        case 2: return <StepProfPersonal onNext={goNext} onBack={goBack} />;
        case 3: return <StepProfClinic onNext={goNext} onBack={goBack} />;
        case 4: return <StepProfAccess onNext={goNext} onBack={goBack} />;
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <button onClick={goBack} className="btn-ghost text-sm gap-1 py-1 px-3">
            <ArrowLeft size={18} />
            Voltar
          </button>
          <Link to="/" className="font-display font-800 text-primary text-lg tracking-tight">cadus<span className="text-highlight">.</span></Link>
          <span className="text-sm text-muted-foreground font-body font-500">
            {currentStep}/{totalSteps}
          </span>
        </div>
      </div>

      {/* Segmented progress */}
      <div className="w-full px-4 pt-4 pb-2">
        <div className="max-w-[580px] mx-auto">
          <div className="flex gap-2">
            {steps.map((label, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div
                  className={`w-full h-1.5 rounded-full transition-all duration-300 ${
                    i + 1 <= currentStep ? 'bg-primary' : 'bg-border'
                  }`}
                />
                <span className={`text-[10px] font-body hidden sm:block transition-colors ${
                  i + 1 <= currentStep ? 'text-primary font-600' : 'text-muted-foreground'
                }`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start md:items-center justify-center py-6 px-4">
        <div className="w-full max-w-[580px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${role}-${currentStep}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Registration;
