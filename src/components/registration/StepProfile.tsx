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
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você vai usar o <span className="text-primary">Cadus</span>?
        </h2>
        <p className="text-muted-foreground/70 mt-2.5 font-body text-[15px]">Escolha uma opção para começar seu cadastro.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {/* Paciente */}
        <button
          onClick={() => handleSelect('paciente')}
          className={`group relative rounded-3xl border-2 p-6 text-center transition-all duration-300 focus:outline-none hover:scale-[1.02] ${
            role === 'paciente'
              ? 'border-primary bg-accent shadow-lg'
              : 'border-border/50 hover:border-primary/40 hover:shadow-lg bg-card'
          }`}
          style={{ minHeight: '210px' }}
        >
          {role === 'paciente' && (
            <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-primary flex items-center justify-center animate-check-bounce">
              <Check size={15} className="text-primary-foreground" />
            </div>
          )}
          <div className="icon-hero icon-hero-teal !mb-4 !mx-auto">
            <User size={32} className="text-primary" />
          </div>
          <h3 className="font-display font-700 text-foreground text-lg">Sou Paciente</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Quero fazer meu cadastro para ser atendido.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1 text-xs font-display font-600 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Começar <ChevronRight size={14} />
          </div>
        </button>

        {/* Profissional */}
        <button
          onClick={() => handleSelect('profissional')}
          className={`group relative rounded-3xl border-2 p-6 text-center transition-all duration-300 focus:outline-none hover:scale-[1.02] ${
            role === 'profissional'
              ? 'border-secondary bg-secondary/8 shadow-lg'
              : 'border-border/50 hover:border-secondary/40 hover:shadow-lg bg-card'
          }`}
          style={{ minHeight: '210px' }}
        >
          {role === 'profissional' && (
            <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-secondary flex items-center justify-center animate-check-bounce">
              <Check size={15} className="text-secondary-foreground" />
            </div>
          )}
          <div className="icon-hero icon-hero-amber !mb-4 !mx-auto">
            <Briefcase size={32} className="text-secondary" />
          </div>
          <h3 className="font-display font-700 text-foreground text-lg">Sou Profissional</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Profissional de saúde, gestor ou aluno.
          </p>
          <div className="mt-4 flex items-center justify-center gap-1 text-xs font-display font-600 text-secondary opacity-0 group-hover:opacity-100 transition-opacity">
            Começar <ChevronRight size={14} />
          </div>
        </button>
      </div>
    </div>
  );
};

export default StepProfile;
