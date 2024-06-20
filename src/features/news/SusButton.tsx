import React from "react";
import { BotonSuscribir } from "./styled";
import { INoticiasNormalizadas } from "./Noticias";

export interface ISuscription {
  setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>;
}

const SusButton: React.FC<ISuscription> = ({ setModal }) => {
  return (
    <BotonSuscribir
      onClick={() =>
        setTimeout(() => {
          alert("Suscripto!");
          setModal(null);
        }, 1000)
      }
    >
      Suscríbete
    </BotonSuscribir>
  );
};

export default SusButton;
