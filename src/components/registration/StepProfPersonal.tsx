import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCPF, formatPhone, validateCPF } from '@/lib/masks';
import { Stethoscope, ArrowLeft, ArrowRight } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const councils = ['CRM', 'CRFa', 'CREFITO', 'CRP', 'CRN', 'Outro'];

const StepProfPersonal = ({ onNext, onBack }: Props) => {
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
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-teal">
          <Stethoscope size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Seus dados profissionais
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">Preencha seus dados para o cadastro profissional.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="label-cadus">Nome completo *</label>
          <input className="input-cadus" value={professionalData.nome || ''} onChange={(e) => updateProfessionalData({ nome: e.target.value })} placeholder="Seu nome completo" />
          {errors.nome && <p className="error-text">{errors.nome}</p>}
        </div>
        <div>
          <label className="label-cadus">CPF *</label>
          <input className="input-cadus" value={professionalData.cpf || ''} onChange={(e) => updateProfessionalData({ cpf: formatCPF(e.target.value) })} placeholder="000.000.000-00" inputMode="numeric" />
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
          <input className="input-cadus" value={professionalData.telefone || ''} onChange={(e) => updateProfessionalData({ telefone: formatPhone(e.target.value) })} placeholder="(00) 00000-0000" inputMode="tel" />
          {errors.telefone && <p className="error-text">{errors.telefone}</p>}
        </div>
        <div>
          <label className="label-cadus">E-mail profissional *</label>
          <input type="email" className="input-cadus" value={professionalData.email || ''} onChange={(e) => updateProfessionalData({ email: e.target.value })} placeholder="seu@email.com" />
          {errors.email && <p className="error-text">{errors.email}</p>}
        </div>
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

export default StepProfPersonal;
