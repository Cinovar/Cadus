import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { formatName, sanitizeName } from '@/lib/masks';
import { UserRound, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props {
  onNext: () => void;
  onBack: () => void;
  stepNumber?: number;
  totalSteps?: number;
}

const StepPatientName = ({ onNext, onBack, stepNumber, totalSteps }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [temNomeSocial, setTemNomeSocial] = useState(false);

  const validate = () => {
    const nome = patientData.nome?.trim();
    const nomeSocial = patientData.nomeSocial?.trim();
    const e: Record<string, string> = {};

    if (temNomeSocial && (!nomeSocial || nomeSocial.split(" ").length < 2))
      e.nomeSocial = "Por favor, informe seu nome social completo.";

    if (!nome || nome.split(" ").length < 2)
      e.nome = "Por favor, informe seu nome civil completo.";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    const nome = patientData.nome?.trim();

    if (!nome || nome.split(' ').length < 2) {
      setError('Por favor, informe seu nome completo.');
      return;
    }

    setError('');
    onNext();
  };

  return (
    <>
      <div className="step-header">
        <div className="icon-hero">
          <UserRound size={22} className="md:hidden" />
          <UserRound size={26} className="hidden md:block" />
        </div>
        <h2>Como você se chama?</h2>
        <p>Seu nome completo</p>
        {stepNumber && totalSteps && (
          <div className="step-badge">
            Etapa {stepNumber} de {totalSteps}
          </div>
        )}
      </div>

      <div className="step-divider" />

      <div className="flex flex-col gap-3">
        <label className="label-cadus flex items-center gap-3 mx-4">
          <input
            type="checkbox"
            checked={temNomeSocial || false}
            onChange={() => setTemNomeSocial(!temNomeSocial)}
            className="w-5 h-5 rounded-md border-2 border-border accent-primary"
          />
          <span>Tenho nome social</span>
        </label>

        {temNomeSocial && (
          <>
            <div>
              <div className="relative">
                <UserRound
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40"
                />
                <input
                  className="input-cadus pl-12 text-base md:text-lg"
                  value={patientData.nomeSocial || ""}
                  onChange={(e) =>
                    updatePatientData({
                      nomeSocial: formatName(sanitizeName(e.target.value)),
                    })
                  }
                  placeholder="Nome social completo..."
                  autoFocus
                />
              </div>
              {errors.nomeSocial && (
                <p className="error-text mt-2 ml-2">{errors.nomeSocial}</p>
              )}
            </div>
          </>
        )}

        <div>
          <div className="relative">
            <UserRound
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground/40"
            />
            <input
              className="input-cadus pl-12 text-base md:text-lg"
              value={patientData.nome || ""}
              onChange={(e) =>
                updatePatientData({
                  nome: formatName(sanitizeName(e.target.value)),
                })
              }
              placeholder="Nome civil completo..."
              autoFocus
            />
          </div>
          {errors.nome && <p className="error-text mt-2 ml-2">{errors.nome}</p>}
        </div>
      </div>

      <button
        onClick={() => { handleSubmit(); }}
        className="btn-primary w-full mt-4 md:mt-8 group"
      >
        Continuar{" "}
        <ArrowRight
          size={18}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </>
  );
};

export default StepPatientName;