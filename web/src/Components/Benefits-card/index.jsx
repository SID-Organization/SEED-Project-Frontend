//Utils
import FontSizeUtils from "../../utils/FontSize-Utils";

import { useEffect, useState } from "react";

export default function BenefitsCard(props) {
  const [fonts, setFonts] = useState(FontSizeUtils.getFontSizes());

  useEffect(() => {
    setFonts(FontSizeUtils.getFontSizes());
  }, [FontSizeUtils.getFontControl()]);

  function getCurrency(moeda) {
    if (moeda === "REAL") return "R$";
    if (moeda === "DOLAR") return "$";
    if (moeda === "EURO") return "€";
  }

  useEffect(() => {
    console.log("benefícios", props);
  }, []);

  return (
    <div>
      <div
        className="flex h-10 items-center justify-center
        rounded-t
        bg-light-blue-weg"
      >
        <h1
          style={{ fontSize: fonts.lg }}
          className="font-roboto font-bold text-white"
        >
          {props.title}
        </h1>
      </div>
      <div className="border-2 border-gray-300">
        <div className="m-2 border-slate-500">
          <table className="border-collapse">
            <thead>
              <tr>
                <th style={{ fontSize: fonts.base }} className="border p-4">
                  Valor mensal
                </th>
                <th style={{ fontSize: fonts.base }} className="border p-4">
                  Descrição
                </th>
              </tr>
            </thead>
            <tbody>
              {props.benefits?.map((benefit, i) => {
                return (
                  <tr key={i}>
                    <td className="border p-4">
                      <p
                        style={{ fontSize: fonts.base }}
                        className="max-w-[18.25rem]"
                      >
                        {getCurrency(benefit.moedaBeneficio)}{" "}
                        {benefit.valorBeneficio}
                      </p>
                    </td>
                    <td
                      className="max-w-[18.25rem] break-words border p-4"
                      dangerouslySetInnerHTML={{
                        __html: benefit.memoriaCalculoBeneficioHTML,
                      }}
                    ></td>
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
