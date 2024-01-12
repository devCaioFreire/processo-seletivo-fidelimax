'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { ModalSubmit } from "./modal";
import { APIProps, FormDataInterface, FormResponse, ItensProps } from "../models/api-form";
import { StarComponent } from "./star-component";
import { RadioComponent } from "./radio-component";
import { ReviewComponent } from "./review-component";
import { SelectComponent } from "./select-component";
import { SingleChoiceComponent } from "./single-choice-component";
import { Badge } from "./badge";
import { TextComponent } from "./text-component";
import { CheckboxComponent } from "./checkbox-component";

const Content = () => {
  const [formData, setFormData] = useState<FormDataInterface | null>(null);
  const [formResponse, setFormResponse] = useState<FormResponse>();
  const [selectedItems, setSelectedItems] = useState<any[]>([]);
  const [multipleChoiceCheckboxSelected] = useState<number[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const apiUrl = "https://fdlmx-backgrounds.sfo3.digitaloceanspaces.com/front-test/survey.json";
        const response = await axios.get<APIProps>(apiUrl);
        const itens: ItensProps[] = response.data.itens!;

        setFormData({
          stars: itens[0],
          radio: itens[1],
          review: itens[2],
          select: itens[3],
          singleChoice: itens[4],
          multipleChoiceBadge: itens[5],
          multipleChoiceCheckbox: itens[6],
          textQuestion1: itens[7],
          textQuestion2: itens[7],
        });

        console.log(response.data);
      } catch (error) {
        console.error('Error fetching survey data:', error);
      }
    };

    fetchSurveyData();
  }, []);

  useEffect(() => {
    if (!formData) return;

    setFormResponse({
      stars: (formData!.stars.answerValue ?? -1),
      radio: (formData!.radio.answerValue ?? -1),
      review: (formData!.review.answerValue ?? ''),
      select: (formData?.select.answerValue ?? undefined),
      singleChoice: (formData!.singleChoice.answerValue ?? -1),
      multipleChoiceBadge: (formData?.multipleChoiceBadge.answerValue ?? []),
      multipleChoiceCheckbox: (formData?.multipleChoiceCheckbox.answerValue ?? []),
      textQuestion1: (formData!.textQuestion1.answerValue ?? ''),
      textQuestion2: (formData!.textQuestion2.answerValue ?? '')
    })
    console.log('USE', formResponse)
  }, [formData]);

  const updateForm = (newResponse: Partial<FormResponse>) => {
    //Pega o valor das repostas Atuais 
    const response = formResponse;
    //pegar o formulario Atual
    const form = formData;
    //Olha quantas propriedades veio e atualiza no formResponse e FormData Cada uma delas
    Object.keys(newResponse).forEach((key: string) => {
      //trocar o valor da propriedade
      response![key] = newResponse[key];
      //atualiza o formResponse
      setFormResponse(response);
      //verifica se tem resposta no objeto
      if (form![key].answerValue) {
        //guarda o novo valor
        form![key].answerValue = newResponse[key];
        //definir o formulario com o novo answersValue
        setFormData(form);
      }
    });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsOpenModal(true);

    updateForm({ multipleChoiceBadge: selectedItems })
    console.log('Resposta:', {
      ...formResponse,
      multipleChoiceBadge: selectedItems,
      multipleChoiceCheckbox: multipleChoiceCheckboxSelected,
    });
  }

  async function handleSubmitFake() {
    try {
      const jsonResponse: any[] = [];
      Object.keys(formResponse!).forEach((key) => {
        jsonResponse.push({ [key]: formResponse![key] })
      });
      if (jsonResponse) {
        console.log("Formulário válido, enviando dados:", jsonResponse);
        toast.success('Formulário enviado com sucesso');
      } else {
        console.log("Formulário inválido, verifique os campos.");
        toast.error('Houve um erro ao enviar o formulário');
      }
    } catch (error) {
      console.error('Ocorreu um erro ao processar o formulário:', error);
      toast.error('Ocorreu um erro ao processar o formulário');
    }
  }

  async function handleSubmitError() {
    try {
      const apiUrl = "https://fdlmx-backgrounds.sfo3.digitaloceanspaces.com/front-test/survey-post-error.json";
      const response = await axios.get(apiUrl);
      toast.error(response.data.error)
      console.log(response.data.error);
    } catch (error) {
      console.error('Error GET on Submit Error:', error);
    }
  }

  async function handleSubmitSuccess() {
    try {
      const apiUrl = "https://fdlmx-backgrounds.sfo3.digitaloceanspaces.com/front-test/survey-post-success.json";
      const response = await axios.get(apiUrl);
      toast.success('Formulário enviado com sucesso')
      console.log(response.data);
    } catch (error) {
      toast.error(String(error))
      console.error('Error GET on Submit Error:', error);
    }
  }

  // LOADING...
  if (!formData || !formResponse) {
    return (
      <div className="absolute left-1/2">
        <Spinner size="lg" color="warning" className="-mt-4" />
      </div>
    )
  }

  const handleTextChange = (key: string, newValue: string) => {
    setFormData(prevFormData => {
      if (!prevFormData) return null;
      return {
        ...prevFormData,
        [key]: {
          ...prevFormData[key],
          answerValue: newValue
        }
      };
    });
  };


  const handleCheckBadgeChange = (value: string, checked: boolean) => {
    if (checked) {
      setSelectedItems((prevSelectedItems) => [...prevSelectedItems, value]);
    } else {
      setSelectedItems((prevSelectedItems) =>
        prevSelectedItems.filter((item) => item !== value)
      );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center -mt-[calc(316px-128px)] pb-8 sm:px-4 md:px-0">
      <div className="max-w-[792px]">
        <h2 className="text-white font-semibold pb-6 leading-10 sm:text-[25px] md:text-[40px] text-start w-full">
          Pesquisa de Satisfação
        </h2>

        <div className="flex items-center justify-center">
          <main className="p-8 bg-white rounded-2xl sm:w-[300px] 2sm:w-[400px] md:w-[648px]">
            <form onSubmit={handleSubmit}>

              {Object.keys(formData).map((key) => {
                const typeQuestion = formData[key]?.typeQuestion;
                if (typeQuestion !== undefined) {
                  switch (typeQuestion) {
                    case 1:
                      return <StarComponent
                        key={key}
                        initialValue={formData.stars.answerValue}
                        updateForm={updateForm}
                      />;
                    case 2:
                      return <RadioComponent
                        key={key}
                        content={formData[key].content}
                        initialValue={formData[key].answerValue}
                        onRadioChange={(data) => { updateForm({ radio: Number(data) }) }}
                      />;
                    case 3:
                      console.log('FormResponse Value:', formData[key]?.answerValue);
                      return (
                        <React.Fragment>
                          {formData[key]?.answerValue === undefined ? (
                            <ReviewComponent
                              key={key}
                              content={formData[key].content}
                              initialValue={formData[key].answerValue}
                              onChange={(data: any) => updateForm({ review: data!.target.value })}
                            />
                          ) : (
                            <TextComponent
                              key={key}
                              content={formData[key].content}
                              initialValue={formData[key].answerValue}
                              onChange={(data: any) => handleTextChange(key, data)}
                            />
                          )}
                        </React.Fragment>
                      );
                    case 4:
                      return <SelectComponent
                        key={key}
                        content={formData[key].content}
                        initialValue={formData[key].answerValue}
                        onChange={(value) => {
                          updateForm({ select: value === '' ? undefined : value });
                          console.log(formResponse);
                        }}
                        data={formData[key].itens}
                      />
                    case 5:
                      return <SingleChoiceComponent
                        key={key}
                        content={formData[key].content}
                        initialValue={formData[key].answerValue}
                        onChange={(data) => updateForm({ singleChoice: Number(data) })}
                        label1={formData.singleChoice.itens[0].description}
                        label2={formData.singleChoice.itens[1].description}
                      />
                    case 6:
                      if (formData[key].horizontal) {
                        return <Badge
                          key={key}
                          data={formData[key].itens}
                          horizontal
                          onMultipleChange={(value: any, checked: boolean) => handleCheckBadgeChange(value, checked)}
                        />
                      } else {
                        return <CheckboxComponent
                          key={key}
                          data={formData[key].itens}
                          onChange={(e) => { updateForm({ multipleChoiceCheckbox: e as number[] }) }}
                        />
                      }
                    default:
                      return null;
                  }
                }
                return null;
              })}

              <button type="submit" className="bg-yellow text-lg rounded-full py-[10px] px-16 font-bold text-blue-800 hover:bg-opacity-85">
                Enviar
              </button>

              <div className="sm:grid sm:grid-rows-3 md:flex gap-4 pt-10">
                <button
                  onClick={handleSubmitFake}
                  className="bg-yellow text-base rounded-full py-[10px] px-8 font-bold text-blue-800 shadow-md">
                  Enviar Fake Pos
                </button>
                <button
                  onClick={handleSubmitError}
                  className="bg-[#FC4737] text-base rounded-full py-[10px] px-8 font-bold text-blue-800 shadow-md">
                  Enviar Erro
                </button>
                <button
                  onClick={handleSubmitSuccess}
                  className="bg-[#04D361] text-base rounded-full py-[10px] px-8 font-bold text-blue-800 shadow-md"
                >Enviar Sucesso</button>
              </div>
            </form>
          </main>
        </div>
      </div>
      <ModalSubmit
        isOpen={isOpenModal}
        onClose={() => { setIsOpenModal(false) }}
        stars={Number(formResponse!.stars)}
        radio={Number(formResponse!.radio)}
        review={String(formResponse!.review)}
        select={String(formResponse!.select)}
        singleChoice={Number(formResponse!.singleChoice)}
        badge={formResponse?.multipleChoiceBadge}
        checkbox={formResponse.multipleChoiceCheckbox}
        text1={String(formResponse!.textQuestion1)}
        text2={String(formResponse!.textQuestion2)}
      />
    </div>
  )
}

export default Content;