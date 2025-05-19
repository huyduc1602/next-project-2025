// API utility functions
export async function fetcher(url: string) {
  // Fetch data from API
  const res = await fetch(url);
  return res.json();
}
