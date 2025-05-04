import "../App.css";

import { Sidebar } from "../components/Sidebar";
import { Steps } from "../components/Steps";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

import { Header } from "../components/Header";
import { FormInput } from "../components/Input";
import { fetchAddressByCep } from "../utils/fetchAddressByCep";

import {
  formatCpf,
  maskCep,
  formatPhone,
  isValidCPF,
} from "../utils/validations";
import { CheckboxList } from "../components/CheckBox";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { useAuth } from "../hooks/useAuth";
import { recognize } from "tesseract.js";
import { File, SealCheck } from "@phosphor-icons/react";
import { Loading } from "../components/Loading";

const schema = yup.object().shape({
  phone: yup
    .string()
    .required("O telefone é obrigatório")
    .matches(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Formato de telefone inválido"),
  cpf: yup
    .string()
    .required("O CPF é obrigatório")
    .test(
      "is-valid-cpf",
      "CPF inválido",
      (value) => !!value && isValidCPF(value)
    ),
  cep: yup
    .string()
    .required("O CEP é obrigatório")
    .matches(/^\d{5}-\d{3}$/, "CEP inválido"),
  state: yup.string().required("O estado é obrigatório"),
  city: yup.string().required("A cidade é obrigatória"),
  neighborhood: yup.string().required("O bairro é obrigatório"),
  street: yup.string().required("O endereço é obrigatório"),
  number: yup
    .string()
    .required("O número é obrigatório")
    .matches(/^\d+$/, "Informe apenas números"),
  complement: yup
    .string()
    .notRequired()
    .max(100, "O complemento deve ter no máximo 100 caracteres"),
  furiaTeams: yup.array().of(yup.string()).notRequired(),
  furiaProducts: yup.array().of(yup.string()).notRequired(),
  documentVerified: yup.boolean(),
});

export function Profile() {
  const { user, updateUserData, showToast } = useAuth();
  const [step, setStep] = useState(1);
  const [uploadedDocument, setUploadedDocument] = useState("");
  const [isReadingDocument, setIsReadingDocument] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);

  const {
    handleSubmit,
    control,
    setValue,
    setError,
    clearErrors,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      phone: user?.phone ?? "",
      cpf: user?.cpf ?? "",
      cep: user?.cep ?? "",
      state: user?.state ?? "",
      city: user?.city ?? "",
      neighborhood: user?.neighborhood ?? "",
      street: user?.street ?? "",
      number: user?.number ?? "",
      complement: user?.complement ?? "",
      furiaTeams: user?.furiaTeams ?? [],
      furiaProducts: user?.furiaProducts ?? [],
      documentVerified: user?.documentVerified ?? false,
    },
  });

  const handleNextStep = async () => {
    if (step === 1) {
      const isFirstStepValid = await trigger(["cpf", "phone"]);
      if (!isFirstStepValid) return;
      return setStep(step + 1);
    }

    if (step === 2) {
      const isSecondStepValid = await trigger([
        "cep",
        "state",
        "city",
        "neighborhood",
        "street",
        "number",
        "complement",
      ]);
      if (!isSecondStepValid) return;

      return setStep(step + 1);
    }

    if (step === 3) {
      return setStep(step + 1);
    }
  };
  const handlePreviousStep = () => setStep(step - 1);

  const onSubmit = async (data) => {
    try {
      if (user?.uid) {
        const userRef = doc(db, "usuarios", user.uid);

        await updateDoc(userRef, { ...data, isRegisterCompleted: true });

        console.log("Usuário atualizado com sucesso!");

        updateUserData();
      }
    } catch (error) {
      console.error("Erro ao atualizar o usuário: ", error);
    }
  };

  async function handleFetchAddress(cep: string) {
    try {
      setIsLoadingAddress(true);
      const data = await fetchAddressByCep(cep);

      setValue("state", data.state);
      setValue("city", data.city);
      setValue("neighborhood", data.neighborhood);
      setValue("street", data.street);
    } catch (error) {
      const message = error?.message
        ? error.message
        : "CEP inválido ou não encontrado";
      setError("cep", {
        type: "manual",
        message,
      });
    } finally {
      setIsLoadingAddress(false);
    }
  }

  const handleUploadDocument = async (file: File) => {
    setIsReadingDocument(true);
    if (!file) return;
    setUploadedDocument(file.name);
    const documentVerified = await verifyDocument(file);
    if (!documentVerified) {
      showToast(
        "Seu documento não pode ser verificado, tente novamente mais tarde!"
      );
    } else {
      showToast("Seu documento foi verificado com sucesso!", false);
    }
    setValue("documentVerified", documentVerified);
    setIsReadingDocument(false);
  };

  const verifyDocument = async (file: File) => {
    const { data } = await recognize(file, "por");

    if (!data.text) return false;
    const cpf = getValues("cpf");
    const hasDocument = data.text.includes(cpf);
    return hasDocument;
  };

  if (isReadingDocument) return <Loading />;

  return (
    <>
      <div className="w-full">
        <Header />
      </div>

      <div
        className={
          "max-w-[70rem] mx-auto my-8 px-4 gap-8 items-start justify-center flex max-md:block"
        }
      >
        <Sidebar />
        <div className="space-y-6 max-md:mt-5 ">
          <div className="flex flex-col gap- w-full md:max-w-xl p-20 rounded-2xl bg-[#252525] ">
            <Steps steps={["1", "2", "3", "4"]} currentStep={step} />
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col gap-4 w-full"
            >
              {step === 1 && (
                <>
                  <h1 className="text-left font-bold text-3xl text-white">
                    Dados pendentes
                  </h1>
                  <p className="text-left mb-10 text-base text-white">
                    Preencha os dados pendentes para desbloquear o selo de fã
                    oficial da <span className="font-bold">FURIA</span>!
                  </p>

                  <div className="flex flex-col gap-4">
                    <Controller
                      name="phone"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <FormInput
                            {...field}
                            placeholder="Telefone"
                            margin
                            error={errors?.phone?.message}
                            onChange={(e) => {
                              const formattedPhone = formatPhone(
                                e.target.value
                              );
                              field.onChange(formattedPhone);
                            }}
                          />
                        </>
                      )}
                    />

                    <Controller
                      name="cpf"
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <>
                          <FormInput
                            {...field}
                            placeholder="CPF"
                            error={errors?.cpf?.message}
                            maxLength={14}
                            onChange={(e) => {
                              const formattedCPF = formatCpf(e.target.value);

                              field.onChange(formattedCPF);
                            }}
                          />
                        </>
                      )}
                    />
                  </div>
                </>
              )}

              {step === 2 && (
                <div className="flex flex-col gap-4">
                  <h1 className="text-left font-bold text-3xl text-white">
                    Endereço
                  </h1>
                  <p className="text-left mb-10 text-base text-white">
                    Preencha os dados pendentes para desbloquear o selo de fã
                    oficial da <span className="font-bold">FURIA</span>!
                  </p>
                  <Controller
                    name="cep"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <FormInput
                          {...field}
                          placeholder="CEP"
                          error={errors?.cep?.message}
                          isLoading={isLoadingAddress}
                          onChange={(e) => {
                            const maskedCep = maskCep(e.target.value);
                            field.onChange(maskedCep);

                            if (maskedCep.length < 9) {
                              clearErrors("cep");
                              return;
                            }

                            if (maskedCep.length === 9) {
                              handleFetchAddress(maskedCep);
                            }
                          }}
                        />
                      </>
                    )}
                  />

                  <div className="flex justify-between mt-8 max-md:block ">
                    <div className="w-30 max-md:w-full max-md:mb-12">
                      <Controller
                        name="state"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <FormInput
                              {...field}
                              placeholder="Estado"
                              error={errors?.state?.message}
                              readOnly
                              isLoading={isLoadingAddress}
                            />
                          </>
                        )}
                      />
                    </div>

                    <div className="w-70 max-md:w-full">
                      <Controller
                        name="city"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <FormInput
                              {...field}
                              placeholder="Cidade"
                              error={errors?.city?.message}
                              readOnly
                              margin
                              isLoading={isLoadingAddress}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <Controller
                    name="street"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <FormInput
                          {...field}
                          placeholder="Rua"
                          error={errors?.street?.message}
                          readOnly
                          margin
                          isLoading={isLoadingAddress}
                        />
                      </>
                    )}
                  />

                  <div className="flex justify-between max-md:block">
                    <div className="w-60 max-md:w-full max-md:mb-12">
                      <Controller
                        name="neighborhood"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <FormInput
                              {...field}
                              placeholder="Bairro"
                              error={errors?.neighborhood?.message}
                              readOnly
                              margin
                              isLoading={isLoadingAddress}
                            />
                          </>
                        )}
                      />
                    </div>

                    <div className="w-40 max-md:w-full">
                      <Controller
                        name="number"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <>
                            <FormInput
                              {...field}
                              placeholder="Nº"
                              margin
                              error={errors?.number?.message}
                            />
                          </>
                        )}
                      />
                    </div>
                  </div>

                  <Controller
                    name="complement"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <>
                        <FormInput
                          {...field}
                          placeholder="Complemento"
                          error={errors?.complement?.message}
                          value={field.value ?? ""}
                          margin
                        />
                      </>
                    )}
                  />
                </div>
              )}

              {step === 3 && (
                <div className="flex flex-col gap-4">
                  <h1 className="text-left font-bold text-3xl text-white">
                    Interesses
                  </h1>
                  <p className="text-left mb-10 text-base text-white">
                    Preencha os dados pendentes para desbloquear o selo de fã
                    oficial da <span className="font-bold">FURIA</span>!
                  </p>
                  <Controller
                    name="furiaTeams"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <CheckboxList
                        title="Quais times da FURIA você acompanha?"
                        options={[
                          "Counter Strike 2",
                          "Valorant",
                          "Rainbow Six",
                          "League of Legends",
                          "Rocket League",
                          "Apex Legends",
                          "PUBG",
                        ]}
                        selectedOptions={(field.value as string[]) ?? []}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="furiaProducts"
                    control={control}
                    defaultValue={[]}
                    render={({ field }) => (
                      <CheckboxList
                        title={
                          "Você já comprou algum item na loja da FURIA? Se sim, quais?"
                        }
                        options={[
                          "Camisa",
                          "Boné",
                          "Calça",
                          "Meia",
                          "Jaqueta",
                          "Mochila",
                          "Shorts",
                          "Moletom",
                        ]}
                        selectedOptions={(field.value as string[]) ?? []}
                        onChange={field.onChange}
                      />
                    )}
                  />
                </div>
              )}

              {step === 4 &&
                (!user.documentVerified ? (
                  <div className="flex flex-col gap-4">
                    <h1 className="text-left font-bold text-3xl text-white">
                      Documentos
                      <span className="text-sm text-white/70 ml-1">
                        (Opcional)
                      </span>
                    </h1>
                    <p className="text-left text-base text-white">
                      Preencha os dados pendentes para desbloquear o selo de fã
                      oficial da <span className="font-bold">FURIA</span>!
                    </p>

                    <p className="text-white">
                      Nessa etapa final você deve enviar um dos seguintes
                      documentos:
                      <span className="font-bold"> RG, CPF ou CNH</span>.
                    </p>

                    <div
                      onDrop={(e) => {
                        e.preventDefault();
                        const file = e.dataTransfer.files?.[0];
                        if (file) handleUploadDocument(file);
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      className="border-2 border-dotted mt-5 border-white rounded-lg p-6 flex flex-col items-center justify-center text-white cursor-pointer hover:bg-white/10 transition"
                    >
                      <p className="mb-4 text-center text-sm w-70 text-white/70">
                        Arraste o documento aqui ou clique abaixo para
                        selecionar
                      </p>

                      <label className="bg-blue-500  hover:bg-blue-700 text-white px-4 py-2 rounded cursor-pointer">
                        Selecionar
                        <input
                          type="file"
                          accept=".jpg,.jpeg,.png,.pdf"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleUploadDocument(file);
                          }}
                          className="hidden"
                        />
                      </label>
                    </div>

                    {uploadedDocument && (
                      <p className="text-white mt-4 flex flex-row">
                        Documento enviado:
                        <File size={25} className="ml-1" />
                        <span className="font-medium">{uploadedDocument}</span>
                      </p>
                    )}
                  </div>
                ) : (
                  <div>
                    <h1 className="text-center font-bold text-3xl text-white mb-4">
                      Parabéns!
                    </h1>
                    <p className="text-center text-base text-white">
                      Seu documento já está validado e por isso, você ganhou o
                      selo de fã oficial da{" "}
                      <span className="font-bold">FURIA</span>!
                    </p>
                    <div className="flex flex-row items-center justify-center mt-4">
                      <SealCheck size={30} className="text-blue-500 mr-1" />
                      <p className="font-bold text-white text-2xl">
                        {user.name}
                      </p>
                    </div>
                  </div>
                ))}

              <div className="flex justify-between mt-10 max-sm:block">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={handlePreviousStep}
                    className="bg-gray-400 text-white p-2 rounded w-40 hover:bg-gray-500 cursor-pointer max-sm:w-full max-sm:mb-4"
                  >
                    Voltar
                  </button>
                )}
                {step < 4 && (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="bg-blue-500 w-40 text-white p-2 rounded hover:bg-blue-700 cursor-pointer max-sm:w-full"
                  >
                    Próximo
                  </button>
                )}
                {step === 4 && (
                  <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded w-50 hover:bg-blue-700 cursor-pointer max-sm:w-full"
                  >
                    Enviar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
