import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatCPF, formatPhone, validateCPF } from '@/lib/masks';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientPersonal = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!patientData.nome?.trim()) e.nome = 'Por favor, informe seu nome completo.';
    if (!patientData.cpf || !validateCPF(patientData.cpf)) e.cpf = 'Por favor, informe um CPF válido.';
    if (!patientData.dataNascimento) e.dataNascimento = 'Por favor, informe sua data de nascimento.';
    if (!patientData.genero) e.genero = 'Por favor, selecione uma opção.';
    if (!patientData.telefone || patientData.telefone.replace(/\D/g, '').length < 10)
      e.telefone = 'Por favor, informe um telefone válido.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => { if (validate()) onNext(); };

  const sexOptions = ['Masculino', 'Feminino', 'Outro', 'Prefiro não informar'];

  return (
    <div className="card-cadus">
      <h2 className="text-xl font-display font-800 text-foreground">Vamos começar com seus dados.</h2>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Preencha com calma. Você pode corrigir depois.</p>

      <div className="space-y-4">
        <div>
          <label className="label-cadus">Seu nome completo *</label>
          <input
            className="input-cadus"
            value={patientData.nome || ''}
            onChange={(e) => updatePatientData({ nome: e.target.value })}
            placeholder="Ex: Maria das Graças Silva"
          />
          {errors.nome && <p className="error-text">{errors.nome}</p>}
        </div>

        <div>
          <label className="label-cadus">Seu CPF *</label>
          <input
            className="input-cadus"
            value={patientData.cpf || ''}
            onChange={(e) => updatePatientData({ cpf: formatCPF(e.target.value) })}
            placeholder="000.000.000-00"
            inputMode="numeric"
          />
          {errors.cpf && <p className="error-text">{errors.cpf}</p>}
        </div>

        <div>
          <label className="label-cadus">Sua data de nascimento *</label>
          <input
            type="date"
            className="input-cadus"
            value={patientData.dataNascimento || ''}
            onChange={(e) => updatePatientData({ dataNascimento: e.target.value })}
          />
          {errors.dataNascimento && <p className="error-text">{errors.dataNascimento}</p>}
        </div>

        <div>
          <label className="label-cadus">Como você se identifica? *</label>
          <div className="grid grid-cols-2 gap-2">
            {sexOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => updatePatientData({ genero: opt })}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-body font-500 transition-all duration-200 ${
                  patientData.genero === opt
                    ? 'border-primary bg-accent text-foreground shadow-sm'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-accent/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {errors.genero && <p className="error-text">{errors.genero}</p>}
        </div>

        <div>
          <label className="label-cadus">Seu celular ou telefone *</label>
          <input
            className="input-cadus"
            value={patientData.telefone || ''}
            onChange={(e) => updatePatientData({ telefone: formatPhone(e.target.value) })}
            placeholder="(00) 00000-0000"
            inputMode="tel"
          />
          {errors.telefone && <p className="error-text">{errors.telefone}</p>}
        </div>

        <div>
          <label className="label-cadus">Seu e-mail (opcional)</label>
          <input
            type="email"
            className="input-cadus"
            value={patientData.email || ''}
            onChange={(e) => updatePatientData({ email: e.target.value })}
            placeholder="seu@email.com"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Se não tiver e-mail, tudo bem. Você pode usar só o CPF para entrar.
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-outline flex-1">
          <ArrowLeft size={18} /> Voltar
        </button>
        <button onClick={handleSubmit} className="btn-primary flex-1">
          Continuar <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default StepPatientPersonal;
