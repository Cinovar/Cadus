import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatName } from '@/lib/masks';
import { UserRound, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientName = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');

  const handleChange = (value: string) => {
    updatePatientData({ nome: formatName(value) });
  };

  const handleSubmit = () => {
    if (!patientData.nome?.trim() || patientData.nome.trim().split(' ').length < 2) {
      setError('Por favor, informe seu nome completo.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-teal">
          <UserRound size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você se chama?
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">
          Queremos saber como te chamar.
        </p>
      </div>

      <div>
        <input
          className="input-cadus text-center text-lg"
          value={patientData.nome || ''}
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Seu nome completo"
          autoFocus
        />
        {error && <p className="error-text text-center mt-2">{error}</p>}
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

export default StepPatientName;
