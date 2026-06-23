import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useRegistrationStore } from '@/store/registrationStore';
import StepProfile from '@/components/registration/StepProfile';
import StepUserAccess from '@/components/registration/StepUserAccess';
import StepPatientName from '@/components/registration/StepPatientName';
import StepPatientBirthdate from '@/components/registration/StepPatientBirthdate';
import StepPatientGender from '@/components/registration/StepPatientGender';
import StepPatientAddress from '@/components/registration/StepPatientAddress';
import StepPatientSus from '@/components/registration/StepPatientSus';
import StepPatientComplaint from '@/components/registration/StepPatientComplaint';
import StepProfPersonal from '@/components/registration/StepProfPersonal';
import StepProfClinic from '@/components/registration/StepProfClinic';
import SuccessScreen from '@/components/registration/SuccessScreen';
import { Link } from 'react-router-dom';

const Registration = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    role,
    setRole,
    firstStep,
    setFirstStep,
    patientStep,
    setPatientStep,
    professionalStep,
    setProfessionalStep,
    isRegistered,
  } = useRegistrationStore();
  const [showSuccess, setShowSuccess] = useState(false);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const preselect = searchParams.get('role');
    if (preselect === 'paciente' || preselect === 'profissional') {
      setRole(preselect);
      if (firstStep) setFirstStep(false);
    }
  }, []);

  const totalSteps = role === "paciente" ? 8 : 4;
  const stepNumber = role === "paciente" ? patientStep : professionalStep;

  const goNext = () => {
    setDirection(1);
    if (stepNumber < totalSteps) {
      if (role === "paciente") setPatientStep(patientStep + 1);
      else setProfessionalStep(professionalStep + 1);
    } else {
      setShowSuccess(true);
    }
  };

  const goBack = () => {
    setDirection(-1);
    if (!firstStep) {
      if (role === "paciente") {
        if (patientStep > 2) setPatientStep(patientStep - 1);
        if (patientStep === 2) {
          setRole(null);
          setFirstStep(true);
        }
      } else {
        if (professionalStep > 2) setProfessionalStep(professionalStep - 1);
        if (professionalStep === 2) {
          setRole(null);
          setFirstStep(true);
        }
      }
    } else {
      navigate('/');
    }
  };

  if (showSuccess || isRegistered) return <SuccessScreen />;

  const renderStep = () => {
    if (firstStep) return <StepProfile />;

    const sp = { stepNumber, totalSteps };
    if (!firstStep && stepNumber === 2) return <StepPatientName onNext={goNext} onBack={goBack} {...sp}/>

    if (role === "paciente" && stepNumber > 2 && !firstStep) {
      switch (patientStep) {
        case 3: return <StepUserAccess onNext={goNext} onBack={goBack} {...sp} />;
        case 4: return <StepPatientGender onNext={goNext} onBack={goBack} {...sp} />;
        case 5: return <StepPatientBirthdate onNext={goNext} onBack={goBack} {...sp} />;
        case 6: return <StepPatientAddress onNext={goNext} onBack={goBack} {...sp} />;
        case 7: return <StepPatientSus onNext={goNext} onBack={goBack} {...sp} />;
        case 8: return <StepPatientComplaint onNext={goNext} onBack={goBack} {...sp} />;
      }
    }
    if (role === "profissional" && stepNumber > 2 && !firstStep) {
      switch (professionalStep) {
        case 3: return <StepProfPersonal onNext={goNext} onBack={goBack} {...sp} />;
        case 4: return <StepProfClinic onNext={goNext} onBack={goBack} {...sp} />;
      }
    }
    return null;
  };

  const progress = (firstStep) ? 0 : (stepNumber / totalSteps) * 100;

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

      {/* Glass header — mobile-first */}
      <div className="sticky top-0 z-50 border-b border-border/30" style={{
        background: 'rgba(255,255,255,0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}>
        <div className="container flex items-center justify-between h-12 md:h-14">
          <Link to="/" className="font-display font-800 text-primary text-lg md:text-xl tracking-tight">
            cadus<span className="text-highlight">.</span>
          </Link>
          <span className="w-[44px]" />
        </div>
      </div>

      {/* Content — mobile-first: top-aligned, compact padding */}
      <div className="flex-1 flex items-start justify-center py-3 px-3 md:items-center md:py-8 md:px-4 lg:py-12">
        <div className="w-full max-w-full md:max-w-[520px]">
          <div className="card-cadus">
            {/* Gradient progress bar */}
            <div className="h-1 bg-border/30 mb-6">
              <div
                className="h-full transition-all duration-700 ease-out rounded-r-full"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, hsl(184, 78%, 28%), hsl(184, 75%, 38%))'
                }}
              />
            </div>
            <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`${role}-${stepNumber}`}
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
    </div>
  );
};

export default Registration;
