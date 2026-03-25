import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { getFirstName } from '@/lib/masks';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepPatientAbout = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const firstName = getFirstName(patientData.nome || '');

  const validate = () => {
    const e: Record<string, string> = {};
    if (!patientData.dataNascimento) e.dataNascimento = 'Por favor, informe sua data de nascimento.';
    if (!patientData.genero) e.genero = 'Por favor, selecione uma opção.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const generoOptions = ['Feminino', 'Masculino', 'Não-binário', 'Prefiro não informar'];
  const pronomeOptions = ['Ela/Dela', 'Ele/Dele', 'Elu/Delu', 'Outro'];

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-5">
          <Heart size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          {firstName ? `${firstName}, conta mais sobre você` : 'Um pouco mais sobre você'}
        </h2>
        <p className="text-muted-foreground mt-2 font-body">Essas informações ajudam no seu atendimento.</p>
      </div>

      <div className="space-y-5">
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
            {generoOptions.map((opt) => (
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

        {patientData.genero === 'Não-binário' && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="label-cadus">Qual pronome você prefere? (opcional)</label>
            <div className="grid grid-cols-2 gap-2">
              {pronomeOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => updatePatientData({ pronome: opt })}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-body font-500 transition-all duration-200 ${
                    patientData.pronome === opt
                      ? 'border-primary bg-accent text-foreground shadow-sm'
                      : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-accent/50'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="label-cadus">Nome social (opcional)</label>
          <input
            className="input-cadus"
            value={patientData.nomeSocial || ''}
            onChange={(e) => updatePatientData({ nomeSocial: e.target.value })}
            placeholder="Como prefere ser chamado?"
          />
          <p className="text-xs text-muted-foreground mt-1">Se preferir ser chamado de outro nome, informe aqui.</p>
        </div>
      </div>

      <button onClick={() => { if (validate()) onNext(); }} className="btn-primary w-full mt-8">
        Continuar <ArrowRight size={18} />
      </button>

      <button onClick={onBack} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 font-body">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientAbout;
