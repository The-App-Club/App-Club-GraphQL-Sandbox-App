import useSWR from 'swr';

export function useGraphql(key: any) {
  const fetcher = async (query: any) => {
    const res = await fetch('/api/graphql', {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify({query}),
    });
    if (!res.ok) throw new Error('An error occurred while fetching the data.');

    const json = await res.json();
    return json.data;
  };
  return useSWR(key, fetcher);
}
