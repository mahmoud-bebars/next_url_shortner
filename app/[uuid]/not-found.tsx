import type { Metadata } from "next";

export const metadata: Metadata = {
  title: `Link Not Found`,
};

export default function NotFound() {
  return (
    <div>
      <section className="w-screen h-screen flex flex-col items-center justify-between p-10">
        <div className="conatiner ">
          <div className="flex flex-col justify-center items-center">
            <div className=" flex items-center justify-center gap-4">
              <div className="text-start">
                <p className="text-sm tracking-tighter font-normal opacity-60">
                  The URL Your are Requesting Not Found...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
