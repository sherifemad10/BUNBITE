import { useContext } from 'react'
import BestsellCard from '../../UI/BestsellCard'
import { DataContext } from '../../Hooks/DataContext'

const BestSeller = () => {
  const { product } = useContext(DataContext)

  return (
    <section className='bg-[#f4e8c3] text-[#304f34] px-4 py-10'>
      <div className='container flex flex-col items-start justify-start gap-6'>
        <div className='flex flex-col items-start justify-center gap-2 py-10'>
          <h2 className='text-4xl font-bold'>Best Sellers</h2>
          <p className='text-lg'>Check out our most popular items!</p>
        </div>

        <div className='grid w-full gap-6 md:grid-cols-2 xl:grid-cols-3'>
          {product
            ?.filter((item) => item.bestSeller !== false).slice(0,3)
            .map((item) => (
              <BestsellCard key={item.id} product={item} />
            ))}
        </div>
      </div>
    </section>
  )
}

export default BestSeller
