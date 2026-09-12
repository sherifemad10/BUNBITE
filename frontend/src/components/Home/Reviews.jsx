const reviews = [
  {
    tag: 'Freshly Served',
    text: 'One of the best burger experiences! 🍔 The burger was juicy, flavorfulFresh, fast, and super tasty one of the best in town',
    author: 'Sherif Emad',
    rating: 5,
    highlight: true,
  },
  {
    tag: 'Customer love',
    text: 'I LOVE HOW FRESH EVERYTHING TASTES! THE FLAVORS ARE AMAZING, AND THE BURGERS ARE ALWAYS JUICY AND SATISFYING.',
    author: 'Emily Crane',
    rating: 5,
    highlight: true,
  },
  {
    tag: 'Customer love',
    text: 'he service was also friendly and fast. Definitely a place I’d recommend to any burger lover!',
    author: 'Sara Mohammed',
    rating: 4,
    highlight: true,
  },
]

const Reviews = () => {
  return (
    <section className='relative overflow-hidden bg-[#1d4b3a] px-4 py-14 text-[#f7f0de] sm:py-16'>
      <div className='mx-auto max-w-6xl'>
        <div className='mb-8 text-center'>
          <p className='text-[10px] font-semibold uppercase tracking-[0.35em] text-[#d9d0c1] sm:text-xs'>Bites of happiness</p>
          <h2 className='mt-3 text-3xl font-black uppercase tracking-wide sm:text-4xl md:text-5xl'>Bites of Happiness</h2>
          <p className='mx-auto mt-3 max-w-2xl text-sm text-[#dfe8df] md:text-base'>
            See why customers keep coming back for fresh flavors, handcrafted meals, and unforgettable bites.
          </p>
        </div>

        <div className='grid gap-5 md:grid-cols-3'>
          {reviews.map((review, index) => (
            <article
              key={`${review.tag}-${index}`}
              className={`rounded-[26px] border border-[#f3e4bf]/10 bg-[#f3e4bf] p-5 text-[#1d4b3a] shadow-[0_10px_20px_rgba(0,0,0,0.12)] sm:p-6 ${
                review.highlight ? 'md:scale-[1.02]' : ''
              }`}
            >
              {review.highlight ? (
                <>
                  <div className='mb-4 flex justify-center gap-1 text-xl text-[#f1b611]'>
                    {Array.from({ length: review.rating }).map((_, starIndex) => (
                      <span key={starIndex}>★</span>
                    ))}
                  </div>

                  <p className='text-center text-base font-bold uppercase leading-relaxed sm:text-lg md:text-xl'>
                    {review.text}
                  </p>

                  <div className='mt-5 flex items-center justify-center gap-3'>
                    <div className='flex h-10 w-10 items-center justify-center rounded-full bg-[#1d4b3a] text-sm font-black text-[#f3e4bf]'>
                      E
                    </div>
                    <div className='text-left'>
                      <p className='text-sm font-black uppercase'>{review.author}</p>
                      <p className='text-xs text-[#1d4b3a]/70'>Verified customer</p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className='text-[10px] font-bold uppercase tracking-[0.2em] text-[#1d4b3a]/70 sm:text-xs'>
                    {review.tag}
                  </p>
                  <h3 className='mt-4 text-xl font-black uppercase leading-tight sm:text-2xl'>
                    {review.text}
                  </h3>
                </>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews
