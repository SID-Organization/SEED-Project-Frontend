

export default function BenefitsCard(props) {


  function getCurrency(moeda) {
    if(moeda === "REAL") return "R$"
    if(moeda === "DOLAR") return "$"
    if(moeda === "EURO") return "€"
  }

  return (
    <div>
      <div
        className="bg-light-blue-weg flex justify-center items-center
        h-10
        rounded-t"
      >
        <h1 className="font-bold font-roboto text-white text-lg">{props.title}</h1>
      </div>
      <div className="border-gray-300 border-2">
        <div className="m-2 border-slate-500">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="p-4 border">Valor mensal</th>
                <th className="p-4 border">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {props.benefits?.map((benefit, i) => {
                return (
                  <tr key={i} >
                    <td className="p-4 border">{getCurrency(benefit.moedaBeneficio)} {benefit.memoriaCalculoBeneficio}</td>
                    <td className="p-4 border"><p className="max-w-[18.25rem]">{benefit.descricaoBeneficio}</p></td>
                  </tr>
                );
              })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
