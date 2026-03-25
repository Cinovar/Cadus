import { useState, useCallback } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCEP, fetchAddress } from '@/lib/masks';
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientAddress = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loadingCep, setLoadingCep] = useState(false);

  const handleCep = useCallback(async (value: string) => {
    const formatted = formatCEP(value);
    updatePatientData({ cep: formatted });
    const digits = formatted.replace(/\D/g, '');
    if (digits.length === 8) {
      setLoadingCep(true);
      const addr = await fetchAddress(digits);
      if (addr) {
        updatePatientData(addr);
      }
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
      <h2 className="text-xl font-display font-800 text-foreground">Onde você mora?</h2>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Precisamos do seu endereço para o cadastro.</p>

      <div className="space-y-4">
        <div>
          <label className="label-cadus">CEP *</label>
          <div className="relative">
            <input className="input-cadus" value={patientData.cep || ''} onChange={(e) => handleCep(e.target.value)} placeholder="00000-000" inputMode="numeric" />
            {loadingCep && <Loader2 size={18} className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-muted-foreground" />}
          </div>
          {errors.cep && <p className="error-text">{errors.cep}</p>}
        </div>

        <div>
          <label className="label-cadus">Rua / Logradouro</label>
          <input className="input-cadus" value={patientData.rua || ''} onChange={(e) => updatePatientData({ rua: e.target.value })} placeholder="Preenchido automaticamente pelo CEP" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-cadus">Número *</label>
            <input className="input-cadus" value={patientData.numero || ''} onChange={(e) => updatePatientData({ numero: e.target.value })} placeholder="Nº" />
            {errors.numero && <p className="error-text">{errors.numero}</p>}
          </div>
          <div>
            <label className="label-cadus">Complemento</label>
            <input className="input-cadus" value={patientData.complemento || ''} onChange={(e) => updatePatientData({ complemento: e.target.value })} placeholder="Apto, bloco..." />
          </div>
        </div>

        <div>
          <label className="label-cadus">Bairro</label>
          <input className="input-cadus" value={patientData.bairro || ''} onChange={(e) => updatePatientData({ bairro: e.target.value })} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label-cadus">Cidade</label>
            <input className="input-cadus" value={patientData.cidade || ''} onChange={(e) => updatePatientData({ cidade: e.target.value })} />
          </div>
          <div>
            <label className="label-cadus">Estado</label>
            <input className="input-cadus" value={patientData.estado || ''} onChange={(e) => updatePatientData({ estado: e.target.value })} />
          </div>
        </div>

        <hr className="border-border my-2" />
        <h3 className="font-display font-700 text-foreground">Informações do SUS</h3>

        <div>
          <label className="label-cadus">Número do seu Cartão SUS (se tiver)</label>
          <input className="input-cadus" value={patientData.cartaoSus || ''} onChange={(e) => updatePatientData({ cartaoSus: e.target.value })} placeholder="Opcional" />
        </div>

        <div>
          <label className="label-cadus">Como você chegou até nós? *</label>
          <div className="flex flex-col gap-2">
            {['Encaminhado pelo SUS', 'Vim por conta própria'].map((opt) => (
              <button key={opt} type="button" onClick={() => updatePatientData({ comoChegou: opt })}
                className={`px-4 py-3 rounded-xl border-2 text-sm text-left font-body transition-all duration-200 ${patientData.comoChegou === opt ? 'border-primary bg-accent shadow-sm' : 'border-border hover:border-primary/30 hover:bg-accent/50'}`}>
                {opt}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="label-cadus">Você tem responsável legal?</label>
          <div className="flex gap-3">
            <button type="button" onClick={() => updatePatientData({ temResponsavel: true })}
              className={`px-6 py-3 rounded-xl border-2 text-sm font-body transition-all duration-200 ${patientData.temResponsavel === true ? 'border-primary bg-accent shadow-sm' : 'border-border hover:border-primary/30'}`}>Sim</button>
            <button type="button" onClick={() => updatePatientData({ temResponsavel: false, nomeResponsavel: '' })}
              className={`px-6 py-3 rounded-xl border-2 text-sm font-body transition-all duration-200 ${patientData.temResponsavel === false ? 'border-primary bg-accent shadow-sm' : 'border-border hover:border-primary/30'}`}>Não</button>
          </div>
          {patientData.temResponsavel && (
            <div className="mt-3">
              <label className="label-cadus">Nome do responsável legal</label>
              <input className="input-cadus" value={patientData.nomeResponsavel || ''} onChange={(e) => updatePatientData({ nomeResponsavel: e.target.value })} />
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-outline flex-1"><ArrowLeft size={18} /> Voltar</button>
        <button onClick={() => { if (validate()) onNext(); }} className="btn-primary flex-1">Continuar <ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

export default StepPatientAddress;
