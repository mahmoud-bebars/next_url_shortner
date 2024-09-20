export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <section className="w-screen h-screen flex flex-col items-center justify-between p-10">
        <div />
        <div className="conatiner ">
          <div className="flex flex-col justify-center items-center">
            <div className=" flex items-center justify-center gap-4">
              <p className="text-3xl font-bold tracking-tighter">
                Redirecting...
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
