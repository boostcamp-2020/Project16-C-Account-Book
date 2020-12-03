import { getFetch, postFetch } from '../service/fetch';

export default async function getAccountBookList() {
  const backendPath = process.env.SERVER_URL;
  const data = await getFetch(`${backendPath}/api/accountbook`);
  return data.reverse();
}
