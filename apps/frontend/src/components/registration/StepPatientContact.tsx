import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatPhone, getFirstName } from '@/lib/masks';
import { Phone, ArrowRight, ArrowLeft, Mail } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const StepPatientContact = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const firstName = getFirstName(patientData.nome || '');

  const handleSubmit = () => {
    const digits = (patientData.telefone || '').replace(/\D/g, '');
    if (digits.length < 10) {
      setError('Por favor, informe um telefone válido.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <Phone size={22} className="md:hidden" />
          <Phone size={26} className="hidden md:block" />
        </div>
        <h2>{firstName ? `${firstName}, como falar com você?` : 'Como falar com você?'}</h2>
        <p>Enviaremos lembretes de consulta por WhatsApp</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div className="space-y-4 md:space-y-5">
        <div>
          <label className="label-cadus">Telefone / WhatsApp *</label>
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input
              className="input-cadus pl-12"
              value={patientData.telefone || ''}
              onChange={(e) => updatePatientData({ telefone: formatPhone(e.target.value) })}
              placeholder="(00) 00000-0000"
              inputMode="tel"
              autoFocus
            />
          </div>
        </div>
        <div>
          <label className="label-cadus">E-mail (opcional)</label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input
              type="email"
              className="input-cadus pl-12"
              value={patientData.email || ''}
              onChange={(e) => updatePatientData({ email: e.target.value })}
              placeholder="seu@email.com"
            />
          </div>
          <p className="text-[11px] md:text-xs text-muted-foreground/50 mt-1.5">
            Sem e-mail? Sem problema — use o CPF para entrar.
          </p>
        </div>
        {error && <p className="error-text">{error}</p>}
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

export default StepPatientContact;
