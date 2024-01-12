'use client'
import { Stars } from "@/app/components/stars";
import { useEffect, useState } from "react";
import { RadioGroup } from "@/app/components/radio-group";
import { RadioGroupConst } from "@/app/constants/radio-group";
import axios from "axios";
import { CheckBadge } from "@/app/components/check-badge";
import { Select, SelectItem, Spinner } from "@nextui-org/react";
import toast from "react-hot-toast";
import { ModalSubmit } from "./modal";
import { APIProps, FormType, FormularioObjeto, ItensProps } from "../models/api-form";
import { StarComponent } from "./star-component";
import { RadioComponent } from "./radio-component";
import { ReviewComponent } from "./review-component";
import { SelectComponent } from "./select-component";
import { SingleChoiceComponent } from "./single-choice-component";
import { Badge } from "./badge";
import { TextComponent } from "./text-component";
import { CheckboxComponent } from "./checkbox-component";

const Content = () => {
  const [data, setData] = useState<FormularioObjeto | null>(null);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [multipleChoiceCheckboxSelected, setMultipleChoiceCheckboxSelected] = useState<number[]>([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  useEffect(() => {
    const fetchSurveyData = async () => {
      try {
        const apiUrl = "https://fdlmx-backgrounds.sfo3.digitaloceanspaces.com/front-test/survey.json";
        const response = await axios.get<APIProps>(apiUrl);
        const itens: ItensProps[] = response.data.itens!;
        setData({
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
  const [formValues, setFormValues] = useState<FormType | undefined>(undefined)

  const updateForm = (formData: Partial<FormType>) => {
    const datavalue = data;
    Object.keys(formData).forEach((key: string) => {
      datavalue![key].answerValue = formData[key]
      console.log(formData);
    })

    setData(datavalue);
  }

  const handleCheckBadgeChange = (value: number, selected: any) => {
    setSelectedItems((prevSelectedItems) =>
      selected
        ? [...prevSelectedItems, value]
        : prevSelectedItems.filter((item) => item !== value)
    );
  };

  const handleCheckboxChange = (value: any, checked: any) => {
    if (checked) {
      setMultipleChoiceCheckboxSelected((prevSelected) => [...prevSelected, value]);
    } else {
      setMultipleChoiceCheckboxSelected((prevSelected) =>
        prevSelected.filter((item) => item !== value)
      );
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsOpenModal(true);

    setData({ ...data, multipleChoiceBadge: { ...data?.multipleChoiceBadge, itens: selectedItems } })

    console.log('Resposta:', data);
  }

  async function handleSubmitFake() {
    try {
      updateForm({ multipleChoiceBadge: (selectedItems ?? []), multipleChoiceCheckbox: (multipleChoiceCheckboxSelected ?? []) })

      const data =
        formValues!.stars !== 0 &&
        formValues!.radio !== null &&
        formValues!.review !== "" &&
        formValues!.select !== null &&
        formValues!.singleChoice !== undefined &&
        formValues!.multipleChoiceBadge.length > 0 &&
        formValues!.multipleChoiceCheckbox.length > 0 &&
        formValues!.textQuestion1 !== "" &&
        formValues!.textQuestion2 !== "";

      if (data) {
        console.log("Formulário válido, enviando dados:", formValues);
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
  if (!data) {
    return (
      <div className="absolute left-1/2">
        <Spinner size="lg" color="warning" className="-mt-4" />
      </div>
    )
  }

  const getSelectedBadges = () => {
    return data?.multipleChoiceBadge.itens
      .filter((item) => selectedItems.includes(item.value))
      .map((item) => item.value);
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

              {/* Stars */}
              {Object.keys(data).map((key) => {
                const typeQuestion = data[key]?.typeQuestion;
                if (typeQuestion !== undefined) {
                  switch (typeQuestion) {
                    case 1:
                      return <StarComponent
                        key={key}
                        initialValue={data[key].answerValue}
                      />;
                    case 2:
                      return <RadioComponent
                        key={key}
                        content={data[key].content}
                        initialValue={data[key].answerValue}
                        onRadioChange={(data) => { updateForm({ radio: Number(data) }) }}
                      />;
                    case 3:
                      if (data[key].answerValue) {
                        return <TextComponent
                          key={key}
                          initialValue={data[key].answerValue}
                          onChange={(e) => { setData({ ...data, textQuestion1: { ...data.textQuestion1, answerValue: e.target.value } }) }} />
                      } else {
                        return <ReviewComponent
                          key={key}
                          content={data[key].content}
                          initialValue={data[key].answerValue}
                          onChange={(data) => updateForm({ review: data.target.value })}
                        />;
                      }
                    case 4:
                      return <SelectComponent
                        key={key}
                        content={data[key].content}
                        initialValue={data[key].answerValue}
                        onChange={(data) => updateForm({ review: data.target.value })}
                        data={data[key].itens}
                      />;
                    case 5:
                      return <SingleChoiceComponent
                        key={key}
                        content={data[key].content}
                        initialValue={data[key].answerValue}
                        onChange={(data) => updateForm({ review: data.target.value })}
                        checked={data!.singleChoice.answerValue === data!.singleChoice.itens[0].value}
                        label1={data!.singleChoice.itens[0].description}
                        label2={data!.singleChoice.itens[1].description}
                      />;
                    case 6:
                      if (data[key].horizontal) {
                        return <Badge
                          key={key}
                          data={data[key].itens}
                          horizontal
                          onChange={() => handleCheckBadgeChange}
                        />
                      } else {
                        return <CheckboxComponent
                          key={key}
                          data={data[key].itens}
                          onChange={() => handleCheckBadgeChange}
                        />
                      }
                    default:
                      return null;
                  }
                }
                return null;
              })}

              {/* Multiple Choice Badge */}
              {/* <section>
                <div className="pt-10 text-blue-800">
                  <h2>Questões de seleção múltipla</h2>
                  <div className={`${data!.multipleChoiceBadge.horizontal ? 'sm:grid sm:grid-cols-2 md:flex gap-4' : 'flex flex-col gap-2'} pt-2`}>
                    {data!.multipleChoiceBadge.itens.map((item: any, index: any) => (
                      <CheckBadge
                        key={index}
                        value={item.value}
                        description={item.description}
                        horizontal={(data!.multipleChoiceBadge.horizontal ?? true)}
                        selected={selectedItems.includes(item.value)}
                        onChange={handleCheckBadgeChange}
                      />
                    ))}
                  </div>
                </div>
              </section> */}

              {/*  Single Choice*/}
              {/* <section>
                <div className="pt-10 text-blue-800">
                  <h2>{data!.singleChoice.content}</h2>
                  <div className="space-x-4 pt-2">
                    <input
                      type="radio"
                      name="singleChoice"
                      value={data!.singleChoice.itens[0].value}
                      checked={data!.singleChoice.answerValue === data!.singleChoice.itens[0].value}
                      onChange={(e) => setData({ ...data, singleChoice: { ...data.singleChoice, answerValue: data.singleChoice.itens[0].value } })}
                    />
                    <label>{data!.singleChoice.itens[0].description}</label>

                    <input
                      type="radio"
                      name="singleChoice"
                      value={data!.singleChoice.itens[1].value}
                      checked={data!.singleChoice.answerValue === data!.singleChoice.itens[1].value}
                      onChange={(e) => setData({ ...data, singleChoice: { ...data.singleChoice, answerValue: data.singleChoice.itens[1].value } })}
                    />
                    <label>{data!.singleChoice.itens[1].description}</label>
                  </div>
                </div>
              </section> */}


              {/* Multiple Choice Checkbox */}
              {/* <section>
                <div className="pt-10 text-blue-800">
                  <h2>Questões de seleção múltipla</h2>
                  {data &&
                    data.multipleChoiceCheckbox.itens.map((item: any, index: any) => (
                      <div key={index} className="flex items-center pt-2 gap-2">
                        <input
                          type="checkbox"
                          id={item.value}
                          value={item.value}
                          checked={multipleChoiceCheckboxSelected.includes(item.value)}
                          onChange={(e) => {
                            setSelectedItems([e.target.checked
                              ? selectedItems.filter((item: number) => item !== e.target.value)
                              : [...selectedItems, e.target.value]
                            ]);
                          }}
                        />
                        <label className="text-sm">{item.description}</label>
                      </div>
                    ))}
                </div>
              </section> */}

              {/* Text Question 1 */}
              {/* <section>
                <div className="py-10 space-y-2">
                  <h2 className="text-blue-800">
                    Questões de texto
                  </h2>
                  <textarea
                    value={data.textQuestion1.answerValue}
                    onChange={(e) => { setData({ ...data, textQuestion1: { ...data.textQuestion1, answerValue: e.target.value } }) }}
                    placeholder="Digite aqui..."
                    className="h-[168px] w-full p-4 border border-gray-200 rounded-lg resize-none outline-none text-blue-400"
                  />
                </div>
              </section> */}

              {/* Submit Button */}
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
        onClose={() => { setIsOpenModal(false), console.log(data) }}
        stars={Number(data!.stars.answerValue)}
        radio={Number(data!.radio.answerValue)}
        review={String(data!.review.answerValue)}
        select={String(data!.select.answerValue)}
        singleChoice={Number(data!.singleChoice.answerValue)}
        badge={getSelectedBadges()}
        checkbox={data.multipleChoiceCheckbox.answerValue}
        text1={String(data!.textQuestion1.answerValue)}
        text2={String(data!.textQuestion2.answerValue)}
      />
    </div>
  )
}

export default Content;