import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { getFirstName } from '@/lib/masks';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const StepPatientBirthdate = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const firstName = getFirstName(patientData.nome || '');

  const validate = () => {
    if (!patientData.dataNascimento) {
      setError('Por favor, informe sua data de nascimento.');
      return false;
    }
    setError('');
    return true;
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <Calendar size={22} className="md:hidden" />
          <Calendar size={26} className="hidden md:block" />
        </div>
        <h2>{firstName ? `${firstName}, quando você nasceu?` : 'Quando você nasceu?'}</h2>
        <p>Necessário para o prontuário clínico</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div>
        <label className="label-cadus">Data de nascimento *</label>
        <div className="relative">
          <Calendar size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
          <input
            type="date"
            className="input-cadus pl-12"
            value={patientData.dataNascimento || ''}
            onChange={(e) => updatePatientData({ dataNascimento: e.target.value })}
          />
        </div>
        {error && <p className="error-text mt-2">{error}</p>}
      </div>

      <button onClick={() => { if (validate()) onNext(); }} className="btn-primary w-full mt-4 md:mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientBirthdate;
