import { updateRecords } from '@/mock/updateRecords';

export default async function Home() {
  const res = await updateRecords({ numberOfRecords: 100000, chunkSize: 3000 });
  console.log(res);
  return <div>hello</div>;
}
