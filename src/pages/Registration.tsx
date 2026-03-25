import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistrationStore } from '@/store/registrationStore';
import StepProfile from '@/components/registration/StepProfile';
import StepPatientName from '@/components/registration/StepPatientName';
import StepPatientCPF from '@/components/registration/StepPatientCPF';
import StepPatientBirthdate from '@/components/registration/StepPatientBirthdate';
import StepPatientGender from '@/components/registration/StepPatientGender';
import StepPatientContact from '@/components/registration/StepPatientContact';
import StepPatientAddress from '@/components/registration/StepPatientAddress';
import StepPatientSus from '@/components/registration/StepPatientSus';
import StepPatientComplaint from '@/components/registration/StepPatientComplaint';
import StepPatientAccess from '@/components/registration/StepPatientAccess';
import StepProfPersonal from '@/components/registration/StepProfPersonal';
import StepProfClinic from '@/components/registration/StepProfClinic';
import StepProfAccess from '@/components/registration/StepProfAccess';
import SuccessScreen from '@/components/registration/SuccessScreen';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const patientSteps = 10;
const profSteps = 4;

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

  const totalSteps = role === 'profissional' ? profSteps : patientSteps;

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
        case 2: return <StepPatientName onNext={goNext} onBack={goBack} />;
        case 3: return <StepPatientCPF onNext={goNext} onBack={goBack} />;
        case 4: return <StepPatientBirthdate onNext={goNext} onBack={goBack} />;
        case 5: return <StepPatientGender onNext={goNext} onBack={goBack} />;
        case 6: return <StepPatientContact onNext={goNext} onBack={goBack} />;
        case 7: return <StepPatientAddress onNext={goNext} onBack={goBack} />;
        case 8: return <StepPatientSus onNext={goNext} onBack={goBack} />;
        case 9: return <StepPatientComplaint onNext={goNext} onBack={goBack} />;
        case 10: return <StepPatientAccess onNext={goNext} onBack={goBack} />;
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

  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Rich background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse at 30% -10%, hsl(184 40% 94%) 0%, transparent 50%), radial-gradient(ellipse at 70% 100%, hsl(184 30% 95%) 0%, transparent 50%), hsl(210 11% 97%)'
        }} />
        <div className="absolute inset-0 opacity-[0.015]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, hsl(184 78% 22%) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }} />
      </div>

      {/* Glass header */}
      <div className="sticky top-0 z-50 border-b border-border/30" style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div className="container flex items-center justify-between h-14">
          <button onClick={goBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2 rounded-xl hover:bg-muted/50">
            <ArrowLeft size={20} />
          </button>
          <Link to="/" className="font-display font-800 text-primary text-xl tracking-tight">
            cadus<span className="text-highlight">.</span>
          </Link>
          <span className="w-9" />
        </div>
        {/* Gradient progress bar */}
        <div className="h-1 bg-border/30">
          <div
            className="h-full transition-all duration-700 ease-out rounded-r-full"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, hsl(184, 78%, 28%), hsl(184, 75%, 38%))'
            }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start md:items-center justify-center py-8 md:py-12 px-4">
        <div className="w-full max-w-[520px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${role}-${currentStep}`}
              custom={direction}
              initial={{ opacity: 0, y: direction * 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: direction * -12, scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Registration;
