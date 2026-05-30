import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegistrationStore, mockPatients } from '@/store/registrationStore';
import { LogOut, Search, User, LayoutDashboard, UserCircle, X, FileText, CalendarDays, ChevronRight } from 'lucide-react';
import Footer from '@/components/Footer';

const ProfessionalDashboard = () => {
  const navigate = useNavigate();
  const { professionalData, reset } = useRegistrationStore();
  const [search, setSearch] = useState('');
  const [selectedPatient, setSelectedPatient] = useState<typeof mockPatients[0] | null>(null);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'patients' | 'profile'>('patients');

  const handleLogout = () => { reset(); navigate('/'); };

  const nome = professionalData.nome || 'Profissional';
  const filtered = mockPatients.filter(
    (p) => p.nome.toLowerCase().includes(search.toLowerCase()) || p.cpfMasked.includes(search)
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container flex items-center justify-between h-12 md:h-14">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="font-display font-800 text-primary text-lg tracking-tight">cadus<span className="text-highlight">.</span></span>
            <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-body font-600">Profissional</span>
          </div>
          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:block text-right">
              <p className="text-[13px] md:text-sm font-body font-600 text-foreground">{nome}</p>
              <p className="text-[11px] md:text-xs text-muted-foreground">{professionalData.especialidade || 'Profissional'}</p>
            </div>
            <button onClick={handleLogout} className="btn-ghost text-sm py-1 px-2 md:px-3 text-muted-foreground min-h-[44px] min-w-[44px]"><LogOut size={18} /></button>
          </div>
        </div>
      </nav>

      <div className="flex-1 flex">
        {/* Sidebar desktop */}
        <aside className="hidden md:flex flex-col w-56 bg-card border-r border-border p-4 gap-1">
          {[
            { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'patients' as const, icon: User, label: 'Pacientes' },
            { id: 'profile' as const, icon: UserCircle, label: 'Meu perfil' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-body transition-all duration-200 ${
                activeTab === item.id ? 'bg-primary text-primary-foreground font-600 shadow-sm' : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <item.icon size={18} /> {item.label}
            </button>
          ))}
        </aside>

        {/* Main content */}
        <main className="flex-1 py-4 px-3 md:py-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h1 className="text-lg md:text-2xl font-display font-800 text-foreground tracking-tight">Pacientes cadastrados</h1>
                <p className="text-[13px] md:text-sm text-muted-foreground mt-0.5 md:mt-1 font-body">{professionalData.clinica || 'Clínica de Fonoaudiologia UFPE'}</p>
              </div>
              <span className="inline-flex items-center px-2.5 md:px-3 py-1 rounded-full bg-accent text-primary text-[13px] md:text-sm font-body font-600 shrink-0">
                {mockPatients.length} pacientes
              </span>
            </div>

            {/* Search */}
            <div className="relative mt-4 md:mt-6 mb-4 md:mb-6">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                className="input-cadus pl-11"
                placeholder="Buscar por nome ou CPF..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Patient list */}
            <div className="space-y-2.5 md:space-y-3">
              {filtered.map((patient) => (
                <div key={patient.id} className="card-cadus-hover p-3.5 md:p-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 md:gap-3">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center shrink-0 mt-0.5">
                        <User size={18} className="text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display font-700 text-foreground text-[15px] md:text-base">{patient.nome}</h3>
                        <p className="text-[12px] md:text-sm text-muted-foreground">CPF: {patient.cpfMasked} · {patient.dataCadastro}</p>
                        <p className="text-[13px] md:text-sm text-foreground mt-0.5 md:mt-1 line-clamp-1">{patient.queixa}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setSelectedPatient(patient)}
                      className="btn-outline text-[13px] md:text-sm py-2 px-4 shrink-0 min-h-[44px] w-full sm:w-auto"
                    >
                      Ver perfil <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="text-center text-muted-foreground py-8 font-body text-[13px] md:text-base">Nenhum paciente encontrado.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Bottom nav mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-around py-1.5 z-50 safe-area-bottom">
        {[
          { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
          { id: 'patients' as const, icon: User, label: 'Pacientes' },
          { id: 'profile' as const, icon: UserCircle, label: 'Perfil' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-0.5 text-[11px] py-1.5 px-4 transition-colors min-h-[48px] justify-center ${
              activeTab === item.id ? 'text-primary font-600' : 'text-muted-foreground'
            }`}
          >
            <item.icon size={20} /> {item.label}
          </button>
        ))}
      </div>

      {/* Patient detail modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-[60] bg-foreground/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4" onClick={() => setSelectedPatient(null)}>
          <div className="bg-card rounded-t-2xl sm:rounded-2xl w-full sm:max-w-lg max-h-[85vh] overflow-y-auto p-5 md:p-6" onClick={(e) => e.stopPropagation()} style={{ boxShadow: 'var(--shadow-card-hover)' }}>
            <div className="flex items-center justify-between mb-4 md:mb-6">
              <h2 className="text-lg md:text-xl font-display font-800 text-foreground tracking-tight">Perfil do paciente</h2>
              <button onClick={() => setSelectedPatient(null)} className="p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-xl hover:bg-muted transition-colors"><X size={20} /></button>
            </div>

            <div className="space-y-4 md:space-y-5">
              <Section icon={<User size={18} className="text-primary" />} title="Dados pessoais">
                <DRow label="Nome" value={selectedPatient.nome} />
                <DRow label="CPF" value={selectedPatient.cpf} />
                <DRow label="Nascimento" value={selectedPatient.dataNascimento} />
                <DRow label="Gênero" value={selectedPatient.sexo} />
                <DRow label="Telefone" value={selectedPatient.telefone} />
                <DRow label="E-mail" value={selectedPatient.email || 'Não informado'} />
              </Section>

              <Section icon={<LayoutDashboard size={18} className="text-primary" />} title="Endereço e SUS">
                <DRow label="Bairro" value={selectedPatient.bairro} />
                <DRow label="Cidade" value={`${selectedPatient.cidade} - ${selectedPatient.estado}`} />
                <DRow label="Cartão SUS" value={selectedPatient.cartaoSus || 'Não informado'} />
                <DRow label="Encaminhamento" value={selectedPatient.comoChegou} />
              </Section>

              <Section icon={<FileText size={18} className="text-primary" />} title="Queixa principal">
                <p className="text-[13px] md:text-sm text-foreground bg-muted rounded-xl p-3.5 md:p-4 leading-relaxed">{selectedPatient.queixa}</p>
              </Section>

              <div className="flex items-center gap-2 text-[11px] md:text-xs text-muted-foreground pt-2">
                <CalendarDays size={14} />
                Última atualização: {selectedPatient.ultimaAtualizacao}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="md:hidden h-16" />
      <div className="hidden md:block"><Footer /></div>
    </div>
  );
};

const Section = ({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) => (
  <div>
    <h3 className="font-display font-700 text-foreground text-[15px] md:text-base flex items-center gap-2 mb-2.5 md:mb-3">{icon} {title}</h3>
    <div className="space-y-0">{children}</div>
  </div>
);

const DRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-[13px] md:text-sm py-2 md:py-2.5 border-b border-border last:border-0">
    <span className="text-muted-foreground">{label}</span>
    <span className="text-foreground font-500">{value}</span>
  </div>
);

export default ProfessionalDashboard;
