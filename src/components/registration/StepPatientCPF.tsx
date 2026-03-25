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
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{
          background: 'linear-gradient(145deg, hsl(184, 40%, 92%), hsl(184, 40%, 86%))',
          boxShadow: '0 8px 24px rgba(13, 92, 99, 0.1)'
        }}>
          <ShieldCheck size={36} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Olá, {firstName}!
        </h2>
        <p className="text-muted-foreground/80 mt-2 font-body">
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
        <div className="flex items-center justify-center gap-1.5 mt-4 text-xs text-muted-foreground/70">
          <Lock size={12} />
          <span>Seus dados estão protegidos</span>
        </div>
      </div>

      <button onClick={handleSubmit} className="btn-primary w-full mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="w-full mt-5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 font-body py-2">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientCPF;
