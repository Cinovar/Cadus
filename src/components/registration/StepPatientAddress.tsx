import { useState, useCallback } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCEP, fetchAddress, getFirstName } from '@/lib/masks';
import { MapPin, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientAddress = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingCep, setLoadingCep] = useState(false);
  const firstName = getFirstName(patientData.nome || '');

  const cepFilled = !!(patientData.rua && patientData.cidade);

  const handleCep = useCallback(async (value: string) => {
    const formatted = formatCEP(value);
    updatePatientData({ cep: formatted });
    const digits = formatted.replace(/\D/g, '');
    if (digits.length === 8) {
      setLoadingCep(true);
      const addr = await fetchAddress(digits);
      if (addr) updatePatientData(addr);
      setLoadingCep(false);
    }
  }, [updatePatientData]);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!patientData.cep || patientData.cep.replace(/\D/g, '').length < 8) e.cep = 'Por favor, informe um CEP válido.';
    if (!patientData.numero?.trim()) e.numero = 'Por favor, informe o número.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-amber">
          <MapPin size={32} className="text-amber-600" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          {firstName ? `${firstName}, onde você mora?` : 'Onde você mora?'}
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">Digite seu CEP e preenchemos o resto.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label-cadus">CEP *</label>
          <div className="relative">
            <input
              className="input-cadus"
              value={patientData.cep || ''}
              onChange={(e) => handleCep(e.target.value)}
              placeholder="00000-000"
              inputMode="numeric"
              autoFocus
            />
            {loadingCep && <Loader2 size={18} className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-primary" />}
          </div>
          {errors.cep && <p className="error-text">{errors.cep}</p>}
        </div>

        {cepFilled && (
          <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-4">
            <div className="info-note">
              <p className="font-500 text-foreground">{patientData.rua}</p>
              <p className="text-muted-foreground mt-0.5">{patientData.bairro} — {patientData.cidade}/{patientData.estado}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label-cadus">Número *</label>
                <input
                  className="input-cadus"
                  value={patientData.numero || ''}
                  onChange={(e) => updatePatientData({ numero: e.target.value })}
                  placeholder="Nº"
                />
                {errors.numero && <p className="error-text">{errors.numero}</p>}
              </div>
              <div>
                <label className="label-cadus">Complemento</label>
                <input
                  className="input-cadus"
                  value={patientData.complemento || ''}
                  onChange={(e) => updatePatientData({ complemento: e.target.value })}
                  placeholder="Apto, bloco..."
                />
              </div>
            </div>
          </div>
        )}
      </div>

      <button onClick={() => { if (validate()) onNext(); }} className="btn-primary w-full mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientAddress;
