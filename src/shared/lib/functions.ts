export const createAbortSignal = (timeout = 5000): AbortSignal => {
  const controller = new AbortController();
  const signal = controller.signal;

  // Cancel the fetch request in ms
  setTimeout(() => controller.abort(), timeout);

  return signal;
};

/* eslint-disable no-useless-escape */
export function linkifyText(inputText: string): string {
  let replacedText;

  // URLs starting with http://, https://, or ftp://

  replacedText = inputText.replace(
    /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim,
    '<a href="$1" target="_blank">$1</a>'
  );

  // URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacedText = replacedText.replace(
    /(^|[^\/])(www\.\S+(\b|$))/gim,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  // Change email addresses to mailto:: links.
  replacedText = replacedText.replace(
    /(([a-zA-Z0-9\-_\S.])+@[a-zA-Z_]+?(\.[a-zA-Z]{2,6})+)/gim,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
}
