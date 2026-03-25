const Footer = () => (
  <footer className="bg-card border-t border-border py-8 mt-auto">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-display font-800 text-primary text-lg">cadus</span>
          <span className="text-sm text-muted-foreground">Seu cadastro. Sua saúde. Simples assim.</span>
        </div>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
          <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
        </div>
      </div>
      <p className="text-xs text-muted-foreground text-center mt-6">
        Desenvolvido para clínicas-escola da UFPE/NUTES
      </p>
    </div>
  </footer>
);

export default Footer;
