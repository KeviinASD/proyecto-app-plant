import { CameraCapturedPicture } from "expo-camera";
import { createContext, useContext, useEffect, useState } from "react";


interface PhotoContextType {
  currentPhoto: CameraCapturedPicture | null;
  setCurrentPhoto: (photo: CameraCapturedPicture) => void;
  prediction: PredictionTypes | null;
  setPrediction: (prediction: PredictionTypes) => void;
}

interface PredictionTypes {
  prediction: string;
  probabilities: Array<number>;
}

export const PhotoContext = createContext<PhotoContextType | null>(null);

export const PhotoContextProvider = ({ children }: {children: React.ReactNode}) => {

  const classes = ["Healthy", "Multiple diseases", "Rust", "Scab"]
  const [currentPhoto, setCurrentPhoto] = useState<CameraCapturedPicture | null>(null);
  const [prediction, setPrediction] = useState<PredictionTypes | null>(null);


  return (
    <PhotoContext.Provider value={{
      currentPhoto,
      setCurrentPhoto,
      prediction,
      setPrediction
    }}>
      {children}
    </PhotoContext.Provider>
  );
};

export const useCurrentPhoto = () => {
  const values = useContext(PhotoContext);

  if (!values) {
    throw new Error("useCurrentPhoto must be used within currentPhotoProvider");
  }
  return values;
}