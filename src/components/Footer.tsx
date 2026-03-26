import { Plus, Shield, Lock, FileCheck } from 'lucide-react';

const Footer = () => (
  <footer className="bg-card mt-auto">
    {/* Conteúdo principal */}
    <div className="border-t border-border pt-8 pb-6 md:pt-14 md:pb-10">
      <div className="container">
        <div className="flex flex-col gap-8 md:grid md:grid-cols-4 md:gap-8">
          {/* Marca — always centered on mobile */}
          <div className="flex flex-col items-center md:items-start gap-2 text-center md:text-left">
            <span className="font-display font-800 text-primary text-lg md:text-xl tracking-tight">
              cadus<span className="text-secondary">.</span>
            </span>
            <span className="text-[13px] md:text-sm text-muted-foreground leading-relaxed">
              Seu cadastro. Sua saúde.
              <br />
              Simples assim.
            </span>
            <span className="text-[11px] md:text-xs text-muted-foreground/70 mt-1">
              Desenvolvido pelo CIn — UFPE
            </span>
          </div>

          {/* Links — Dinova style: clean list */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <span className="font-display font-700 text-[11px] md:text-xs text-foreground tracking-[0.15em] uppercase mb-0.5">
              Informações
            </span>
            <a href="#" className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[44px] md:min-h-0 flex items-center">
              Política de Privacidade
            </a>
            <a href="#" className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[44px] md:min-h-0 flex items-center">
              Termos de Uso
            </a>
          </div>

          {/* Clínicas */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <span className="font-display font-700 text-[11px] md:text-xs text-foreground tracking-[0.15em] uppercase mb-0.5">
              Clínicas
            </span>
            <a href="#" className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[44px] md:min-h-0 flex items-center">
              Clínicas Parceiras
            </a>
            <a href="#" className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[44px] md:min-h-0 flex items-center">
              Fale com as Clínicas
            </a>
          </div>

          {/* Para Clínicas */}
          <div className="flex flex-col items-center md:items-start gap-2.5">
            <span className="font-display font-700 text-[11px] md:text-xs text-foreground tracking-[0.15em] uppercase mb-0.5">
              Para Clínicas
            </span>
            <a href="#" className="inline-flex items-center gap-2 text-[13px] md:text-sm text-primary font-semibold hover:text-primary/80 transition-colors py-1.5 min-h-[44px] md:min-h-0">
              <Plus size={15} className="shrink-0" />
              Adicionar nova Clínica
            </a>
            <a href="#" className="text-[13px] md:text-sm text-muted-foreground hover:text-foreground transition-colors py-1.5 min-h-[44px] md:min-h-0 flex items-center">
              Área da Clínica
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Barra inferior — simplified */}
    <div className="border-t border-border py-4 md:py-5">
      <div className="container flex flex-col items-center gap-3 md:flex-row md:justify-between">
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground">
            <Shield size={14} className="text-primary" />
            Seguro
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground">
            <Lock size={14} className="text-primary" />
            Protegido
          </span>
          <span className="inline-flex items-center gap-1.5 text-[11px] md:text-xs text-muted-foreground">
            <FileCheck size={14} className="text-primary" />
            LGPD
          </span>
        </div>
        <span className="text-[11px] md:text-xs text-muted-foreground/60">
          © 2026 cadus. Todos os direitos reservados.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;