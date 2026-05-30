import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { Building2, ArrowLeft, ArrowRight, Info } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const clinics = [
  'Clínica de Fonoaudiologia UFPE',
  'Clínica de Fisioterapia UFPE',
  'Clínica de Psicologia UFPE',
  'Clínica de Nutrição UFPE',
  'Outra clínica',
];
const roles = ['Docente', 'Residente', 'Estagiário', 'Coordenador', 'Outro'];

const StepProfClinic = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { professionalData, updateProfessionalData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!professionalData.clinica) e.clinica = 'Selecione uma clínica.';
    if (!professionalData.cargo) e.cargo = 'Selecione seu cargo.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <Building2 size={22} className="md:hidden" />
          <Building2 size={26} className="hidden md:block" />
        </div>
        <h2>Sua clínica</h2>
        <p>Selecione onde você atuará no Cadus</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="label-cadus">Clínica *</label>
          <select className="input-cadus" value={professionalData.clinica || ''} onChange={(e) => updateProfessionalData({ clinica: e.target.value })}>
            <option value="">Selecione...</option>
            {clinics.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.clinica && <p className="error-text">{errors.clinica}</p>}
        </div>
        <div>
          <label className="label-cadus">Cargo / Função *</label>
          <select className="input-cadus" value={professionalData.cargo || ''} onChange={(e) => updateProfessionalData({ cargo: e.target.value })}>
            <option value="">Selecione...</option>
            {roles.map((r) => <option key={r} value={r}>{r}</option>)}
          </select>
          {errors.cargo && <p className="error-text">{errors.cargo}</p>}
        </div>
        <div>
          <label className="label-cadus">Matrícula na instituição (se tiver)</label>
          <input className="input-cadus" value={professionalData.matricula || ''} onChange={(e) => updateProfessionalData({ matricula: e.target.value })} placeholder="Opcional" />
        </div>

        <div className="info-note flex items-start gap-3">
          <Info size={16} className="text-primary flex-shrink-0 mt-0.5" />
          <span className="text-foreground"><strong>Nota:</strong> Seu acesso será ativado após validação pela coordenação.</span>
        </div>
      </div>

      <button onClick={() => { if (validate()) onNext(); }} className="btn-primary w-full mt-6 md:mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepProfClinic;
