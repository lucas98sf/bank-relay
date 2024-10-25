import {
  Environment,
  Network,
  RecordSource,
  Store,
  FetchFunction,
} from "relay-runtime";

const fetchFn: FetchFunction = async (request, variables) => {
  const resp = await fetch(import.meta.env.VITE_API_URL, {
    method: "POST",
    headers: {
      Accept:
        "application/graphql-response+json; charset=utf-8, application/json; charset=utf-8",
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      query: request.text,
      variables,
    }),
  });

  return await resp.json();
};

function createRelayEnvironment() {
  return new Environment({
    network: Network.create(fetchFn),
    store: new Store(new RecordSource()),
  });
}

export const RelayEnvironment = createRelayEnvironment();
