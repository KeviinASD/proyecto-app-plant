import React from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { wp, hp } from '@/src/helper/common';

function DetailsHoja() {
  const labels = ["Healthy", "Multiple diseases", "Rust", "Scab"];
  const screenWidth = Dimensions.get('window').width; // Tamaño dinámico basado en el dispositivo

  return (
    <View style={styles.container}>
      <Text style={{fontSize: 18, fontFamily: 'SpaceMono', fontWeight: 700, marginBottom: 15}}>Detalle enfermedades</Text>
      <BarChart 
        data={{
          labels: labels,
          datasets: [
            {
              data: [0.1, 0.2, 0.3, 0.4]
            }
          ]
        }}
        width={wp(85)} // Tamaño dinámico del gráfico
        height={220} // Altura del gráfico
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
      <Text style={{fontSize: 18, fontFamily: 'SpaceMono', fontWeight: 700, marginTop: 15}}>Imagen</Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  chart: {
    borderRadius: 5,
    flex: 1,
    marginVertical: 8, 
    
  },
});

export default DetailsHoja;
