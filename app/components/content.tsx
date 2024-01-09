import { Star } from "@/app/svg/star";
import { RadioGroup } from "@/app/constants/radio-group";
import { CheckboxGroup } from "@/app/constants/checkbox-group";

const Content = () => {
  const value = 0;

  const stars = Array.from({ length: 5 }, (_, index) => (
    <Star key={index} stars={index < value} />
  ));

  return (
    <div className="flex flex-col items-center justify-center -mt-[calc(316px-128px)] pb-8">
      <div className="max-w-[792px]">
        <h2 className="text-white font-semibold text-[40px] pb-6 leading-10 ">
          Pesquisa de Satisfação
        </h2>

        <div className="flex items-center justify-center">
          <main className="w-[648px] p-8 bg-white rounded-2xl">

            <div className="space-y-[9px]">
              <h2 className="font-semibold text-2xl leading-[30px] text-blue-400">
                Título da pergunta deve ficar aqui
              </h2>
              <p className="text-sm leading-[21px]">
                Também é importante ter um espaço para o dono da loja colocar uma descrição da pergunta para ajudar o entendimento do usuário
              </p>
            </div>

            <div className="flex pt-4 pb-10">{stars}</div>

            <div className="space-y-[9px]">
              <h2 className="font-semibold text-2xl leading-[30px] text-blue-400">
                Título da pergunta deve ficar aqui
              </h2>
              <p className="text-sm leading-[21px]">
                Também é importante ter um espaço para o dono da loja colocar uma descrição da pergunta para ajudar o entendimento do usuário
              </p>
            </div>

            <div className="flex pt-4 w-full justify-between">
              {RadioGroup.map((item) => (
                <div className="flex flex-col items-center gap-2">
                  <input
                    name="rating"
                    type="radio"
                    id={item.id}
                    value={item.id}
                    className="w-4 h-4"
                  />
                  <label>{item.label}</label>
                </div>
              ))}
            </div>

            <div className="space-y-[9px] py-10">
              <h2 className="text-blue-800">
                Descreva o motivo de sua avaliação <span className="text-sm text-gray-600 font-medium">(opcional)</span>
              </h2>
              <textarea
                placeholder="Digite aqui..."
                className="h-[104px] w-full p-4 border border-blue-50 rounded-lg resize-none outline-none text-blue-400"
              />
            </div>

            <select className="h-[56px] w-full p-4 border border-blue-50 rounded-lg outline-none text-blue-400">
              <option
                value=""
                disabled
                selected
                className="text-gray-600"
              >
                Qual loja você frequenta?
              </option>
              <option value="opcao1">Opção 1</option>
              <option value="opcao2">Opção 2</option>
              <option value="opcao3">Opção 3</option>
            </select>

            <div className="pt-10 text-blue-800">
              <h2>Pergunta de escolha única?</h2>
              <div className="space-x-4 pt-2">
                <input type="radio" name="singleChoice" value={'yes'} />
                <label>Sim</label>
                <input type="radio" name="singleChoice" value={'no'} />
                <label>Não</label>
              </div>
            </div>

            <div className="pt-10 text-blue-800">
              <h2>Pergunta de múltipla escolha?</h2>
              <div className="space-x-4 pt-2 flex">
                terminar depois
              </div>
            </div>

            <div className="pt-10 text-blue-800">
              <h2>Pergunta de múltipla escolha?</h2>
              {CheckboxGroup.map((item) => (
                <div className="flex gap-2">
                  <input type="checkbox" id={item.id} />
                  <label className="text-sm">{item.label}</label>
                </div>
              ))}
            </div>

            <div className="py-10 space-y-2">
              <h2 className="text-blue-800">
                Pergunta de texto?
              </h2>
              <textarea
                placeholder="Digite aqui..."
                className="h-[168px] w-full p-4 border border-blue-50 rounded-lg resize-none outline-none text-blue-400"
              />
            </div>

            <div className="space-y-2 pb-10">
              <h2 className="text-blue-800">
                Pergunta de texto?
              </h2>
              <textarea
                placeholder="Digite aqui..."
                className="h-[168px] w-full p-4 border border-blue-50 rounded-lg resize-none outline-none text-blue-400"
              />
            </div>

            <div className="flex flex-col gap-4">
              <button className="bg-yellow text-lg rounded-full py-[10px] px-16 font-bold text-blue-800">Enviar Fake Pos</button>
              <button className="bg-yellow text-lg rounded-full py-[10px] px-16 font-bold text-blue-800">Enviar Erro</button>
              <button className="bg-yellow text-lg rounded-full py-[10px] px-16 font-bold text-blue-800">Enviar Sucesso</button>
            </div>

          </main>
        </div>
      </div>
    </div>
  )
}

export default Content;