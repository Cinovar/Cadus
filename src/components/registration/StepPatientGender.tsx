import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const genderOptions = [
  { label: 'Feminino', icon: '♀' },
  { label: 'Masculino', icon: '♂' },
];
const genderSecondary = [
  { label: 'Outro', icon: '◎' },
  { label: 'Prefiro não informar', icon: '—' },
];
const pronomeOptions = ['Ela/Dela', 'Ele/Dele', 'Elu/Delu', 'Outro'];

const StepPatientGender = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const [generoOutro, setGeneroOutro] = useState('');
  const [pronomeOutro, setPronomeOutro] = useState('');

  const selectedGenero = patientData.genero || '';
  const showGenderInput = selectedGenero === 'Outro';
  const showExtras = selectedGenero === 'Outro' || selectedGenero === 'Prefiro não informar';

  const handleSelectGenero = (opt: string) => {
    updatePatientData({ genero: opt });
    if (!['Outro', 'Prefiro não informar'].includes(opt)) {
      updatePatientData({ pronome: '', nomeSocial: '' });
      setGeneroOutro('');
      setPronomeOutro('');
    }
    setError('');
  };

  const validate = () => {
    if (!selectedGenero) {
      setError('Por favor, selecione uma opção.');
      return false;
    }
    if (selectedGenero === 'Outro' && !generoOutro.trim()) {
      setError('Por favor, informe como você se identifica.');
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (!validate()) return;
    if (selectedGenero === 'Outro') {
      updatePatientData({ genero: `Outro: ${generoOutro.trim()}` });
    }
    if (patientData.pronome === 'Outro' && pronomeOutro.trim()) {
      updatePatientData({ pronome: `Outro: ${pronomeOutro.trim()}` });
    }
    onNext();
  };

  const isActive = (opt: string) => selectedGenero === opt || (opt === 'Outro' && selectedGenero.startsWith('Outro'));

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-rose">
          <Heart size={32} className="text-rose-500" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você se identifica?
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">Selecione a opção que melhor te representa.</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="grid grid-cols-2 gap-3">
            {genderOptions.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleSelectGenero(opt.label)}
                className={`selection-card ${isActive(opt.label) ? 'selection-card-active' : ''}`}
              >
                {isActive(opt.label) && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                )}
                <span className="mr-1.5 text-lg">{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>

          {/* Separator */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-border/60" />
            <span className="text-xs text-muted-foreground/50 font-body">ou</span>
            <div className="flex-1 h-px bg-border/60" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {genderSecondary.map((opt) => (
              <button
                key={opt.label}
                type="button"
                onClick={() => handleSelectGenero(opt.label)}
                className={`selection-card text-[13px] ${isActive(opt.label) ? 'selection-card-active' : ''}`}
              >
                {isActive(opt.label) && (
                  <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <Check size={12} className="text-primary-foreground" />
                  </div>
                )}
                <span className="mr-1 opacity-60">{opt.icon}</span> {opt.label}
              </button>
            ))}
          </div>
          {error && <p className="error-text mt-3">{error}</p>}
        </div>

        {showGenderInput && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300">
            <label className="label-cadus">Como você se identifica?</label>
            <input
              className="input-cadus"
              value={generoOutro}
              onChange={(e) => setGeneroOutro(e.target.value)}
              placeholder="Digite aqui..."
            />
          </div>
        )}

        {showExtras && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 space-y-5">
            <div>
              <label className="label-cadus">Qual pronome você prefere? (opcional)</label>
              <div className="grid grid-cols-2 gap-2.5">
                {pronomeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => updatePatientData({ pronome: opt })}
                    className={`selection-card text-sm !py-3 ${patientData.pronome === opt ? 'selection-card-active' : ''}`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {patientData.pronome === 'Outro' && (
                <input
                  className="input-cadus mt-2.5"
                  value={pronomeOutro}
                  onChange={(e) => setPronomeOutro(e.target.value)}
                  placeholder="Qual pronome?"
                />
              )}
            </div>

            <div>
              <label className="label-cadus">Nome social (opcional)</label>
              <input
                className="input-cadus"
                value={patientData.nomeSocial || ''}
                onChange={(e) => updatePatientData({ nomeSocial: e.target.value })}
                placeholder="Como prefere ser chamado?"
              />
              <p className="text-xs text-muted-foreground/60 mt-1.5">Se preferir ser chamado de outro nome, informe aqui.</p>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleNext} className="btn-primary w-full mt-8 group">
        Continuar <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
      </button>

      <button onClick={onBack} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientGender;
