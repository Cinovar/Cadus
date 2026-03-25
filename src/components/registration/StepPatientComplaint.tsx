import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientComplaint = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');

  const handleSubmit = () => {
    if (!patientData.queixa?.trim()) {
      setError('Por favor, descreva por que está buscando atendimento.');
      return;
    }
    setError('');
    onNext();
  };

  const charCount = patientData.queixa?.length || 0;

  return (
    <div className="card-cadus">
      <h2 className="text-xl font-display font-800 text-foreground">Por que você está buscando atendimento?</h2>
      <p className="text-muted-foreground text-sm mt-1 mb-6">
        Escreva com suas próprias palavras. Não precisa usar termos médicos.
      </p>

      <div>
        <label className="label-cadus">Descreva sua queixa principal *</label>
        <textarea
          className="input-cadus min-h-[140px] resize-y"
          value={patientData.queixa || ''}
          onChange={(e) => updatePatientData({ queixa: e.target.value })}
          placeholder="Ex: Estou com dificuldade para engolir há alguns meses e sinto dor ao falar..."
          maxLength={2000}
        />
        <div className="flex justify-between mt-1">
          <p className="text-xs text-muted-foreground">O profissional vai ler exatamente o que você escrever aqui.</p>
          <span className="text-xs text-muted-foreground">{charCount}/2000</span>
        </div>
        {error && <p className="error-text">{error}</p>}
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-outline flex-1"><ArrowLeft size={18} /> Voltar</button>
        <button onClick={handleSubmit} className="btn-primary flex-1">Continuar <ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

export default StepPatientComplaint;
