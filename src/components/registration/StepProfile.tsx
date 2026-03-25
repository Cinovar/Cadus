import { User, Stethoscope, Check } from 'lucide-react';
import { useRegistrationStore } from '@/store/registrationStore';

interface Props {
  onNext: () => void;
}

const StepProfile = ({ onNext }: Props) => {
  const { role, setRole, setCurrentStep } = useRegistrationStore();

  const handleSelect = (selected: 'paciente' | 'profissional') => {
    setRole(selected);
  };

  const handleContinue = () => {
    if (role) {
      setCurrentStep(2);
      onNext();
    }
  };

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <h2 className="text-xl md:text-2xl font-display font-800 text-foreground tracking-tight">
          Você é paciente ou profissional?
        </h2>
        <p className="text-muted-foreground mt-2 font-body">Escolha uma opção para começar.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button
          onClick={() => handleSelect('paciente')}
          className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
            role === 'paciente'
              ? 'border-primary bg-accent shadow-md'
              : 'border-border hover:border-primary/40 hover:shadow-md bg-card'
          }`}
        >
          {role === 'paciente' && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-primary flex items-center justify-center animate-check-bounce">
              <Check size={14} className="text-primary-foreground" />
            </div>
          )}
          <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mb-4">
            <User size={28} className="text-primary" />
          </div>
          <h3 className="font-display font-700 text-foreground text-lg">Sou Paciente</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Quero fazer meu cadastro para ser atendido na clínica.
          </p>
        </button>

        <button
          onClick={() => handleSelect('profissional')}
          className={`group relative rounded-2xl border-2 p-6 text-left transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${
            role === 'profissional'
              ? 'border-secondary bg-secondary/10 shadow-md'
              : 'border-border hover:border-secondary/40 hover:shadow-md bg-card'
          }`}
        >
          {role === 'profissional' && (
            <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-secondary flex items-center justify-center animate-check-bounce">
              <Check size={14} className="text-secondary-foreground" />
            </div>
          )}
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
            <Stethoscope size={28} className="text-secondary" />
          </div>
          <h3 className="font-display font-700 text-foreground text-lg">Sou Profissional de Saúde</h3>
          <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
            Sou médico, fonoaudiólogo, fisioterapeuta ou outro profissional.
          </p>
        </button>
      </div>

      <button
        onClick={handleContinue}
        disabled={!role}
        className="btn-primary w-full mt-8"
      >
        Continuar
      </button>
    </div>
  );
};

export default StepProfile;
