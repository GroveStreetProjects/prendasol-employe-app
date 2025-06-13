import { createContext, useRef, useState } from 'react';
import { FormsInputs, fieldsByCategory } from '@/constants/forms/Forms';

interface FormSection {
  [key: string]: any;
}

type ValidationRule = {
  required?: boolean;
  type?: string;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  errorMessage?: string;
};

type FormDataType = {
  cliente: FormSection;
  articulo: FormSection;
  detalles: FormSection;
};

type FormSectionKey = 'cliente' | 'articulo' | 'detalles';

type FormContextType = {
  formData: FormDataType;
  validationErrors: { cliente: Record<string, string | null>, articulo: Record<string, string | null>, detalles: Record<string, string | null> };
  clientDocumentFile: File | null,
  articleImageFile: File | null,
  handleChange: (section: FormSectionKey, name: string, value: string | number, validationRules?: ValidationRule) => void;
  validateForm: () => boolean;
  handleBlurCi: () => Promise<void>;
  handleSubmit: () => Promise<void>;
  triggerClientDocumentSelect: () => void;
  triggerArticleImageSelect: () => void;
  clientDocumentInputRef: React.RefObject<HTMLInputElement>;
  articleImageInputRef: React.RefObject<HTMLInputElement>;
  handleClientDocumentChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleArticleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const FormContext = createContext<FormContextType | null>(null);

const FormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormDataType>({ cliente: {}, articulo: { tipo: '1', empleadoId: 1 }, detalles: {} });
  const [validationErrors, setValidationErrors] = useState({ cliente: {}, articulo: {}, detalles: {} });

  const clientDocumentInputRef = useRef<HTMLInputElement>(null);
  const articleImageInputRef = useRef<HTMLInputElement>(null);
  const [clientDocumentFile, setClientDocumentFile] = useState<File | null>(null);
  const [articleImageFile, setArticleImageFile] = useState<File | null>(null);

  const { fieldsArticle, fieldsClient } = FormsInputs;

  const validateInput = (value: string, rules: ValidationRule): string | null => {
    if (rules.required && !value.trim()) return 'Este campo es obligatorio';
    if (value) {
      if (rules.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo no válido';
      if (rules.type === 'phone' && !/^[0-9]{7,15}$/.test(value)) return 'Teléfono no válido';
      if (rules.type === 'numeric' && !/^[0-9]+(\.[0-9]{1,2})?$/.test(value)) return 'Número no válido';
      if (rules.minLength && value.length < rules.minLength) return `Mínimo ${rules.minLength} caracteres`;
      if (rules.maxLength && value.length > rules.maxLength) return `Máximo ${rules.maxLength} caracteres`;
      if (rules.pattern && !rules.pattern.test(value)) return rules.errorMessage || 'Formato inválido';
    }
    return null;
  };

  const handleChange = (
    section: FormSectionKey,
    name: string,
    value: string | number,
    validationRules?: ValidationRule
  ) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));

    if (validationRules) {
      const error = validateInput(String(value), validationRules);
      setValidationErrors(prev => ({
        ...prev,
        [section]: {
          ...prev[section],
          [name]: error
        }
      }));
    }

    if (section === 'articulo' && name === 'tipo') {
      setFormData(prev => ({ ...prev, detalles: {} }));
      setValidationErrors(prev => ({ ...prev, detalles: {} }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors = {
      cliente: {} as { [key: string]: string | null },
      articulo: {} as { [key: string]: string | null },
      detalles: {} as { [key: string]: string | null }
    };
    fieldsClient.forEach(field => {
      if (field.required || field.name in formData.cliente) {
        const value = formData.cliente[field.name] || '';
        newErrors.cliente[field.name] = validateInput(String(value), field);
      }
    });
    fieldsArticle.forEach(field => {
      if (field.required || field.name in formData.articulo) {
        const value = formData.articulo[field.name] || '';
        newErrors.articulo[field.name] = validateInput(String(value), field);
      }
    });

    const articleType = formData.articulo.tipo;
    const fieldsToValidate = fieldsByCategory[articleType as keyof typeof fieldsByCategory];

    fieldsToValidate.forEach(field => {
      if (field.required || field.name in formData.detalles) {
        const value = formData.detalles?.[field.name] || '';
        newErrors.detalles[field.name] = validateInput(String(value), field);
      }
    });

    setValidationErrors(newErrors);

    const hasClientErrors = Object.values(newErrors.cliente).some(error => error);
    const hasArticleErrors = Object.values(newErrors.articulo).some(error => error);
    const hasDetailsErrors = Object.values(newErrors.detalles).some(error => error);

    return !hasClientErrors && !hasDetailsErrors && !hasDetailsErrors;
  };

  const handleBlurCi = async () => {
    const ci = formData.cliente.CI;
    try {
      const response = await fetch(`http://127.0.0.1:3000/clientes/${ci}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(prev => ({
          ...prev,
          cliente: {
            ...prev.cliente,
            Id: data.Id,
            Nombres: data.Nombres,
            Paterno: data.Paterno,
            Materno: data.Materno,
          }
        }));
      }
    } catch (error) {
      console.error('Error al consultar CI:', error);
    }
  };

  const handleClientDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setClientDocumentFile(file);
      } else {
        window.alert('Por favor selecciona un archivo PDF.');
        setClientDocumentFile(null);
        if (clientDocumentInputRef.current) {
          clientDocumentInputRef.current.value = '';
        }
      }
    }
  };

  const handleArticleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.startsWith('image/')) {
        setArticleImageFile(file);
      } else {
        window.alert('Por favor selecciona un archivo de imagen.');
        setArticleImageFile(null);
        if (articleImageInputRef.current) {
          articleImageInputRef.current.value = '';
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.alert('Por favor, corrige los errores en el formulario');
      return;
    }

    const dataToSend = new FormData();

    console.log('Primero')


    Object.keys(formData.cliente).forEach(key => {
      if (key === 'Id' && !formData.cliente[key]) return;
      dataToSend.append(`cliente[${key}]`, String(formData.cliente[key]));
    });
    Object.keys(formData.articulo).forEach(key => {
      dataToSend.append(`articulo[${key}]`, String(formData.articulo[key]));
    });
    Object.keys(formData.detalles).forEach(key => {
      dataToSend.append(`detalles[${key}]`, String(formData.detalles?.[key]));
    });

    if (clientDocumentFile) {
      dataToSend.append('documentoCliente', clientDocumentFile, clientDocumentFile.name);
    } else {
      window.alert('Por favor, selecciona el documento PDF del cliente.');
      return;
    }

    if (articleImageFile) {
      dataToSend.append('imagenArticulo', articleImageFile, articleImageFile.name);
    } else {
      window.alert('Por favor, selecciona la imagen del artículo.');
      return;
    }

    for (const [key, value] of dataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }
    console.log('Segundo')
    try {
      const apiUrl = 'http://127.0.0.1:3000/registrar-empenio';

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        window.alert('Datos y archivos enviados correctamente');
        setFormData({ cliente: {}, articulo: {}, detalles: {} });
        setClientDocumentFile(null);
        setArticleImageFile(null);
        if (clientDocumentInputRef.current) clientDocumentInputRef.current.value = '';
        if (articleImageInputRef.current) articleImageInputRef.current.value = '';

      } else {
        let errorMessage = 'Error al enviar datos';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || `Error ${response.status}`;
        } catch (e) {
          errorMessage = `Error: ${response.status} ${response.statusText}`;
        }
        console.error('API Error:', response.status, errorMessage);
        window.alert('Error al enviar los datos');
      }
    } catch (error: any) {
      window.alert('Hubo un problema con la conexión al servidor.');
      console.error('Network/Fetch Error:', error);
    }
  };

  const triggerClientDocumentSelect = () => clientDocumentInputRef.current?.click();
  const triggerArticleImageSelect = () => articleImageInputRef.current?.click();

  return (
    <FormContext.Provider value={{
      formData,
      validationErrors,
      clientDocumentFile,
      articleImageFile,
      handleChange,
      validateForm,
      handleBlurCi,
      handleSubmit,
      triggerClientDocumentSelect,
      triggerArticleImageSelect,
      clientDocumentInputRef,
      articleImageInputRef,
      handleClientDocumentChange,
      handleArticleImageChange,
    }}>
      {children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };