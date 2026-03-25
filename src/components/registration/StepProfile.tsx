import { Heart, Stethoscope, Check } from 'lucide-react';
import { useRegistrationStore } from '@/store/registrationStore';

interface Props {
  onNext: () => void;
}

const StepProfile = ({ onNext }: Props) => {
  const { role, setRole, setCurrentStep } = useRegistrationStore();

  const handleSelect = (selected: 'paciente' | 'profissional') => {
    setRole(selected);
    setTimeout(() => {
      setCurrentStep(2);
      onNext();
    }, 350);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você vai usar o <span className="text-primary">Cadus</span>?
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body text-[15px]">Escolha uma opção para começar.</p>
      </div>

      <div className="flex flex-col gap-4">
        {/* Paciente */}
        <button
          onClick={() => handleSelect('paciente')}
          className={`group relative flex flex-col items-center text-center rounded-2xl border-2 p-6 pb-7 transition-all duration-300 focus:outline-none cursor-pointer ${
            role === 'paciente'
              ? 'border-primary bg-primary/[0.06] shadow-lg shadow-primary/10'
              : 'border-primary/15 bg-gradient-to-b from-primary/[0.03] to-transparent hover:border-primary/40 hover:shadow-lg hover:shadow-primary/8 hover:scale-[1.02]'
          }`}
        >
          {role === 'paciente' && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-primary flex items-center justify-center animate-check-bounce">
              <Check size={14} className="text-primary-foreground" />
            </div>
          )}

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, hsl(184 45% 42%), hsl(184 55% 32%))',
              boxShadow: '0 8px 24px hsla(184, 45%, 35%, 0.3)',
            }}
          >
            <Heart size={28} className="text-white" />
          </div>

          <h3 className="font-display font-700 text-foreground text-lg">
            Sou Paciente
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-[260px]">
            Quero fazer meu cadastro para ser atendido.
          </p>
        </button>

        {/* Profissional */}
        <button
          onClick={() => handleSelect('profissional')}
          className={`group relative flex flex-col items-center text-center rounded-2xl border-2 p-6 pb-7 transition-all duration-300 focus:outline-none cursor-pointer ${
            role === 'profissional'
              ? 'border-secondary bg-secondary/[0.06] shadow-lg shadow-secondary/10'
              : 'border-secondary/15 bg-gradient-to-b from-secondary/[0.03] to-transparent hover:border-secondary/40 hover:shadow-lg hover:shadow-secondary/8 hover:scale-[1.02]'
          }`}
        >
          {role === 'profissional' && (
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-secondary flex items-center justify-center animate-check-bounce">
              <Check size={14} className="text-secondary-foreground" />
            </div>
          )}

          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, hsl(30 70% 55%), hsl(30 65% 42%))',
              boxShadow: '0 8px 24px hsla(30, 65%, 45%, 0.3)',
            }}
          >
            <Stethoscope size={28} className="text-white" />
          </div>

          <h3 className="font-display font-700 text-foreground text-lg">
            Sou Profissional
          </h3>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed max-w-[260px]">
            Profissional de saúde, gestor ou aluno.
          </p>
        </button>
      </div>
    </div>
  );
};

export default StepProfile;
