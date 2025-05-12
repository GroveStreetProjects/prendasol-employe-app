import { useRef, useState } from 'react';
import { TextInput, ScrollView, KeyboardType, TouchableOpacity } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown';

import ThemedView from '@/components/shared/ThemedView';
import ThemedText from '@/components/shared/ThemedText';

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

const RegistrarEmpenio = () => {

  const [formData, setFormData] = useState<{
    cliente: FormSection;
    articulo: FormSection;
  }>({
    cliente: {},
    articulo: {},
  });

  const [clientDocumentFile, setClientDocumentFile] = useState<File | null>(null);
  const [articleImageFile, setArticleImageFile] = useState<File | null>(null);

  const clientDocumentInputRef = useRef<HTMLInputElement>(null);
  const articleImageInputRef = useRef<HTMLInputElement>(null);

  const fieldsClient = [
    {
      label: 'Id',
      name: 'Id',
      placeholder: '',
      type: 'numeric',
      required: false,
    },
    {
      label: 'Cédula de Identidad',
      name: 'CI',
      placeholder: '1234567...',
      type: 'text',
      required: true,
      minLength: 7,
      maxLength: 12,
      pattern: /^[0-9,-]+$/,
      errorMessage: 'Solo números permitidos'
    },
    {
      label: 'Nombres',
      name: 'Nombres',
      placeholder: 'Juan Fernando...',
      type: 'text',
      required: true,
      minLength: 2,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Apellido Paterno',
      name: 'Paterno',
      placeholder: 'Pérez...',
      type: 'text',
      required: true,
      minLength: 2,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Apellido Materno',
      name: 'Materno',
      placeholder: 'Martínez...',
      type: 'text',
      required: false,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
      errorMessage: 'Solo letras permitidas'
    },
    {
      label: 'Correo Electrónico',
      name: 'Correo',
      placeholder: 'correo@correo.com...',
      type: 'email',
      required: true
    },
    {
      label: 'Celular',
      name: 'Telefono',
      placeholder: '70123456...',
      type: 'phone',
      required: true,
      minLength: 7,
      maxLength: 15
    },
  ];

  const fieldsArticle = [
    {
      label: 'Nombre',
      name: 'Nombre',
      placeholder: 'Anillo de oro...',
      type: 'text',
      required: true,
      minLength: 5
    },
    {
      label: 'Descripción',
      name: 'Descripcion',
      placeholder: 'Anillo de oro de 18k...',
      type: 'text',
      required: true,
      minLength: 15
    },
    {
      label: 'Precio de Empeño',
      name: 'Precio_Empeno',
      placeholder: '800.00...',
      type: 'numeric',
      required: true,
      pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
      errorMessage: 'Formato inválido (ej. 800.00)'
    },
  ];

  const fieldsJewes = [
    {
      label: 'Material',
      name: 'Material',
      placeholder: 'Dropdown',
      type: 'text',
      required: true,
      minLength: 5
    },
    {
      label: 'Tipo',
      name: 'Tipo',
      placeholder: 'Dropdown',
      type: 'numeric',
      required: true,
    },
    {
      label: 'Kilataje',
      name: 'Ancho',
      placeholder: '32...',
      type: 'numeric',
      required: true,
    },
    {
      label: 'Peso (en gramos)',
      name: 'Peso',
      placeholder: '87.2...',
      type: 'numeric',
      required: true,
    },
  ];

  const [validationErrors, setValidationErrors] = useState<{
    cliente: { [key: string]: string | null };
    articulo: { [key: string]: string | null };
  }>({
    cliente: {},
    articulo: {}
  });

  const validateInput = (value: string, rules: ValidationRule): string | null => {
    if (rules.required && !value.trim()) {
      return 'Este campo es obligatorio';
    }

    if (value) {
      if (rules.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        return 'Ingrese un correo electrónico válido';
      }

      if (rules.type === 'phone' && !/^[0-9]{7,15}$/.test(value)) {
        return 'Ingrese un número de teléfono válido (solo números)';
      }

      if (rules.type === 'numeric' && !/^[0-9]+(\.[0-9]{1,2})?$/.test(value)) {
        return 'Ingrese un número válido';
      }

      if (rules.minLength && value.length < rules.minLength) {
        return `Mínimo ${rules.minLength} caracteres`;
      }

      if (rules.maxLength && value.length > rules.maxLength) {
        return `Máximo ${rules.maxLength} caracteres`;
      }

      if (rules.pattern && !rules.pattern.test(value)) {
        return rules.errorMessage || 'Formato inválido';
      }
    }

    return null;
  };

  const handleInputChangeWithValidation = (
    section: 'cliente' | 'articulo',
    name: string,
    value: string | number,
    validationRules: ValidationRule
  ) => {
    handleInputChange(section, name, value);
    const error = validateInput(String(value), validationRules);
    setValidationErrors(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: error
      }
    }));
  };

  const handleInputChange = (
    section: 'cliente' | 'articulo',
    name: string,
    value: string | number
  ) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [name]: value
      }
    });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      cliente: {} as { [key: string]: string | null },
      articulo: {} as { [key: string]: string | null }
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

    setValidationErrors(newErrors);

    const hasClientErrors = Object.values(newErrors.cliente).some(error => error);
    const hasArticleErrors = Object.values(newErrors.articulo).some(error => error);

    return !hasClientErrors && !hasArticleErrors;
  };

  const handleBlurCi = async () => {
    const ci = formData.cliente.CI;
    try {
      const response = await fetch(`http://127.0.0.1:3000/clientes/${ci}`);

      if (response.ok) {
        const data = await response.json();
        setFormData({
          ...formData,
          cliente: {
            ...formData.cliente,
            Id: data.Id,
            Nombres: data.Nombres,
            Paterno: data.Paterno,
            Materno: data.Materno,
          }
        })
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

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

  const triggerClientDocumentSelect = () => {
    clientDocumentInputRef.current?.click();
  };

  const triggerArticleImageSelect = () => {
    articleImageInputRef.current?.click();
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      window.alert('Por favor, corrige los errores en el formulario');
      return;
    }
    const dataToSend = new FormData();

    Object.keys(formData.cliente).forEach(key => {
      if (key === 'Id' && !formData.cliente[key]) return;
      dataToSend.append(`cliente[${key}]`, String(formData.cliente[key]));
    });
    Object.keys(formData.articulo).forEach(key => {
      dataToSend.append(`articulo[${key}]`, String(formData.articulo[key]));
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
        setFormData({ cliente: {}, articulo: {} });
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

  return (
    <ThemedView className='flex-1 bg-light-background rounded-tl-3xl'>
      <ThemedText type='semi-bold' className="text-center py-4">Registrar Empeño</ThemedText>
      <ScrollView className='flex flex-1 p-6 mx-[50] bg-white rounded-3xl items-center'>

        <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Cliente</ThemedText>
        <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
          {
            fieldsClient.map((item, index) => {
              if (index === 0) return;
              const error = validationErrors.cliente[item.name];
              return (
                <ThemedView className='w-[250]' key={item.name}>
                  <ThemedText>
                    {item.label}
                    {item.required ? ' *' : null}
                  </ThemedText>
                  <TextInput
                    onBlur={index === 1 ? handleBlurCi : undefined}
                    className={`border rounded-xl p-2 ${error ? 'border-red-500' : 'border-gray-300'} ${(formData.cliente[item.name] == undefined || formData.cliente[item.name] == '') ? 'text-gray-400' : ''}`}
                    placeholder={item.placeholder}
                    value={formData.cliente[item.name] || ''}
                    onChangeText={(text) => handleInputChangeWithValidation('cliente', item.name, text, item)}
                    keyboardType={item.type as KeyboardType}
                    textContentType={item.type === 'email' ? 'emailAddress' : 'none'}
                  />
                  {error && <ThemedText className="text-red-500 text-xs">{error}</ThemedText>}
                </ThemedView>
              );
            })
          }
          <input
            type="file"
            ref={clientDocumentInputRef}
            onChange={handleClientDocumentChange}
            style={{ display: 'none' }}
            accept="application/pdf"
          />
          <ThemedView className='w-[250]'>
            <ThemedText>Fotocopia de CI *</ThemedText>
            <TouchableOpacity onPress={triggerClientDocumentSelect} className='bg-light-primary rounded-xl p-1'>
              <ThemedText className='text-white text-center'>Seleccionar PDF</ThemedText>
            </TouchableOpacity>
            <ThemedText className='italic'>
              {clientDocumentFile && clientDocumentFile.name ? `Archivo: ${clientDocumentFile.name}` : 'Ningún archivo seleccionado'}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Artículo</ThemedText>
        <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
          {
            fieldsArticle.map((item, index) => {
              const error = validationErrors.articulo[item.name];
              return (
                <ThemedView className='w-[250]' key={item.name}>
                  <ThemedText>
                    {item.label}
                    {item.required ? ' *' : null}
                  </ThemedText>
                  <TextInput
                    className={`border rounded-xl p-2 ${error ? 'border-red-500' : 'border-gray-300'} ${(formData.articulo[item.name] == undefined || formData.articulo[item.name] == '') ? 'text-gray-400' : ''}`}
                    placeholder={item.placeholder}
                    value={formData.articulo[item.name] || ''}
                    onChangeText={(text) => handleInputChangeWithValidation('articulo', item.name, text, item)}
                    keyboardType={item.type as KeyboardType}
                    textContentType={item.type === 'email' ? 'emailAddress' : 'none'}
                  />
                  {error && <ThemedText className="text-red-500 text-xs">{error}</ThemedText>}
                </ThemedView>
              );
            })
          }
          <input
            type="file"
            ref={articleImageInputRef}
            onChange={handleArticleImageChange}
            style={{ display: 'none' }}
            accept="image/*"
          />
          <ThemedView className='w-[250]'>
            <ThemedText>Imagen del Artículo *</ThemedText>
            <TouchableOpacity onPress={triggerArticleImageSelect} className='bg-light-primary rounded-xl p-1'>
              <ThemedText className='text-white text-center'>Seleccionar Imagen</ThemedText>
            </TouchableOpacity>
            <ThemedText className='italic'>
              {articleImageFile && articleImageFile.name ? `Archivo: ${articleImageFile.name}` : 'Ningún archivo seleccionado'}
            </ThemedText>
          </ThemedView>
        </ThemedView>

        <TouchableOpacity className='bg-light-secondary w-min h-min rounded-3xl my-4 mx-auto' onPress={handleSubmit}>
          <ThemedText type='h2' className='text-white px-6 py-3 text-center'>Enviar</ThemedText>
        </TouchableOpacity>

      </ScrollView>
    </ThemedView>
  )
}

export default RegistrarEmpenio