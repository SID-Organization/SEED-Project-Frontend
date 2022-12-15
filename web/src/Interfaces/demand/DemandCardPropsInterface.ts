export default interface DemandCardProps {
    demand: {
      idDemanda: string;
      statusDemanda: string;
      descricaoDemanda: string;
      situacaoAtualDemanda: string;
      propostaDemanda: string;
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
    setSelectedDrafts?: (value: any) => void;
}