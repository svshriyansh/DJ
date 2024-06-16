export async function customFetch(...params) {
  console.log("inside cusom fetch");
  const response = await fetch(...params);
  return response.json();
}
