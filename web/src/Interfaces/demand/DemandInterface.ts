export default interface DemandInterface {
    idDemanda: string;
    nomeDemanda: string;
    descricaoDemanda: string;
    situacaoAtualDemanda: string;
    propostaMelhoriaDemanda: string;
    frequenciaUsoDemanda: string;
    descricaoQualitativoDemanda: string;
    arquivosDemandas: any[];
    beneficiosDemanda: any[];
    tituloDemanda: string;
    scoreDemanda: number;
    solicitanteDemanda: {
      nomeUsuario: string;
      departamentoUsuario: string;
    }
    centroCustoDemanda: any[]
  }
