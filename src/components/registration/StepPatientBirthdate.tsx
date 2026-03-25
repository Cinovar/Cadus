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
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-5">
          <Calendar size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          {firstName ? `${firstName}, quando você nasceu?` : 'Quando você nasceu?'}
        </h2>
        <p className="text-muted-foreground mt-2 font-body">Precisamos saber sua data de nascimento.</p>
      </div>

      <div>
        <label className="label-cadus">Data de nascimento *</label>
        <input
          type="date"
          className="input-cadus"
          value={patientData.dataNascimento || ''}
          onChange={(e) => updatePatientData({ dataNascimento: e.target.value })}
        />
        {error && <p className="error-text">{error}</p>}
      </div>

      <button onClick={() => { if (validate()) onNext(); }} className="btn-primary w-full mt-8">
        Continuar <ArrowRight size={18} />
      </button>

      <button onClick={onBack} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 font-body">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientBirthdate;
