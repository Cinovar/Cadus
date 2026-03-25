import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { Lock, ArrowLeft, Check, Eye, EyeOff, Loader2, ShieldCheck } from 'lucide-react';

interface Props { onNext: () => void; onBack: () => void; }

const StepProfAccess = ({ onNext, onBack }: Props) => {
  const { professionalData, updateProfessionalData, completeRegistration } = useRegistrationStore();
  const [confirmSenha, setConfirmSenha] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const senha = professionalData.senha || '';
  const hasMin8 = senha.length >= 8;
  const hasUpper = /[A-Z]/.test(senha);
  const hasNumber = /\d/.test(senha);
  const passMatch = senha === confirmSenha && senha.length > 0;
  const strength = [hasMin8, hasUpper, hasNumber].filter(Boolean).length;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!hasMin8 || !hasUpper || !hasNumber) e.senha = 'A senha não atende aos requisitos.';
    if (!passMatch) e.confirm = 'As senhas não coincidem.';
    if (!accepted) e.terms = 'Você precisa aceitar os termos.';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    completeRegistration();
    setLoading(false);
    onNext();
  };

  const strengthLabel = strength === 0 ? '' : strength === 1 ? 'Fraca' : strength === 2 ? 'Média' : 'Forte';
  const strengthColor = strength === 1 ? 'text-destructive' : strength === 2 ? 'text-amber-500' : strength === 3 ? 'text-emerald-600' : '';

  return (
    <div className="card-cadus">
      <div className="text-center mb-8">
        <div className="icon-hero icon-hero-teal">
          <Lock size={32} className="text-primary" />
        </div>
        <h2 className="text-2xl md:text-3xl font-display font-800 text-foreground tracking-tight">
          Crie seu acesso
        </h2>
        <p className="text-muted-foreground/70 mt-2 font-body">Você vai usar esses dados para entrar.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="label-cadus">CPF (seu login)</label>
          <input className="input-cadus bg-muted/30" value={professionalData.cpf || ''} readOnly />
        </div>
        <div>
          <label className="label-cadus">Crie uma senha *</label>
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} className="input-cadus pr-12" value={senha} onChange={(e) => updateProfessionalData({ senha: e.target.value })} placeholder="Sua senha" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {senha.length > 0 && (
            <div className="mt-3 animate-in fade-in duration-200">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex gap-1.5 flex-1">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-1.5 flex-1 rounded-full transition-all duration-500"
                      style={{
                        background: strength >= i
                          ? i === 1 ? 'hsl(0, 72%, 51%)' : i === 2 ? 'hsl(40, 90%, 50%)' : 'hsl(160, 60%, 40%)'
                          : 'hsl(220, 13%, 91%)'
                      }}
                    />
                  ))}
                </div>
                {strengthLabel && (
                  <span className={`text-xs font-display font-600 ${strengthColor}`}>{strengthLabel}</span>
                )}
              </div>
              <div className="space-y-1.5">
                {[
                  { ok: hasMin8, text: 'Pelo menos 8 caracteres' },
                  { ok: hasUpper, text: 'Uma letra maiúscula' },
                  { ok: hasNumber, text: 'Um número' },
                ].map((req, i) => (
                  <div key={i} className={`flex items-center gap-2 text-xs font-body transition-colors ${req.ok ? 'text-primary' : 'text-muted-foreground/40'}`}>
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center transition-all ${req.ok ? 'bg-primary' : 'bg-muted'}`}>
                      <Check size={10} className={req.ok ? 'text-primary-foreground' : 'text-muted-foreground/30'} />
                    </div>
                    {req.text}
                  </div>
                ))}
              </div>
            </div>
          )}
          {errors.senha && <p className="error-text">{errors.senha}</p>}
        </div>
        <div>
          <label className="label-cadus">Repita a senha *</label>
          <input type={showPass ? 'text' : 'password'} className="input-cadus" value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} placeholder="Confirme sua senha" />
          {errors.confirm && <p className="error-text">{errors.confirm}</p>}
        </div>

        {/* Terms toggle card */}
        <button
          type="button"
          onClick={() => setAccepted(!accepted)}
          className={`w-full text-left rounded-2xl border-2 p-4 flex items-start gap-3 transition-all duration-300 ${
            accepted
              ? 'border-primary bg-accent'
              : 'border-border/60 bg-card hover:border-primary/30'
          }`}
        >
          <div className={`w-5 h-5 rounded-md flex-shrink-0 mt-0.5 flex items-center justify-center transition-all ${
            accepted ? 'bg-primary' : 'border-2 border-border'
          }`}>
            {accepted && <Check size={12} className="text-primary-foreground" />}
          </div>
          <span className="text-sm text-muted-foreground leading-relaxed font-body">
            Li e aceito os <a href="#" className="text-primary underline" onClick={(e) => e.stopPropagation()}>Termos de Uso</a> e a <a href="#" className="text-primary underline" onClick={(e) => e.stopPropagation()}>Política de Privacidade</a>
          </span>
        </button>
        {errors.terms && <p className="error-text">{errors.terms}</p>}
      </div>

      <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-8 group">
        {loading ? (
          <><Loader2 size={18} className="animate-spin" /> Enviando...</>
        ) : (
          <><ShieldCheck size={18} /> Finalizar cadastro</>
        )}
      </button>

      <button onClick={onBack} disabled={loading} className="btn-back">
        <ArrowLeft size={16} /> Voltar
      </button>
    </div>
  );
};

export default StepProfAccess;
