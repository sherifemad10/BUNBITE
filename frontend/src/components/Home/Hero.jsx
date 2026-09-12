import heroChart from '../../assets/heroChart.png'
import burger from '../../assets/hero.png'
import rate1 from '../../assets/rate.jpeg'
import rate2 from '../../assets/rate.jpg'
import totalRate from '../../assets/rate.png'

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-screen items-center overflow-hidden bg-[#2e5a46] px-4 pb-10 pt-24 text-[#f4e8c3] sm:px-8 sm:pb-14 sm:pt-28 lg:px-12">
      <div className="pointer-events-none absolute -left-32 top-24 h-72 w-72 rounded-full border border-[#efb53e]/20 sm:h-96 sm:w-96" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 rounded-full bg-[#efb53e]/10 blur-3xl" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl min-w-0 items-center gap-10 sm:gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-6">
        <div className="min-w-0 max-w-2xl text-center lg:text-left">
          <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-[#efb53e] sm:mb-5 sm:text-sm sm:tracking-[0.35em]">
            Big flavor. Zero waiting.
          </p>
          <h2 className="font-black uppercase leading-[0.82] tracking-[-0.07em]">
            <span className="block text-[clamp(3.25rem,12vw,8.5rem)] text-[#f4e8c3] [-webkit-text-stroke:2px_#f4e8c3] sm:[-webkit-text-stroke:3px_#f4e8c3]">
              Delicious
            </span>
            <span className="block text-[clamp(3.25rem,12vw,8.5rem)] text-[#2e5a46] [-webkit-text-stroke:2px_#f4e8c3] sm:[-webkit-text-stroke:3px_#f4e8c3]">
              Burgers
            </span>
          </h2>

          <div className="mx-auto mt-6 max-w-md lg:mx-0 sm:mt-7">
            <p className="text-lg font-bold text-[#f4e8c3] sm:text-2xl">
              Cravings, delivered fast.
            </p>
            <p className="mt-2 text-sm leading-6 text-[#f4e8c3]/70 sm:text-base">
              From our kitchen to your door in under 30 minutes.
            </p>
          </div>

          <div className="mt-7 flex flex-col items-center gap-6 sm:mt-8 sm:flex-row sm:gap-7 lg:items-center">
            <button
              type="button"
              className="rounded-full bg-[#efb53e] px-7 py-3 text-sm font-extrabold uppercase tracking-wide text-[#2e5a46] shadow-lg shadow-black/10 transition-transform hover:-translate-y-1 hover:bg-[#f4e8c3] active:translate-y-0 sm:text-base cursor-pointer"
            >
              Order Now
            </button>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-3">
                <img src={rate1} alt="" className="h-10 w-10 rounded-full border-2 border-[#2e5a46] object-cover" />
                <img src={rate2} alt="" className="h-10 w-10 rounded-full border-2 border-[#2e5a46] object-cover" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#efb53e]">4.5</span>
                  <img src={totalRate} alt="4.5 out of 5 stars" className="h-4 w-auto" />
                </div>
                <p className="text-xs text-[#f4e8c3]/60">75.5K happy customers</p>
              </div>
            </div>
          </div>
        </div>

        <figure className="relative flex min-h-[clamp(18rem,75vw,38rem)] w-full min-w-0 items-center justify-center">
          <img
            src={heroChart}
            alt=""
            aria-hidden="true"
            className="absolute w-[min(100%,38rem)] max-w-full opacity-80"
          />
          <img
            src={burger}
            alt="A delicious loaded burger"
            className="relative z-10 w-[min(92%,34rem)] max-w-full drop-shadow-[0_2rem_1.5rem_rgba(0,0,0,0.28)] transition-transform duration-500 hover:scale-105"
          />
        </figure>
      </div>
    </section>
  )
}

export default Hero