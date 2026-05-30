import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { getFirstName } from '@/lib/masks';
import { MessageCircle, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const StepPatientComplaint = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const firstName = getFirstName(patientData.nome || '');
  const charCount = patientData.queixa?.length || 0;

  const handleSubmit = () => {
    if (!patientData.queixa?.trim()) {
      setError('Por favor, descreva brevemente o motivo.');
      return;
    }
    setError('');
    onNext();
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <MessageCircle size={22} className="md:hidden" />
          <MessageCircle size={26} className="hidden md:block" />
        </div>
        <h2>{firstName ? `${firstName}, por que busca atendimento?` : 'Por que busca atendimento?'}</h2>
        <p>Ajuda o profissional a se preparar para você</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div>
        <textarea
          className="input-cadus min-h-[120px] md:min-h-[140px] resize-none"
          value={patientData.queixa || ''}
          onChange={(e) => updatePatientData({ queixa: e.target.value })}
          placeholder="Descreva aqui sua queixa principal..."
          maxLength={2000}
          rows={5}
        />
        <div className="flex justify-between mt-2">
          <p className="text-[11px] md:text-xs text-muted-foreground/50">Escreva com suas palavras, sem termos técnicos.</p>
          <span className="text-[11px] md:text-xs text-muted-foreground/40">{charCount}/2000</span>
        </div>
        {error && <p className="error-text mt-2">{error}</p>}
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

export default StepPatientComplaint;
