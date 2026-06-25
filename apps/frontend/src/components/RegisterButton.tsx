import { useRegistrationStore } from "@/store/registrationStore";
import { Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";

interface Props {
  onValidate: () => boolean;
  onNext: () => void;
  emailProp: string;
  senhaProp: string;
}

const RegisterButton = ({ onValidate, onNext, emailProp, senhaProp }: Props) => {
  const { role, updatePatientData, completeRegistration } = useRegistrationStore();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!onValidate()) return;
    if (role === "paciente")
      updatePatientData({
        email: emailProp,
        senha: senhaProp,
      });

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    completeRegistration();
    setLoading(false);
    onNext();
  };

  return (
    <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-4 md:mt-8 group">
      {loading ? (<><Loader2 size={18} className="animate-spin" /> Criando seu cadastro...</>
      ) : (<><ShieldCheck size={18} /> Criar minha conta</>)}
    </button>
  );
};

export default RegisterButton;
