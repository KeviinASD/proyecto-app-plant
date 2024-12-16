import { CameraCapturedPicture } from "expo-camera";
import { createContext, useContext, useEffect, useState } from "react";


interface PhotoContextType {
  currentPhoto: CameraCapturedPicture | null | undefined;
  setCurrentPhoto: (photo: CameraCapturedPicture | undefined) => void;
  currentprediction: PredictionTypes | null;
  setCurrentPrediction: (prediction: PredictionTypes) => void;
}

interface PredictionTypes {
  prediction: string;
  probabilities: Array<number>;
}

export const PhotoContext = createContext<PhotoContextType | null>(null);

export const PhotoContextProvider = ({ children }: {children: React.ReactNode}) => {

  const classes = ["Healthy", "Multiple diseases", "Rust", "Scab"]
  const [currentPhoto, setCurrentPhoto] = useState<CameraCapturedPicture | null | undefined>(null);
  const [currentprediction, setCurrentPrediction] = useState<PredictionTypes | null>(null);

  useEffect(() => {
    if (currentprediction) {
      console.log(currentprediction)
      console.log(currentPhoto)
    }
  }, [currentprediction, currentPhoto])

  return (
    <PhotoContext.Provider value={{
      currentPhoto,
      setCurrentPhoto,
      currentprediction,
      setCurrentPrediction
    }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = () => {
  const values = useContext(PhotoContext);

  if (!values) {
    throw new Error("useCurrentPhoto must be used within currentPhotoProvider");
  }
  return values;
}