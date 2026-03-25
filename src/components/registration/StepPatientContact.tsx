import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatPhone, getFirstName } from '@/lib/masks';
import { Phone, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientContact = ({ onNext, onBack }: Props) => {
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
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-emerald">
          <Phone size={32} className="text-emerald-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          {firstName ? `${firstName}, como falar com você?` : 'Como falar com você?'}
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">Para entrarmos em contato quando necessário.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="label-cadus">Telefone / WhatsApp *</label>
          <input
            className="input-cadus"
            value={patientData.telefone || ''}
            onChange={(e) => updatePatientData({ telefone: formatPhone(e.target.value) })}
            placeholder="(00) 00000-0000"
            inputMode="tel"
            autoFocus
          />
        </div>
        <div>
          <label className="label-cadus">E-mail (opcional)</label>
          <input
            type="email"
            className="input-cadus"
            value={patientData.email || ''}
            onChange={(e) => updatePatientData({ email: e.target.value })}
            placeholder="seu@email.com"
          />
          <p className="text-xs text-muted-foreground/60 mt-1.5">
            Se não tiver e-mail, tudo bem. Você pode usar só o CPF para entrar.
          </p>
        </div>
        {error && <p className="error-text">{error}</p>}
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

export default StepPatientContact;
