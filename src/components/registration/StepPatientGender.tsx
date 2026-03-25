import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { Heart, ArrowRight, ArrowLeft } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const genderOptions = [
  'Mulher cisgênero',
  'Homem cisgênero',
  'Mulher transgênero',
  'Homem transgênero',
  'Não-binário',
  'Genderqueer',
  'Genderfluid',
  'Agênero',
  'Intersexo',
  'Dois-espíritos',
  'Prefiro não informar',
  'Outro',
];

const pronomeOptions = ['Ela/Dela', 'Ele/Dele', 'Elu/Delu', 'Outro'];

const cisOptions = ['Mulher cisgênero', 'Homem cisgênero', 'Prefiro não informar'];

const StepPatientGender = ({ onNext, onBack }: Props) => {
  const { patientData, updatePatientData } = useRegistrationStore();
  const [error, setError] = useState('');
  const [generoOutro, setGeneroOutro] = useState('');
  const [pronomeOutro, setPronomeOutro] = useState('');

  const selectedGenero = patientData.genero || '';
  const showExtras = selectedGenero && !cisOptions.includes(selectedGenero);

  const handleSelectGenero = (opt: string) => {
    updatePatientData({ genero: opt });
    if (cisOptions.includes(opt)) {
      updatePatientData({ pronome: '', nomeSocial: '' });
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

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-accent/60 flex items-center justify-center mx-auto mb-5">
          <Heart size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você se identifica?
        </h2>
        <p className="text-muted-foreground mt-2 font-body">Queremos que você se sinta acolhido(a) aqui.</p>
      </div>

      <div className="space-y-5">
        <div>
          <div className="grid grid-cols-2 gap-2">
            {genderOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectGenero(opt)}
                className={`px-4 py-3 rounded-xl border-2 text-sm font-body font-500 transition-all duration-200 ${
                  selectedGenero === opt || (opt === 'Outro' && selectedGenero.startsWith('Outro'))
                    ? 'border-primary bg-accent text-foreground shadow-sm'
                    : 'border-border text-muted-foreground hover:border-primary/30 hover:bg-accent/50'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
          {error && <p className="error-text mt-2">{error}</p>}
        </div>

        {(selectedGenero === 'Outro' || selectedGenero.startsWith('Outro:')) && (
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
              {patientData.pronome === 'Outro' && (
                <input
                  className="input-cadus mt-2"
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
              <p className="text-xs text-muted-foreground mt-1">Se preferir ser chamado de outro nome, informe aqui.</p>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleNext} className="btn-primary w-full mt-8">
        Continuar <ArrowRight size={18} />
      </button>

      <button onClick={onBack} className="w-full mt-3 text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 font-body">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepPatientGender;
