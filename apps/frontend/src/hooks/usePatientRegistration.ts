import { useState } from "react";
import { validatePatientRegistration } from "@/lib/validation";
import { useRegistrationStore } from "@/store/registrationStore";

export const usePatientRegistration = () => {
  const { updatePatientData, patientData } = useRegistrationStore();
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFieldChange = (field: string, value: string) => {
    updatePatientData({ [field]: value } as any);
  };

  const validateStep = (fields: string[]) => {
    const dataToValidate = fields.reduce((acc, field) => {
      acc[field] = (patientData as any)[field] || "";
      return acc;
    }, {} as any);

    const validation = validatePatientRegistration(dataToValidate);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    setErrors({});
    return true;
  };

  const submitRegistration = async () => {
    const validation = validatePatientRegistration(patientData as any);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      return false;
    }

    setErrors({});
    setIsLoading(true);
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    console.log("Cadastro bem-sucedido:", patientData);
    return true;
  };

  return {
    patientData,
    errors,
    isLoading,
    handleFieldChange,
    validateStep,
    submitRegistration,
  };
};
