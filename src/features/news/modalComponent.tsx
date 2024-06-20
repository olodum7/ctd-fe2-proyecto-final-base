import {
    CloseButton,
    TarjetaModal,
    ContenedorModal,
    DescripcionModal,
    ImagenModal,
    TituloModal,
    CotenedorTexto,
  } from "./styled";
  import { INoticiasNormalizadas } from "./Noticias";
  import { SuscribeImage, CloseButton as Close } from "../../assets";
  import SusButton from "./SusButton";
  
  export interface Imodal {
    img: string;
    title: string; 
    desc: string; 
    setModal: React.Dispatch<React.SetStateAction<INoticiasNormalizadas | null>>;
    esPremium: boolean; 
  }
  
  const ModalComponent: React.FC<Imodal> = ({
    img,
    title,
    desc,
    setModal,
    esPremium,
  }) => {
    const suscriptionTitle = "Suscríbete a nuestro Newsletter";
    const suscriptionDescription =
      "Suscríbete a nuestro newsletter y recibe noticias de nuestros personajes favoritos.";
  
    return (
      <ContenedorModal>
        <TarjetaModal>
          <CloseButton onClick={() => setModal(null)}>
            <img src={Close} alt="close-button" />
          </CloseButton>
          <ImagenModal
            src={esPremium ? SuscribeImage : img}
            alt={esPremium ? "mr-burns-excelent" : "news-image"}
          />
          <CotenedorTexto>
            <TituloModal>{esPremium ? suscriptionTitle : title}</TituloModal>
            <DescripcionModal>
              {esPremium ? suscriptionDescription : desc}
            </DescripcionModal>
            {esPremium ? <SusButton setModal={setModal} /> : null}
          </CotenedorTexto>
        </TarjetaModal>
      </ContenedorModal>
    );
  };
  export default ModalComponent;
  