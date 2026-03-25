import { Plus } from 'lucide-react';

const Footer = () => (
  <footer className="bg-card border-t border-border py-12 mt-auto">
    <div className="container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Coluna 1 — Marca */}
        <div className="flex flex-col items-center md:items-start gap-1.5">
          <span className="font-display font-800 text-primary text-lg tracking-tight">
            cadus<span className="text-secondary">.</span>
          </span>
          <span className="text-sm text-muted-foreground">
            Seu cadastro. Sua saúde. Simples assim.
          </span>
          <span className="text-xs text-muted-foreground mt-2">
            Desenvolvido pelo CIn — UFPE
          </span>
        </div>

        {/* Coluna 2 — Informações */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display font-700 text-sm text-foreground mb-1">Informações</span>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Política de Privacidade
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Termos de Uso
          </a>
          <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
            Clínicas Parceiras
          </a>
        </div>

        {/* Coluna 3 — Para Clínicas */}
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-display font-700 text-sm text-foreground mb-1">Para Clínicas</span>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm text-primary font-600 hover:text-primary/80 transition-colors mt-1"
          >
            <Plus size={15} />
            Adicionar nova Clínica
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
