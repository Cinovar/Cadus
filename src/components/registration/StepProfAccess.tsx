import { useState } from 'react';
import { useRegistrationStore } from '@/store/registrationStore';
import { ArrowLeft, Check, Eye, EyeOff, Loader2 } from 'lucide-react';

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

  return (
    <div className="card-cadus">
      <h2 className="text-xl font-display font-800 text-foreground">Crie seu acesso ao Cadus.</h2>
      <p className="text-muted-foreground text-sm mt-1 mb-6">Você vai usar esses dados para entrar.</p>

      <div className="space-y-4">
        <div>
          <label className="label-cadus">CPF (seu login)</label>
          <input className="input-cadus bg-muted" value={professionalData.cpf || ''} readOnly />
        </div>
        <div>
          <label className="label-cadus">Crie uma senha *</label>
          <div className="relative">
            <input type={showPass ? 'text' : 'password'} className="input-cadus pr-12" value={senha} onChange={(e) => updateProfessionalData({ senha: e.target.value })} placeholder="Sua senha" />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {[{ ok: hasMin8, text: 'Pelo menos 8 caracteres' }, { ok: hasUpper, text: 'Uma letra maiúscula' }, { ok: hasNumber, text: 'Um número' }].map((req, i) => (
              <div key={i} className={`flex items-center gap-2 text-sm ${req.ok ? 'text-success' : 'text-muted-foreground'}`}><Check size={14} /> {req.text}</div>
            ))}
          </div>
          {errors.senha && <p className="error-text">{errors.senha}</p>}
        </div>
        <div>
          <label className="label-cadus">Repita a senha *</label>
          <input type={showPass ? 'text' : 'password'} className="input-cadus" value={confirmSenha} onChange={(e) => setConfirmSenha(e.target.value)} placeholder="Confirme" />
          {errors.confirm && <p className="error-text">{errors.confirm}</p>}
        </div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 w-5 h-5 rounded" />
          <span className="text-sm text-foreground">Li e aceito os <a href="#" className="text-primary underline">Termos de Uso</a> e a <a href="#" className="text-primary underline">Política de Privacidade</a></span>
        </label>
        {errors.terms && <p className="error-text">{errors.terms}</p>}
      </div>

      <div className="flex gap-3 mt-8">
        <button onClick={onBack} className="btn-outline flex-1" disabled={loading}><ArrowLeft size={18} /> Voltar</button>
        <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1">
          {loading ? <><Loader2 size={18} className="animate-spin" /> Enviando...</> : <><Check size={18} /> Finalizar cadastro</>}
        </button>
      </div>
    </div>
  );
};

export default StepProfAccess;
