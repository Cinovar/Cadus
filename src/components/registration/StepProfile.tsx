import { User, Briefcase, Check, Users } from 'lucide-react';
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
        <div className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6" style={{
          background: 'linear-gradient(145deg, hsl(184, 40%, 92%), hsl(184, 40%, 88%))',
          boxShadow: '0 8px 24px rgba(13, 92, 99, 0.12)'
        }}>
          <Users size={36} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Como você vai usar o Cadus?
        </h2>
        <p className="text-muted-foreground/80 mt-2.5 font-body">Escolha uma opção para começar.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <button
          onClick={() => handleSelect('paciente')}
          className={`group relative rounded-3xl border-2 p-7 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-[1.02] ${
            role === 'paciente'
              ? 'border-primary bg-accent shadow-lg'
              : 'border-border/60 hover:border-primary/30 hover:shadow-lg bg-card'
          }`}
          style={{ minHeight: '180px' }}
        >
          {role === 'paciente' && (
            <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-primary flex items-center justify-center animate-check-bounce">
              <Check size={15} className="text-primary-foreground" />
            </div>
          )}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{
            background: 'linear-gradient(145deg, hsl(184, 40%, 93%), hsl(184, 40%, 88%))'
          }}>
            <User size={30} className="text-primary" />
          </div>
          <h3 className="font-display font-700 text-foreground text-lg">Sou Paciente</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Quero fazer meu cadastro para ser atendido.
          </p>
        </button>

        <button
          onClick={() => handleSelect('profissional')}
          className={`group relative rounded-3xl border-2 p-7 text-center transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:scale-[1.02] ${
            role === 'profissional'
              ? 'border-secondary bg-secondary/10 shadow-lg'
              : 'border-border/60 hover:border-secondary/30 hover:shadow-lg bg-card'
          }`}
          style={{ minHeight: '180px' }}
        >
          {role === 'profissional' && (
            <div className="absolute top-3.5 right-3.5 w-7 h-7 rounded-full bg-secondary flex items-center justify-center animate-check-bounce">
              <Check size={15} className="text-secondary-foreground" />
            </div>
          )}
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{
            background: 'linear-gradient(145deg, hsl(25, 76%, 96%), hsl(25, 76%, 90%))'
          }}>
            <Briefcase size={30} className="text-secondary" />
          </div>
          <h3 className="font-display font-700 text-foreground text-lg">Sou Profissional</h3>
          <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
            Profissional de saúde, gestor ou aluno.
          </p>
        </button>
      </div>
    </div>
  );
};

export default StepProfile;
