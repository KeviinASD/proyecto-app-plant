import { Image, StyleSheet, ScrollView } from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/planta.jpg')} // Cambia por tu logo o imagen de presentación
          style={styles.headerImage}
        />
      }>
      <ScrollView contentContainerStyle={styles.content}>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Detección de Enfermedades Foliares</ThemedText>
          <ThemedText>
            Este proyecto implementa un sistema basado en aprendizaje profundo para la detección y clasificación de enfermedades en hojas de manzano utilizando imágenes.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Acerca del Proyecto</ThemedText>
          <ThemedText>
            Utilizando el dataset "Plant Pathology 2020 - FGVC7", nuestro modelo clasifica las hojas en cuatro categorías: "Healthy" (sanas), "Scab" (costra), "Rust" (roya), y "Multiple diseases" (enfermedades múltiples). Este enfoque está diseñado para apoyar a los agricultores en el diagnóstico temprano de enfermedades agrícolas.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.section}>
          <ThemedText type="subtitle">Beneficios</ThemedText>
          <ThemedText>
            - Diagnóstico temprano y eficaz.
          </ThemedText>
          <ThemedText>
            - Reducción de pérdidas en cultivos agrícolas.
          </ThemedText>
          <ThemedText>
            - Apoyo tecnológico a agricultores.
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: "100%",
    width: "100%",
    bottom: 0,
    left: 0,
    position: 'absolute',
    resizeMode: 'cover',
  },
  content: {
    padding: 1,
  },
  section: {
    marginBottom: 16,
  },
});
