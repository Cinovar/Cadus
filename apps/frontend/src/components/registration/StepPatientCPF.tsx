import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCPF, validateCPF, getFirstName } from '@/lib/masks';
import { ShieldCheck, ArrowRight, ArrowLeft, Lock, Hash } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const StepPatientCPF = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const firstName = getFirstName(patientData.nome || '');

  const handleSubmit = () => {
    if (!patientData.cpf || !validateCPF(patientData.cpf)) {
      setError('Por favor, informe um CPF válido.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <ShieldCheck size={22} className="md:hidden" />
          <ShieldCheck size={26} className="hidden md:block" />
        </div>
        <h2>{firstName ? `${firstName}, informe seu CPF` : 'Informe seu CPF'}</h2>
        <p>Será usado como login seguro na plataforma</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div>
        <div className="relative">
          <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
          <input
            className="input-cadus pl-12 text-center text-base md:text-lg tracking-wide"
            value={patientData.cpf || ''}
            onChange={(e) => updatePatientData({ cpf: formatCPF(e.target.value) })}
            placeholder="000.000.000-00"
            inputMode="numeric"
            autoFocus
          />
        </div>
        {error && <p className="error-text text-center mt-2">{error}</p>}
        <div className="flex items-center justify-center gap-1.5 mt-3 md:mt-4 text-[11px] md:text-xs text-muted-foreground/50">
          <Lock size={12} />
          <span>Seus dados estão protegidos</span>
        </div>
      </div>

      <button onClick={handleSubmit} className="btn-primary w-full mt-4 md:mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientCPF;
