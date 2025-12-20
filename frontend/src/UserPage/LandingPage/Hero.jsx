export default function Hero() {
  return (
    <>
      <div class="h-[500px] bg-[linear-gradient(to_bottom,#06134b,#153d8a,#7f78d2)] relative inset-0 flex flex-col justify-center items-center">
        <div className="w-2xl flex">
          <p className="text-6xl text-white font-medium text-center">
            Find out what's possible when work connects
          </p>  
        </div>
        <div className="w-2xl">
            <p className="text-white text-center mt-10">
            Whether you're chatting with teammates or supporting customers, Zoom
            makes it easier to connect, collaborate, and reach goals — all with
            built-in AI doing the heavy lifting.
          </p>
        </div>
        <div className="btn mt-5">
            <button className="text-white w-36 bg-indigo-950 p-2 rounded-4xl">Explore proudcts</button>
        </div>
      </div>
    </>
  );
}
