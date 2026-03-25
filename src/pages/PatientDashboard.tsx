import { useRegistrationStore } from '@/store/registrationStore';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Phone, CalendarDays, LogOut, MessageSquare, MapPin, CreditCard } from 'lucide-react';
import Footer from '@/components/Footer';

const PatientDashboard = () => {
  const navigate = useNavigate();
  const { patientData, reset } = useRegistrationStore();

  const handleLogout = () => {
    reset();
    navigate('/');
  };

  const nome = patientData.nome || 'Paciente';
  const firstName = nome.split(' ')[0];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <span className="font-display font-800 text-primary text-lg tracking-tight">cadus<span className="text-highlight">.</span></span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground font-body hidden sm:block">{nome}</span>
            <button onClick={handleLogout} className="btn-ghost text-sm py-1 px-3 text-muted-foreground">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-8 px-4">
        <div className="container max-w-2xl space-y-6">
          {/* Welcome */}
          <div className="hero-gradient rounded-2xl p-6 md:p-8 relative z-10">
            <h1 className="text-2xl font-display font-800 text-primary-foreground tracking-tight">
              Olá, {firstName}! 👋
            </h1>
            <p className="text-primary-foreground/80 mt-1 font-body">Seu cadastro está completo e atualizado.</p>
          </div>

          {/* My data */}
          <div className="card-cadus">
            <h2 className="font-display font-700 text-foreground text-lg mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <User size={18} className="text-primary" />
              </div>
              Meus dados
            </h2>
            <div className="space-y-0">
              <DataRow label="Nome" value={patientData.nome} />
              <DataRow label="CPF" value={patientData.cpf} />
              <DataRow label="Data de nascimento" value={patientData.dataNascimento} />
              <DataRow label="Sexo" value={patientData.sexo} />
              <DataRow label="Telefone" value={patientData.telefone} />
              <DataRow label="E-mail" value={patientData.email || 'Não informado'} />
              <DataRow label="Endereço" value={[patientData.rua, patientData.numero, patientData.bairro, patientData.cidade, patientData.estado].filter(Boolean).join(', ') || 'Não informado'} />
              <DataRow label="Cartão SUS" value={patientData.cartaoSus || 'Não informado'} />
            </div>
            <button className="btn-outline text-sm mt-4 w-full">Atualizar meus dados</button>
          </div>

          {/* Complaint */}
          <div className="card-cadus">
            <h2 className="font-display font-700 text-foreground text-lg mb-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <FileText size={18} className="text-primary" />
              </div>
              Minha queixa registrada
            </h2>
            <p className="text-foreground text-sm bg-muted rounded-xl p-4 leading-relaxed">{patientData.queixa || 'Nenhuma queixa registrada.'}</p>
            <p className="text-xs text-muted-foreground mt-2">Registrada em {new Date().toLocaleDateString('pt-BR')}</p>
            <button className="btn-outline text-sm mt-4 w-full">Atualizar queixa</button>
          </div>

          {/* Schedule */}
          <div className="card-cadus border-l-4 border-l-secondary">
            <h2 className="font-display font-700 text-foreground text-lg mb-2 flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center">
                <CalendarDays size={18} className="text-secondary" />
              </div>
              Agendar consulta
            </h2>
            <p className="text-sm text-muted-foreground mb-4">Para agendar sua consulta, entre em contato com a clínica:</p>
            <a href="https://wa.me/5581999999999" target="_blank" rel="noopener noreferrer" className="btn-secondary w-full">
              <MessageSquare size={18} /> Falar pelo WhatsApp
            </a>
            <p className="text-xs text-muted-foreground mt-3 text-center">ou acesse o sistema TI.Saúde</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const DataRow = ({ label, value }: { label: string; value?: string }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-3 border-b border-border last:border-0">
    <span className="font-body font-600 text-muted-foreground text-sm min-w-[140px]">{label}</span>
    <span className="text-foreground text-sm">{value || '—'}</span>
  </div>
);

export default PatientDashboard;
