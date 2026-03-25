import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const clinics = [
  'Clínica de Fonoaudiologia UFPE',
  'Clínica de Fisioterapia UFPE',
  'Clínica de Psicologia UFPE',
  'Clínica de Nutrição UFPE',
  'Outra clínica',
];
const roles = ['Docente', 'Residente', 'Estagiário', 'Coordenador', 'Outro'];

const StepProfClinic = ({ onNext, onBack }: Props) => {
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
      <h2 className="text-xl font-display font-800 text-foreground">Em qual clínica você atua?</h2>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Selecione a clínica onde você vai usar o Cadus.</p>

      <div className="space-y-4">
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

        <div className="rounded-xl bg-accent p-4 text-sm text-foreground">
          <strong>Nota:</strong> Seu acesso será ativado após validação pela coordenação da clínica.
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-outline flex-1"><ArrowLeft size={18} /> Voltar</button>
        <button onClick={() => { if (validate()) onNext(); }} className="btn-primary flex-1">Continuar <ArrowRight size={18} /></button>
      </div>
    </div>
  );
};

export default StepProfClinic;
