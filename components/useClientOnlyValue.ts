export function useClientOnlyValue<S, C>(_: S, client: C): S | C {
  return client;
}
