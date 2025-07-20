interface MySearcherProps {
  date?: boolean; // opcional si das valor por defecto
  onChangeSearch: any;
  onChangeFrom: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeTo: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Searcher({
  date = true,
  onChangeSearch,
  onChangeFrom,
  onChangeTo,
}: MySearcherProps) {
  return (
    <div>
      {date && (
        <div className="flex pb-5 gap-2 flex-col lg:flex-row">
          <div className="flex flex-1 shadow-md">
            <input
              type="text"
              placeholder="Buscar ..."
              className="flex-grow px-3 h-9 rounded inset-shadow-2xs border-0 border-r-0 border-green-600 focus:outline-none focus:border-green-600 bg-white"
              onChange={(e) => onChangeSearch(e.target.value)}
            />
            {/*
            <button
              type="submit"
              className="bg-green-600 text-white shadow-md rounded-r px-2 md:px-3 py-0 md:py-1 whitespace-nowrap hover:bg-green-700 hover:cursor-pointer"
            >
              Buscar
            </button>*/}
          </div>
          <div className="flex h-9">
            <label className="py-3/2 bg-green-600 shadow-md text-white rounded-l px-3 md:px-3 py-1">
              Desde:
            </label>
            <input
              className="px-3 rounded-r border-0 bg-white inset-shadow-2xs border-green-600 focus:outline-none shadow-md focus:border-green-600"
              type="date"
              onChange={onChangeFrom}
            />
          </div>
          <div className="flex h-9">
            <label className=" bg-green-600 text-white shadow-md rounded-l px-3 md:px-3  py-1">
              Hasta:
            </label>
            <input
              className="px-3 rounded-r border-0 bg-white inset-shadow-2xs border-green-600 focus:outline-none shadow-md focus:border-green-600"
              type="date"
              onChange={onChangeTo}
            />
          </div>
        </div>
      )}
    </div>
  );
}
