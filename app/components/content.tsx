'use client'
import { CheckboxGroup } from "@/app/constants/checkbox-group";
import { Stars } from "@/app/components/stars";
import { useEffect, useState } from "react";
import { RadioGroup } from "@/app/components/radio-group";
import { RadioGroupConst } from "@/app/constants/radio-group";
import axios from "axios";
import { CheckBadge } from "./check-badge";
import { Spinner } from "@nextui-org/react";

interface APIProps {
  typeQuestion: number;
  answerValue: number;
  mandatory: boolean;
  content: string;
  itens?: undefined;
  horizontal?: undefined;
}

const Content = () => {
  const [data, setData] = useState<APIProps | any>(null);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const apiUrl = "https://fdlmx-backgrounds.sfo3.digitaloceanspaces.com/front-test/survey.json";
        const response = await axios.get(apiUrl);
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, []);

  if (!data) {
    return (
      <div className="absolute left-1/2">
        <Spinner size="lg" color="warning" className="-mt-4" />
      </div>
    )
  }

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
                Questões de estrela
              </h2>
              <p className="text-sm leading-[21px]">
                {data && data.itens[0].content}
              </p>
            </div>

            <div className="flex pt-4 pb-10">
              <Stars initialValue={data && data.itens[0].answerValue} />
            </div>

            <div className="space-y-[9px]">
              <h2 className="font-semibold text-2xl leading-[30px] text-blue-400">
                Questões que tem os rádios fixos de 1 até 10
              </h2>
              <p className="text-sm leading-[21px]">
                {data && data.itens[1].content}
              </p>
            </div>

            <div className="flex pt-4 w-full justify-between">
              <RadioGroup
                options={RadioGroupConst}
                initialValue={data && data.itens[1].answerValue}
                name="rating" />
            </div>

            <div className="space-y-[9px] py-10">
              <h2 className="text-blue-800">
                {data && data.itens[2].content} <span className="text-sm text-gray-600 font-medium">(opcional)</span>
              </h2>
              <textarea
                placeholder="Digite aqui..."
                className="h-[104px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
              />
            </div>

            <select className="h-[56px] w-full p-4 border border-gray-200 rounded-lg outline-none text-blue-400">
              <option
                value=""
                disabled
                selected
                className="text-gray-600"
              >
                {data && data.itens[3].content}
              </option>
              <option
                value={data && data.itens[3].itens[0].value}>
                {data && data.itens[3].itens[0].description}
              </option>
              <option
                value={data && data.itens[3].itens[1].value}>
                {data && data.itens[3].itens[1].description}
              </option>
              <option
                value={data && data.itens[3].itens[2].value}>
                {data && data.itens[3].itens[2].description}
              </option>
            </select>

            <div className="pt-10 text-blue-800">
              <h2>{data && data.itens[4].content}</h2>
              <div className="space-x-4 pt-2">
                <input
                  type="radio"
                  name="singleChoice"
                  value={data && data.itens[4].itens[0].value}
                  checked={data && data.itens[4].answerValue === data.itens[4].itens[0].value}
                />
                <label>{data && data.itens[4].itens[0].description}</label>

                <input
                  type="radio"
                  name="singleChoice"
                  value={data && data.itens[4].itens[1].value}
                  checked={data && data.itens[4].answerValue === data.itens[4].itens[1].value}
                />
                <label>{data && data.itens[4].itens[1].description}</label>
              </div>
            </div>

            <div className="pt-10 text-blue-800">
              <h2>Questões de seleção múltipla</h2>
              <div className={`${data && data.itens[5].horizontal ? 'flex gap-4' : 'flex flex-col gap-2'} pt-2`}>
                {data && data.itens[5].itens.map((item: any, index: any) => (
                  <CheckBadge
                    key={index}
                    value={item.value}
                    description={item.description}
                    horizontal={data && data.itens[5].horizontal}
                  />
                ))}
              </div>
            </div>

            <div className="pt-10 text-blue-800">
              <h2>Questões de seleção múltipla</h2>
              {data && data.itens[6].itens.map((item: any, index: any) => (
                <div
                  key={index}
                  className="flex items-center pt-2 gap-2">
                  <input type="checkbox" id={item.value} />
                  <label className="text-sm">{item.description}</label>
                </div>
              ))}
            </div>

            <div className="py-10 space-y-2">
              <h2 className="text-blue-800">
                Questões de texto
              </h2>
              <textarea
                placeholder="Digite aqui..."
                className="h-[168px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
              />
            </div>

            <div className="space-y-2 pb-10">
              <h2 className="text-blue-800">
                Questões de texto
              </h2>
              <textarea
                placeholder="Digite aqui..."
                className="h-[168px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
              />
            </div>

            <button className="bg-yellow text-lg rounded-full py-[10px] px-16 font-bold text-blue-800">Enviar</button>

            <div className="flex gap-4 pt-10">
              <button className="bg-yellow text-base rounded-full py-[10px] px-8 font-bold text-blue-800 shadow-md">Enviar Fake Pos</button>
              <button className="bg-[#FC4737] text-base rounded-full py-[10px] px-8 font-bold text-blue-800 shadow-md">Enviar Erro</button>
              <button className="bg-[#04D361] text-base rounded-full py-[10px] px-8 font-bold text-blue-800 shadow-md">Enviar Sucesso</button>
            </div>
          </main>
        </div>
      </div >
    </div >
  )
}

export default Content;