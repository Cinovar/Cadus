import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { getFirstName } from '@/lib/masks';
import { Calendar, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientBirthdate = ({ onNext, onBack }: Props) => {
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
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{
          background: 'linear-gradient(145deg, hsl(184, 40%, 92%), hsl(184, 40%, 86%))',
          boxShadow: '0 8px 24px rgba(13, 92, 99, 0.1)'
        }}>
          <Calendar size={36} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          {firstName ? `${firstName}, quando você nasceu?` : 'Quando você nasceu?'}
        </h2>
        <p className="text-muted-foreground/80 mt-2 font-body">Precisamos saber sua data de nascimento.</p>
      </div>

      <div>
        <label className="label-cadus">Data de nascimento *</label>
        <input
          type="date"
          className="input-cadus"
          value={patientData.dataNascimento || ''}
          onChange={(e) => updatePatientData({ dataNascimento: e.target.value })}
        />
        {error && <p className="error-text mt-2">{error}</p>}
      </div>

      <button onClick={() => { if (validate()) onNext(); }} className="btn-primary w-full mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="w-full mt-5 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1.5 font-body py-2">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientBirthdate;
