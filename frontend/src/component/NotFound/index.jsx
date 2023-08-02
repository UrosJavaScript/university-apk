const NotFound = () => {
  return (
    <div className="flex justify-center	text-center w-full bg-black h-screen">
      <h1 className="uppercase text-gray-100 text-3xl flex items-center flex-col justify-center">
        Page Not Found
        <span className="relative flex h-6 w-6">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500">
            👻
          </span>
        </span>
      </h1>
    </div>
  );
};

export default NotFound;
