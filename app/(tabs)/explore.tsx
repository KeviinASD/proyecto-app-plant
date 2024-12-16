import { StyleSheet, Image, Platform, Text } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { BarChart } from 'react-native-chart-kit';
import { hp, wp } from '@/src/helper/common';
import { usePhoto } from '@/src/context/photoContext';

export default function TabTwoScreen() {
  const labels = ["Saludable", "E. múltiples", "Roya", "Costra"];
  
  const { currentPhoto, currentprediction } = usePhoto();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>

      <ThemedText style={{fontSize: 18, fontFamily: 'SpaceMono', fontWeight: 700}}>Detalle enfermedades</ThemedText>
      <BarChart 
        data={{
          labels: labels,
          datasets: [
            {
              data: currentprediction 
              ? currentprediction.probabilities.map((value) => parseFloat(value.toFixed(2)))
              : [0.1, 0.2, 0.3, 0.4]
            }
          ]
        }}
        width={wp(85)} // Tamaño dinámico del gráfico
        height={hp(30)} // Altura del gráfico
        chartConfig={{
          backgroundGradientFrom: "#ffffff", // Color de fondo inicial
          backgroundGradientTo: "#ffffff", // Color de fondo final
          color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color de las líneas
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Color de las etiquetas
          style: {
            borderRadius: 16, // Bordes redondeados
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726",
          }
        }}
        style={styles.chart}
        yAxisLabel=''
        xAxisLabel=''
        showValuesOnTopOfBars
        yAxisSuffix=''
      />
      <ThemedText style={{fontSize: 18, fontFamily: 'SpaceMono', fontWeight: 700}}>Imagen actual</ThemedText>
      <Image
        source={{ uri: currentPhoto?.uri ? currentPhoto.uri : 'https://via.placeholder.com/300' }}
        style={{ width: '100%', height: 300, resizeMode: 'cover' }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  chart: {
    borderRadius: 5,
    flex: 1,
    marginVertical: 8, 
  }
});
