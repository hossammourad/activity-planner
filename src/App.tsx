import { useState } from "react";

const App = () => {
  const [people, setPeople] = useState<string[]>(["Hossam", "Rania"]);
  const [cars, setCars] = useState<{ [key: string]: string[]; }>({ "Hussien": [], "Hany": [] });``
  const [draggedValue, setDraggedValue] = useState("");

  const renderCars = () => {
    return Object.keys(cars).map(x => {
      return (
        <span
          key={x}
          className="border p-4"
          onDragOver={e => e.preventDefault()}
          onDrop={(e) => onDrop(e, x)}
        >
          <p className="font-semibold" onDrop={(e) => onDrop(e, x)}>{x}</p>
          {cars[x].length > 0 &&
            <span className="flex gap-2 mt-2" onDrop={(e) => onDrop(e, x)}>
              {cars[x].map(y => <span key={y} onDrop={(e) => onDrop(e, x)} className="bg-blue-100 px-4 py-2">{y}</span>)}
            </span>
          }
        </span>
      );
    });
  };

  const renderPeople = () => {
    return people.map(x => {
      return <span key={x} className="border px-4 py-2" draggable onDragStart={() => onDragStart(x)}>{x}</span>;
    });
  };

  const onDragStart = (x: string) => {
    setDraggedValue(x);
  };

  const onDrop = (e: React.DragEvent, carName: string) => {
    e.stopPropagation();
    if (!carName || cars[carName].includes(draggedValue)) return;
    if (!cars[carName]) setCars({ ...cars, [carName]: [draggedValue] });
    if (cars[carName]) setCars({ ...cars, [carName]: [...cars[carName], draggedValue] });
    setDraggedValue("");
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
    const value = window.prompt("Are bringing your car? Enter your name", "");
    if (!value?.length) return;
    if (Object.keys(cars).includes(value)) {
      alert("This name already exists");
      return;
    }
    setCars({ ...cars, [value]: [] });
  };

  return (
    <main className="p-4">
      <input
        type="text"
        placeholder="Activity name..."
        className="border border-gray-100 px-3 py-2 w-full rounded-md placeholder:text-sm"
      />

      <section className="my-4">
        <h1 className="font-semibold text-lg mb-2">
          People
          <span className="text-xs font-normal ml-2 text-gray-400">🙋‍♂️ Who is coming?</span>
        </h1>
        <div className="flex gap-2">
          {renderPeople()}
          <button className="border px-4 py-2 text-green-600 font-semibold cursor-pointer" onClick={addPeopleOnClick}>Add +</button>
        </div>
      </section>

      <section>
        <h1 className="font-semibold text-lg mb-2">
          Carpooling
          <span className="text-xs font-normal ml-2 text-gray-400">🚘 Who is driving?</span>
        </h1>
        <div className="flex flex-col gap-2">
          {renderCars()}
          <span className="border px-4 py-2 text-green-600 font-semibold cursor-pointer" onClick={addCarOnClick}>Add +</span>
        </div>
      </section>
    </main>
  );
};

export default App;
