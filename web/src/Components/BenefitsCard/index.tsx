export default function BenefitsCard({ children }: any) {
  return (
    <div className="mt-12 ">
      <div
        className="bg-light-blue-weg flex justify-center items-center
        h-10
        rounded-t"
      >
        <h1 className="font-bold font-roboto text-white text-lg">{children}</h1>
      </div>
      <div className="grid border-gray-300 border-2 rounded-t">
        <div className="border-b-2 border-gray-300">
          <h1 className="font-bold font-roboto mb-2 mt-2 ml-2">
            Valor mensal:{" "}
            <span className="font-normal font-roboto">R$ 20.000</span>
          </h1>
        </div>
        <div className="mr-2">
          <h1 className="font-roboto font-bold mb-2 mt-2 ml-2 text-justify">
            Descrição: {""}
            <span className="font-normal font-roboto">
              Descrição: Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Donec facilisis velit sapien, nec dapibus velit tempor et.
              Vivamus
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}
