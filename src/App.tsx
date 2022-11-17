import { useEffect, useState } from "react";
import { Activity } from "./components/Activity";
import { fetchActivityByUuid } from "./supabase";
import { addQueryParamToURL, getFavorites, uuidInQueryParam } from "./utils";

interface Favorite {
  uuid: string,
  name: string,
  gathering_location: string,
  gathering_time: string,
  people: string[],
  cars: { [key: string]: string[]; };
}

const App = () => {
  const favoriteUuids = getFavorites();
  const [isLoading, setIsLoading] = useState(false);
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [shouldRenderActivityPage, setShouldRenderActivityPage] = useState(Boolean(uuidInQueryParam));

  useEffect(() => {
    const run = async () => {
      if (uuidInQueryParam) return;
      const result = [];
      setIsLoading(true);
      for (const uuid of favoriteUuids) {
        const val = await fetchActivityByUuid(uuid);
        result.push(val);
      }
      setFavorites(result);
      setIsLoading(false);
    };
    run();
  }, []);

  if (isLoading) return <h1 className="m-4 text-center">Loading...</h1>;

  const boxStyles = "p-4 text-center rounded cursor-pointer";

  if (uuidInQueryParam || shouldRenderActivityPage) return <Activity />;
  return (
    <main className="flex flex-col flex-wrap gap-4 justify-between p-8">
      <button className={`${boxStyles} bg-blue-100`} onClick={() => setShouldRenderActivityPage(true)}>Create activity</button>
      {Object.values(favorites).map(activity => {
        return (
          <section key={activity.uuid} className={`${boxStyles} bg-yellow-200`} onClick={() => addQueryParamToURL("uuid", activity.uuid)}>
            <span>{activity.name}</span>
          </section>
        );
      })}
    </main>
  );
};

export default App;
