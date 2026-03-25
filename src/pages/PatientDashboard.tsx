import { useRegistrationStore } from '@/store/registrationStore';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Phone, CalendarDays, LogOut, MessageSquare } from 'lucide-react';
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
      <nav className="sticky top-0 z-50 bg-card/90 backdrop-blur-sm border-b border-border">
        <div className="container flex items-center justify-between h-14">
          <span className="font-display font-800 text-primary text-lg tracking-tight">cadus<span className="text-highlight">.</span></span>
          <div className="flex items-center gap-3">
            <span className="text-sm text-foreground font-body hidden sm:block">{nome}</span>
            <button onClick={handleLogout} className="btn-ghost text-sm py-1 px-2 text-muted-foreground">
              <LogOut size={18} /> Sair
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 py-8 px-4">
        <div className="container max-w-2xl space-y-6">
          {/* Welcome */}
          <div className="card-cadus">
            <h1 className="text-2xl font-display font-800 text-foreground tracking-tight">
              Olá, {firstName}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">Seu cadastro está completo.</p>
          </div>

          {/* My data */}
          <div className="card-cadus">
            <h2 className="font-display font-700 text-foreground text-lg mb-4 flex items-center gap-2">
              <User size={20} className="text-primary" /> Meus dados
            </h2>
            <div className="space-y-3 text-sm">
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
              <FileText size={20} className="text-primary" /> Minha queixa registrada
            </h2>
            <p className="text-foreground text-sm bg-muted rounded-xl p-4">{patientData.queixa || 'Nenhuma queixa registrada.'}</p>
            <p className="text-xs text-muted-foreground mt-2">Registrada em {new Date().toLocaleDateString('pt-BR')}</p>
            <button className="btn-outline text-sm mt-4 w-full">Atualizar queixa</button>
          </div>

          {/* Schedule */}
          <div className="rounded-2xl bg-accent p-6">
            <h2 className="font-display font-700 text-foreground text-lg mb-2 flex items-center gap-2">
              <CalendarDays size={20} className="text-primary" /> Agendar consulta
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
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 py-2 border-b border-border last:border-0">
    <span className="font-body font-600 text-muted-foreground min-w-[140px]">{label}</span>
    <span className="text-foreground">{value || '—'}</span>
  </div>
);

export default PatientDashboard;
