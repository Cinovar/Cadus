import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCPF, validateCPF, getFirstName } from '@/lib/masks';
import { ShieldCheck, ArrowRight, ArrowLeft, Lock } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientCPF = ({ onNext, onBack }: Props) => {
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
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-blue">
          <ShieldCheck size={32} className="text-blue-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Olá, {firstName}!
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">
          Agora precisamos do seu CPF para sua segurança.
        </p>
      </div>

      <div>
        <input
          className="input-cadus text-center text-lg tracking-wide"
          value={patientData.cpf || ''}
          onChange={(e) => updatePatientData({ cpf: formatCPF(e.target.value) })}
          placeholder="000.000.000-00"
          inputMode="numeric"
          autoFocus
        />
        {error && <p className="error-text text-center mt-2">{error}</p>}
        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground/60">
          <Lock size={12} />
          <span>Seus dados estão protegidos</span>
        </div>
      </div>

      <button onClick={handleSubmit} className="btn-primary w-full mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientCPF;
