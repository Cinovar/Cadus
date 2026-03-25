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
import { ArrowLeft, X } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col" style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(184 40% 96%) 0%, hsl(210 11% 97%) 70%)' }}>
      {/* Minimal header */}
      <div className="sticky top-0 z-50 bg-card/80 backdrop-blur-sm border-b border-border/50">
        <div className="container flex items-center justify-between h-14">
          <button onClick={goBack} className="text-muted-foreground hover:text-foreground transition-colors p-2 -ml-2">
            <ArrowLeft size={20} />
          </button>
          <Link to="/" className="font-display font-800 text-primary text-lg tracking-tight">
            cadus<span className="text-highlight">.</span>
          </Link>
          <span className="w-8" />
        </div>
        {/* Thin progress bar */}
        <div className="h-1 bg-border/50">
          <div
            className="h-full bg-primary transition-all duration-500 ease-out rounded-r-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex items-start md:items-center justify-center py-8 px-4">
        <div className="w-full max-w-[480px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${role}-${currentStep}`}
              custom={direction}
              initial={{ opacity: 0, x: direction * 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -30 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
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
