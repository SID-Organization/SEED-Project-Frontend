export default function BenefitsCard(props) {
  function getCurrency(moeda) {
    if (moeda === "REAL") return "R$";
    if (moeda === "DOLAR") return "$";
    if (moeda === "EURO") return "€";
  }

  return (
    <div>
      <div
        className="flex h-10 items-center justify-center
        rounded-t
        bg-light-blue-weg"
      >
        <h1 className="font-roboto text-lg font-bold text-white">
          {props.title}
        </h1>
      </div>
      <div className="border-2 border-gray-300">
        <div className="m-2 border-slate-500">
          <table className="border-collapse">
            <thead>
              <tr>
                <th className="border p-4">Valor mensal</th>
                <th className="border p-4">Descrição</th>
              </tr>
            </thead>
            <tbody>
              {props.benefits?.map((benefit, i) => {
                return (
                  <tr key={i}>
                    <td className="border p-4">
                      <p className="max-w-[18.25rem]">
                        {getCurrency(benefit.moedaBeneficio)}{" "}
                        {benefit.valorBeneficio}
                      </p>
                    </td>
                    <td className="border p-4">{benefit.descricaoBeneficio}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
