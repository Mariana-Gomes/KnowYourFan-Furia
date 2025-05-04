export async function fetchAddressByCep(cep: string) {
  try {
    const response = await fetch(`https://brasilapi.com.br/api/cep/v2/${cep}`);
    if (!response.ok) {
      throw new Error("CEP não encontrado");
    }
    const data = await response.json();
    return {
      state: data.state,
      city: data.city,
      neighborhood: data.neighborhood,
      street: data.street,
    };
  } catch (error) {
    throw new Error("CEP inválido ou não encontrado.");
  }
}
