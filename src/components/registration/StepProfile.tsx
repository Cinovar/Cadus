import { User, Briefcase, Check, ChevronRight } from 'lucide-react';
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
    <div className="card-cadus">
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você vai usar o <span className="text-primary">Cadus</span>?
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body text-[15px]">Escolha uma opção para começar.</p>
      </div>

      <div className="flex flex-col gap-3">
        {/* Paciente */}
        <button
          onClick={() => handleSelect('paciente')}
          className={`group relative flex items-center gap-4 rounded-2xl border-2 p-4 md:p-5 text-left transition-all duration-300 focus:outline-none ${
            role === 'paciente'
              ? 'border-primary bg-accent shadow-md'
              : 'border-border/50 hover:border-primary/40 hover:shadow-md bg-card'
          }`}
        >
          {/* Accent bar */}
          <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300 ${
            role === 'paciente' ? 'bg-primary opacity-100' : 'bg-primary/0 group-hover:bg-primary/30 opacity-0 group-hover:opacity-100'
          }`} />

          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{
            background: 'linear-gradient(145deg, hsl(184, 45%, 90%), hsl(184, 40%, 82%))',
            boxShadow: '0 4px 12px rgba(13, 92, 99, 0.12)'
          }}>
            <User size={22} className="text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-700 text-foreground text-base flex items-center gap-2">
              Sou Paciente <span className="text-lg">❤️</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
              Quero fazer meu cadastro para ser atendido.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            {role === 'paciente' ? (
              <div className="w-7 h-7 rounded-full bg-primary flex items-center justify-center animate-check-bounce">
                <Check size={14} className="text-primary-foreground" />
              </div>
            ) : (
              <ChevronRight size={18} className="text-muted-foreground/40 group-hover:text-primary group-hover:translate-x-1 transition-all duration-300" />
            )}
          </div>
        </button>

        {/* Profissional */}
        <button
          onClick={() => handleSelect('profissional')}
          className={`group relative flex items-center gap-4 rounded-2xl border-2 p-4 md:p-5 text-left transition-all duration-300 focus:outline-none ${
            role === 'profissional'
              ? 'border-secondary bg-secondary/10 shadow-md'
              : 'border-border/50 hover:border-secondary/40 hover:shadow-md bg-card'
          }`}
        >
          {/* Accent bar */}
          <div className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-full transition-all duration-300 ${
            role === 'profissional' ? 'bg-secondary opacity-100' : 'bg-secondary/0 group-hover:bg-secondary/30 opacity-0 group-hover:opacity-100'
          }`} />

          <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{
            background: 'linear-gradient(145deg, hsl(35, 65%, 93%), hsl(35, 55%, 85%))',
            boxShadow: '0 4px 12px rgba(217, 119, 6, 0.1)'
          }}>
            <Briefcase size={22} className="text-secondary" />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-display font-700 text-foreground text-base flex items-center gap-2">
              Sou Profissional <span className="text-lg">🩺</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
              Profissional de saúde, gestor ou aluno.
            </p>
          </div>

          <div className="shrink-0 flex items-center">
            {role === 'profissional' ? (
              <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center animate-check-bounce">
                <Check size={14} className="text-secondary-foreground" />
              </div>
            ) : (
              <ChevronRight size={18} className="text-muted-foreground/40 group-hover:text-secondary group-hover:translate-x-1 transition-all duration-300" />
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default StepProfile;
