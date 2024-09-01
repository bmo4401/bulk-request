'use server';
import { createMockRecords } from '@/mock/createMockRecords';

const chunkArray = ({ array, size }: { array: Array<any>; size: number }) => {
  const result = [];
  for (let i = 0; i < array.length; i += size) {
    result.push(array.slice(i, i + size));
  }
  return result;
};

export const updateRecords = async ({
  numberOfRecords,
  chunkSize,
}: {
  numberOfRecords: number;
  chunkSize: number;
}) => {
  const payload = await createMockRecords({ numberOfRecords });
  const chunks = chunkArray({ array: payload, size: chunkSize });
  console.log(chunks.length);
  for (let i = 0; i < chunks.length; i++) {
    try {
      console.log(i);
      const res = await fetch('http://localhost:3001/api/update-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(chunks[i]),
      });

      console.log(await res.json());
    } catch (error) {
      console.error(`Failed to send chunk ${i + 1}:`, error);
      break; // Optional: Stop sending if there's an error
    }
  }
};
