import { useState } from "react";

const App = () => {
  const [people, setPeople] = useState<string[]>([]);
  const [cars, setCars] = useState<{ [key: string]: string[]; }>({});
  const [draggedPersonName, setDraggedPersonName] = useState("");

  const renderCars = () => {
    return Object.keys(cars).map(x => {
      return (
        <span
          key={x}
          className="border p-4 rounded"
          onDragOver={e => e.preventDefault()}
          onDrop={(e) => onDrop(e, x)}
        >
          <p className="font-semibold" onDrop={(e) => onDrop(e, x)}>{x}</p>
          {cars[x].length > 0 &&
            <span className="flex gap-2 mt-2 flex-wrap" onDrop={(e) => onDrop(e, x)}>
              {cars[x].map(y => (
                <span key={y} onDrop={(e) => onDrop(e, x)} draggable onDragStart={() => onDragStart(y)} className="bg-slate-100 px-4 py-2 rounded">
                  {y}
                </span>
              ))}
            </span>
          }
        </span>
      );
    });
  };

  const renderPeople = () => {
    return people.map(x => {
      return <span key={x} className="border px-4 py-2 rounded" draggable onDragStart={() => onDragStart(x)}>{x}</span>;
    });
  };

  const onDragStart = (name: string) => {
    setDraggedPersonName(name);
  };

  const onDrop = (e: React.DragEvent, carName: string) => {
    e.stopPropagation();
    if (cars[carName].includes(draggedPersonName)) return;

    // find if the dragged person already exists in a car
    // if so, remove the person from the existing car
    // then add to the new car passed in the carName function argument
    const carsClone = { ...cars };
    const existingCar = Object.keys(carsClone).find(key => carsClone[key].includes(draggedPersonName));
    if (existingCar) {
      carsClone[existingCar] = carsClone[existingCar].filter(x => x !== draggedPersonName);
    }
    setCars({ ...carsClone, [carName]: [...carsClone[carName], draggedPersonName] });

    setDraggedPersonName("");
  };

  const addPeopleOnClick = () => {
    const value = window.prompt("Enter your name", "");
    if (!value?.length) return;
    if (people.includes(value)) {
      alert("This name already exists");
      return;
    }
    setPeople([...people, value]);
  };

  const addCarOnClick = () => {
    const value = window.prompt("Are you bringing your car? Enter your name", "");
    if (!value?.length) return;
    if (Object.keys(cars).includes(value)) {
      alert("This name already exists");
      return;
    }
    setCars({ ...cars, [value]: [] });
  };

  return (
    <main className="p-4">
      <section>
        <h1 className="flex items-center font-semibold text-lg mb-2 px-4 py-3 rounded bg-blue-100">
          What, Where, When
          <span className="text-lg font-normal ml-auto text-gray-400">📝</span>
        </h1>
        <input
          type="text"
          placeholder="Activity name..."
          className="border border-gray-100 px-3 py-2 mb-2 w-full rounded-md placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Gathering location..."
          className="border border-gray-100 px-3 py-2 mb-2 w-full rounded-md placeholder:text-sm"
        />
        <input
          type="text"
          placeholder="Gathering time..."
          className="border border-gray-100 px-3 py-2 w-full rounded-md placeholder:text-sm"
        />
      </section>

      <section className="my-7">
        <h1 className="flex items-center font-semibold text-lg mb-2 px-4 py-3 rounded bg-blue-100">
          People
          <span className="text-sm font-normal ml-auto text-gray-400">🙋‍♂️ Who is coming?</span>
        </h1>
        <div className="flex gap-2 flex-wrap">
          {renderPeople()}
          <button className="border px-4 py-2 text-blue-500 font-semibold cursor-pointer" onClick={addPeopleOnClick}>+ Add</button>
        </div>
      </section>

      <section>
        <h1 className="flex items-center font-semibold text-lg mb-2 px-4 py-3 rounded bg-blue-100">
          Carpooling
          <span className="text-lg font-normal ml-auto text-gray-400">🚘</span>
        </h1>
        <ul className="my-4 px-4 text-gray-500 text-sm">
          <li>1. Add yourself here if you're bringing your car and want to take people with you.</li>
          <li>2. Drag from the People section above to any car block listed below to arrange the carpooling situation.</li>
        </ul>
        <div className="flex flex-col gap-2">
          {renderCars()}
          <span className="border px-4 py-2 text-blue-500 font-semibold cursor-pointer self-start" onClick={addCarOnClick}>+ Add</span>
        </div>
      </section>
    </main>
  );
};

export default App;
