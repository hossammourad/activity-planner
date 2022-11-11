import { createClient } from '@supabase/supabase-js';

const supabase = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY);

export const createActivity = async (
  uuid: string,
  name: string,
  gathering_location: string,
  gathering_time: string,
  people: string[],
  cars: { [key: string]: string[]; }
) => {
  await supabase
    .from('activities')
    .insert({
      uuid,
      created_at: new Date().toISOString(),
      name,
      gathering_location,
      gathering_time,
      people: JSON.stringify(people),
      cars: cars
    });
};

interface T {
  uuid: string;
  activityName?: string;
  gatheringLocation?: string;
  gatheringTime?: string;
  people?: string[];
  cars?: { [key: string]: string[]; };
}
export const modifyActivity = async ({ uuid, activityName, gatheringLocation, gatheringTime, people, cars }: T) => {
  await supabase
    .from('activities')
    .update({
      created_at: new Date().toISOString(),
      name: activityName,
      gathering_location: gatheringLocation,
      gathering_time: gatheringTime,
      people: JSON.stringify(people),
      cars: cars
    })
    .eq('uuid', uuid);
};

export const fetchActivityByUuid = async (uuid: string) => {
  const { data } = await supabase
    .from('activities')
    .select()
    .eq('uuid', uuid);
  return data && data[0];
};
