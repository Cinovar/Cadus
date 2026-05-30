import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { FileHeart, ArrowRight, ArrowLeft, Check, CreditCard } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const comoChegouOptions = [
  'Encaminhado pelo SUS',
  'Indicação médica',
  'Vim por conta própria',
  'Outro',
];

const StepPatientSus = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!patientData.comoChegou) {
      setError('Por favor, informe como chegou até nós.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <FileHeart size={22} className="md:hidden" />
          <FileHeart size={26} className="hidden md:block" />
        </div>
        <h2>Informações do SUS</h2>
        <p>Dados opcionais para pacientes do sistema público</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div className="space-y-4 md:space-y-5">
        <div>
          <label className="label-cadus">Cartão SUS (opcional)</label>
          <div className="relative">
            <CreditCard size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input
              className="input-cadus pl-12"
              value={patientData.cartaoSus || ''}
              onChange={(e) => updatePatientData({ cartaoSus: e.target.value.replace(/\D/g, '').slice(0, 15) })}
              placeholder="Número do Cartão SUS"
              inputMode="numeric"
            />
          </div>
        </div>

        <div>
          <label className="label-cadus">Como chegou até nós? *</label>
          <div className="grid grid-cols-2 gap-2 md:gap-2.5">
            {comoChegouOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updatePatientData({ comoChegou: opt })}
                className={`selection-card text-[13px] md:text-sm !py-2.5 md:!py-3 ${patientData.comoChegou === opt ? 'selection-card-active' : ''}`}
              >
                {patientData.comoChegou === opt && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                    <Check size={10} className="text-primary-foreground" />
                  </div>
                )}
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-cadus flex items-center gap-3">
            <input
              type="checkbox"
              checked={patientData.temResponsavel || false}
              onChange={(e) => updatePatientData({ temResponsavel: e.target.checked, nomeResponsavel: e.target.checked ? patientData.nomeResponsavel : '' })}
              className="w-5 h-5 rounded-md border-2 border-border accent-primary"
            />
            <span>Possui responsável legal</span>
          </label>
          {patientData.temResponsavel && (
            <input
              className="input-cadus mt-3 animate-in fade-in duration-200"
              placeholder="Nome do responsável"
              value={patientData.nomeResponsavel || ''}
              onChange={(e) => updatePatientData({ nomeResponsavel: e.target.value })}
            />
          )}
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

export default StepPatientSus;
