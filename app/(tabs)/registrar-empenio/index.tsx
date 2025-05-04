import { useRef, useState } from 'react';
import { TextInput, ScrollView, KeyboardType, Alert, TouchableOpacity } from 'react-native'

import ThemedView from '@/components/shared/ThemedView';
import ThemedText from '@/components/shared/ThemedText';

interface ClientData {
  [key: string]: string | number;
}

interface ArticleData {
  [key: string]: string | number | Date;
}

interface FormData {
  cliente: ClientData;
  articulo: ArticleData;
}

interface FormSection {
  [key: string]: any;
}

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
    },
    {
      label: 'Nombres',
      name: 'Nombres',
      placeholder: 'Juan Fernando...',
      type: 'text',
      required: true,
    },
    {
      label: 'Apellido Paterno',
      name: 'Paterno',
      placeholder: 'Pérez...',
      type: 'text',
      required: false,
    },
    {
      label: 'Apellido Materno',
      name: 'Materno',
      placeholder: 'Martínez...',
      type: 'text',
      required: false,
    },
    {
      label: 'Correo Electrónico',
      name: 'Correo',
      placeholder: 'correo@correo.com...',
      type: 'email',
      required: true,
    },
    {
      label: 'Teléfono',
      name: 'Telefono',
      placeholder: '70123456...',
      type: 'phone',
      required: true,
    },
  ];

  const fieldsArticle = [
    {
      label: 'Nombre',
      name: 'Nombre',
      placeholder: 'Anillo de oro...',
      type: 'text',
      required: true,
    },
    {
      label: 'Descripción',
      name: 'Descripcion',
      placeholder: 'Anillo de oro de 18k...',
      type: 'text',
      required: true,
    },
    {
      label: 'Precio de Empeño',
      name: 'Precio_Empeno',
      placeholder: '800.00...',
      type: 'numeric',
      required: true,
    },
  ];

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

  const handleClientDocumentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setClientDocumentFile(file);
      } else {
        Alert.alert('Error', 'Por favor selecciona un archivo PDF.');
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
        Alert.alert('Error', 'Por favor selecciona un archivo de imagen.');
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
      Alert.alert('Falta Archivo', 'Por favor, selecciona el documento PDF del cliente.');
      return;
    }

    if (articleImageFile) {
      dataToSend.append('imagenArticulo', articleImageFile, articleImageFile.name);
    } else {
      Alert.alert('Falta Archivo', 'Por favor, selecciona la imagen del artículo.');
      return;
    }

    try {
      const apiUrl = 'http://192.168.100.6:3000/registrar-empenio';

      console.log(formData);
      console.log(dataToSend);

      const response = await fetch(apiUrl, {
        method: 'POST',
        body: dataToSend,
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Success response:', responseData);
        Alert.alert('Éxito', 'Datos y archivos enviados correctamente');
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
        Alert.alert('Error', errorMessage);
      }
    } catch (error: any) {
      Alert.alert('Error de Red', 'Hubo un problema con la conexión al servidor.');
      console.error('Network/Fetch Error:', error);
    }
  };

  return (
    <ThemedView className='flex-1 bg-light-background rounded-tl-3xl'>
      <ThemedText type='semi-bold' className="text-center py-4">Registrar Emepeño</ThemedText>
      <ScrollView className='flex flex-1 p-6 mx-[50] bg-white rounded-3xl items-center'>

        <ThemedText type='h2' className='text-center pb-2 font-semibold'>Datos del Cliente</ThemedText>
        <ThemedView className='flex flex-row flex-wrap gap-4 justify-center'>
          {
            fieldsClient.map((item, index) => {
              if (index === 0) return;
              const isRequiredAndEmpty = item.required && (!formData.articulo[item.name] || formData.articulo[item.name] === '');
              return (
                <ThemedView className='w-[250]' key={item.name}>
                  <ThemedText>
                    {item.label}
                    {item.required
                      ? ' *'
                      : null}
                  </ThemedText>
                  <TextInput
                    className={`border rounded-xl p-2 text-gray-500  ${isRequiredAndEmpty ? 'border-red-500' : ''}`}
                    placeholder={item.placeholder}
                    value={formData.cliente[item.name] || ''}
                    onChangeText={(text) => handleInputChange('cliente', item.name, text)}
                    keyboardType={item.type as KeyboardType}
                    textContentType='emailAddress'
                  />
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
            fieldsArticle.map((item) => {
              const isRequiredAndEmpty = item.required && (!formData.articulo[item.name] || formData.articulo[item.name] === '');
              return (
                <ThemedView className='w-[250]' key={item.name}>
                  <ThemedText>
                    {item.label}
                    {item.required
                      ? ' *'
                      : null}
                  </ThemedText>
                  <TextInput
                    className={`border rounded-xl p-2 text-gray-500 ${isRequiredAndEmpty ? 'border-red-500' : ''}`}
                    placeholder={item.placeholder}
                    value={formData.articulo[item.name] || ''}
                    onChangeText={(text) => handleInputChange('articulo', item.name, text)}
                    keyboardType={item.type as KeyboardType}
                  />
                </ThemedView>
              )
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