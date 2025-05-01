import Card from '@/components/Card';
import ThemedText from '@/components/shared/ThemedText';
import ThemedView from '@/components/shared/ThemedView';

const articleData = [
  {
    title: 'Artículos Empeñados',
    value: 4,
  },
  {
    title: 'Artículos en Venta',
    value: 4,
  },
  {
    title: 'Artículos Devueltos',
    value: 4,
  }
]

const Inicio = () => {

  return (
    <>
      <ThemedView className='flex-1 bg-light-background rounded-tl-3xl'>
        <ThemedText type='semi-bold' className="text-center py-4">Inicio</ThemedText>

        <ThemedView className='flex flex-row flex-wrap justify-center'>
          {
            articleData.map(data => (
              <Card
                key={data.title}
                title={data.title}
                value={`${data.value}`}
              />
            ))
          }
        </ThemedView>


      </ThemedView>
    </>
  )
}

export default Inicio