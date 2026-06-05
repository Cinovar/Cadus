import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { getFirstName } from '@/lib/masks';
import { MessageCircle, ArrowLeft } from 'lucide-react';
import RegisterButton from '../RegisterButton';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const StepPatientComplaint = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const firstName = getFirstName(patientData.nome || '');
  const charCount = patientData.queixa?.length || 0;

  const validate = () => {
    const lettersRegex = /[A-Za-záàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ]/;
    const repeatedCharaRegex = /(.)\1{9,}/;
    
    if (!patientData.queixa?.trim() || patientData.queixa.length < 10) setError('Por favor, descreva brevemente o motivo.');
    else if (repeatedCharaRegex.test(patientData.queixa)) setError('Por favor, diminua a repetição excessiva de caracteres.')
    else if (!lettersRegex.test(patientData.queixa)) setError('Por favor, evite escrever apenas números ou símbolos.');
    else setError('');

    return error === '';
  };

  return (
    <>
      <div className="step-header">
        <div className="icon-hero">
          <MessageCircle size={22} className="md:hidden" />
          <MessageCircle size={26} className="hidden md:block" />
        </div>
        <h2>{firstName ? `${firstName}, por que busca atendimento?` : 'Por que busca atendimento?'}</h2>
        <p>Última etapa — Ajuda o profissional a se preparar para você</p>
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
          placeholder="Descreva aqui sua queixa principal (pelo menos 10 caracteres)..."
          maxLength={2000}
          rows={5}
        />
        <div className="flex justify-between mt-2">
          <p className="text-[11px] md:text-xs text-muted-foreground/50">Escreva com suas palavras, sem termos técnicos.</p>
          <span
            className={`text-[11px] md:text-xs ${charCount === 2000 ? "text-destructive" : "text-muted-foreground/40"}`}>
            {charCount}/2000
          </span>
        </div>
        {error && <p className="error-text mt-2">{error}</p>}
      </div>

      <RegisterButton onValidate={validate} onNext={onNext}/>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </>
  );
};

export default StepPatientComplaint;
