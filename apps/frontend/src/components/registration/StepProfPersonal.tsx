import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCPF, formatPhone, validateCPF } from '@/lib/masks';
import { Stethoscope, ArrowLeft, ArrowRight, UserRound, Hash, Phone, Mail } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; stepNumber?: number; totalSteps?: number; }

const councils = ['CRM', 'CRFa', 'CREFITO', 'CRP', 'CRN', 'Outro'];

const StepProfPersonal = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { professionalData, updateProfessionalData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!professionalData.nome?.trim()) e.nome = 'Por favor, informe seu nome.';
    if (!professionalData.cpf || !validateCPF(professionalData.cpf)) e.cpf = 'CPF inválido.';
    if (!professionalData.conselho) e.conselho = 'Selecione seu conselho.';
    if (!professionalData.numeroRegistro?.trim()) e.numeroRegistro = 'Informe o número de registro.';
    if (!professionalData.telefone || professionalData.telefone.replace(/\D/g, '').length < 10) e.telefone = 'Telefone inválido.';
    if (!professionalData.email?.trim() || !professionalData.email.includes('@')) e.email = 'E-mail inválido.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  return (
    <div className="card-cadus">
      <div className="step-header">
        <div className="icon-hero">
          <Stethoscope size={22} className="md:hidden" />
          <Stethoscope size={26} className="hidden md:block" />
        </div>
        <h2>Seus dados profissionais</h2>
        <p>Dados para validação do seu registro</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">Etapa {stepNumber} de {totalSteps}</div>
        )}
      </div>

      <div className="step-divider" />

      <div className="space-y-3 md:space-y-4">
        <div>
          <label className="label-cadus">Nome completo *</label>
          <div className="relative">
            <UserRound size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input className="input-cadus pl-12" value={professionalData.nome || ''} onChange={(e) => updateProfessionalData({ nome: e.target.value })} placeholder="Seu nome completo" />
          </div>
          {errors.nome && <p className="error-text">{errors.nome}</p>}
        </div>
        <div>
          <label className="label-cadus">CPF *</label>
          <div className="relative">
            <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input className="input-cadus pl-12" value={professionalData.cpf || ''} onChange={(e) => updateProfessionalData({ cpf: formatCPF(e.target.value) })} placeholder="000.000.000-00" inputMode="numeric" />
          </div>
          {errors.cpf && <p className="error-text">{errors.cpf}</p>}
        </div>
        <div>
          <label className="label-cadus">Conselho profissional *</label>
          <select className="input-cadus" value={professionalData.conselho || ''} onChange={(e) => updateProfessionalData({ conselho: e.target.value })}>
            <option value="">Selecione...</option>
            {councils.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          {errors.conselho && <p className="error-text">{errors.conselho}</p>}
        </div>
        <div>
          <label className="label-cadus">Número do {professionalData.conselho || 'registro'} *</label>
          <input className="input-cadus" value={professionalData.numeroRegistro || ''} onChange={(e) => updateProfessionalData({ numeroRegistro: e.target.value })} placeholder="Número do registro" />
          {errors.numeroRegistro && <p className="error-text">{errors.numeroRegistro}</p>}
        </div>
        <div>
          <label className="label-cadus">Especialidade / Área de atuação</label>
          <input className="input-cadus" value={professionalData.especialidade || ''} onChange={(e) => updateProfessionalData({ especialidade: e.target.value })} placeholder="Ex: Fonoaudiologia" />
        </div>
        <div>
          <label className="label-cadus">Telefone profissional *</label>
          <div className="relative">
            <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input className="input-cadus pl-12" value={professionalData.telefone || ''} onChange={(e) => updateProfessionalData({ telefone: formatPhone(e.target.value) })} placeholder="(00) 00000-0000" inputMode="tel" />
          </div>
          {errors.telefone && <p className="error-text">{errors.telefone}</p>}
        </div>
        <div>
          <label className="label-cadus">E-mail profissional *</label>
          <div className="relative">
            <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40" />
            <input type="email" className="input-cadus pl-12" value={professionalData.email || ''} onChange={(e) => updateProfessionalData({ email: e.target.value })} placeholder="seu@email.com" />
          </div>
          {errors.email && <p className="error-text">{errors.email}</p>}
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

export default StepProfPersonal;
