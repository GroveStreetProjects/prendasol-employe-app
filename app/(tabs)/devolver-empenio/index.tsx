import ArticleCard from '@/components/ArticleCard';
import PageSection from '@/components/PageSection';
import ThemedText from '@/components/shared/ThemedText';
import ThemedView from '@/components/shared/ThemedView';
import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

const DevolverEmpenio = () => {
  const [articles, setArticles] = useState([]);
  const [ci, setCi] = useState('');

  const handleCi = (ci: string) => {
    setCi(ci);
  };

  const validateCi = (value: string): string | null => {
    if (!value.trim()) return 'Por favor introduce un CI';
    if (value) {
      if (!/^[0-9]{7,12}$/.test(value)) return 'CI no válido';
    }
    return null;
  };

  const handleSubmit = async () => {
    if (validateCi(ci)) {
      window.alert('El CI no es válido')
      return;
    };
    try {
      const response = await fetch(`http://127.0.0.1:3000/cliente/${ci}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido en el servidor.' }));
        console.error('Error en la respuesta de la API:', response.status, errorData.message);
        window.alert(`No se pudo encontrar el cliente o hubo un problema`);
        return null;
      }

      const data = await response.json();
      if (!data || data.length === 0) {
        window.alert(`No existen empeños para este cliente`);
        setArticles([]);
        return;
      }
      setArticles(data);
      console.log(articles);
      return data;

    } catch (error) {
      console.error('Error de conexión o de red:', error);
      window.alert('No se pudo conectar con el servidor. Por favor, revisa tu conexión a internet.');
      return null;
    }
  };

  const handleReturnClick = (article: any) => {
    if (article.EstadoArticulo === 'empeñado') {
      if (window.confirm(`¿Está seguro de querer devolver el artículo "${article.Nombre}"?`)) {
        executeReturn(article.Id);
      }
    } else {
      window.alert(`No se puede devolver este artículo, su estado es "${article.EstadoArticulo}".`);
    }
  };

  const executeReturn = async (articleId: number) => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/${articleId}/recoger`, {
        method: 'PATCH',
      });

      if (!response.ok) {
        throw new Error('Error al actualizar el estado del artículo.');
      }

      window.alert('¡Artículo devuelto con éxito!');
      handleSubmit();

    } catch (error) {
      console.error('Error al devolver el artículo:', error);
      window.alert('Hubo un problema al intentar devolver el artículo.');
    }
  };

  return (
    <PageSection title='Devolver Empeño'>
      <ThemedView className='max-w-[150] mx-auto'>
        <ThemedText>CI del cliente</ThemedText>
        <TextInput
          className={`border rounded-xl p-2 ${ci == '' ? 'text-gray-400' : ''}`}
          placeholder={'11111111...'}
          value={ci}
          onChangeText={handleCi}
          keyboardType={'numeric'}
        />
        <TouchableOpacity className='bg-light-secondary w-min h-min rounded-3xl my-2 mx-auto' onPress={handleSubmit}>
          <ThemedText type='h2' className='text-white px-6 py-1 text-center'>Buscar</ThemedText>
        </TouchableOpacity>
      </ThemedView>
      {/* <ThemedText type='h2' className='mx-auto mb-6'>Empeños de Nombre Apellido con el CI 11111111</ThemedText> */}
      <ThemedView className='grid grid-cols-4 justify-center items-center w-full max-w-[600] px-4'>
        <ThemedText className='text-center'>Nombre</ThemedText>
        <ThemedText className='text-center'>Fecha Empeño</ThemedText>
        <ThemedText className='text-center'>Fecha Límite</ThemedText>
        <ThemedText className='text-center'>Estado</ThemedText>
      </ThemedView>
      {
        articles.map((article: any) => {
          console.log(article)

          let color;
          if (article.status === 'vencido') color = 'text-red-600'
          else if (article.status === 'recogido') color = 'text-gray-600'
          else color = 'text-green-600'

          return (
            <ArticleCard
              key={article.Id}
              colorStatus={color}
              name={article.Nombre}
              initialDate={article.FechaIngreso}
              finalDate={article.FechaLimite}
              status={article.EstadoArticulo}
              onPress={() => handleReturnClick(article)}
            />
          )
        })
      }
    </PageSection>
  )
}

export default DevolverEmpenio