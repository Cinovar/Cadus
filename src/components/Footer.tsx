import { Plus, Shield, Lock, FileCheck } from 'lucide-react';

const Footer = () => (
  <footer className="bg-card mt-auto">
    {/* Conteúdo principal */}
    <div className="border-t border-border pt-14 pb-10">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-8">
          {/* Coluna 1 — Marca */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-display font-800 text-primary text-xl tracking-tight">
              cadus<span className="text-secondary">.</span>
            </span>
            <span className="text-sm text-muted-foreground leading-relaxed">
              Seu cadastro. Sua saúde.
              <br />
              Simples assim.
            </span>
            <span className="text-xs text-muted-foreground/70 mt-3">
              Desenvolvido pelo CIn — UFPE
            </span>
          </div>

          {/* Coluna 2 — Informações */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-display font-700 text-xs text-foreground tracking-[0.15em] uppercase mb-1">
              Informações
            </span>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Política de Privacidade
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Termos de Uso
            </a>
          </div>

          {/* Coluna 3 — Clínicas */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-display font-700 text-xs text-foreground tracking-[0.15em] uppercase mb-1">
              Clínicas
            </span>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Clínicas Parceiras
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Fale com as Clínicas
            </a>
          </div>

          {/* Coluna 4 — Para Clínicas */}
          <div className="flex flex-col items-center md:items-start gap-3">
            <span className="font-display font-700 text-xs text-foreground tracking-[0.15em] uppercase mb-1">
              Para Clínicas
            </span>
            <a
              href="#"
              className="inline-flex items-center gap-1.5 text-sm text-primary font-600 hover:text-primary/80 transition-colors"
            >
              <Plus size={15} />
              Adicionar nova Clínica
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* Barra inferior */}
    <div className="border-t border-border py-5">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Badges de confiança */}
        <div className="flex items-center gap-6">
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Shield size={14} className="text-primary" />
            Cadastro seguro
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <Lock size={14} className="text-primary" />
            Dados protegidos
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <FileCheck size={14} className="text-primary" />
            LGPD
          </span>
        </div>

        {/* Copyright */}
        <span className="text-xs text-muted-foreground/60">
          © 2026 cadus. Todos os direitos reservados.
        </span>
      </div>
    </div>
  </footer>
);

export default Footer;
