export function callDonnaBackendAPI(
  customerPrompt: string,
  rewriteType: string
): Promise<Response> {
  console.log(
    `Starting call with rewriteType: ${rewriteType} and customerPrompt: ${customerPrompt}`
  );
  const data = {
    customer_prompt: customerPrompt,
    rewrite_type: rewriteType.toLowerCase(),
  };
  const myUrl = "PLACEHOLDER_URL";
  return fetch(myUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      "x-api-key": "PLACEHOLDER_KEY",
    },
  });
}
