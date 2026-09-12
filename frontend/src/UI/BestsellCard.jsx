import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../Hooks/DataContext";

const BestsellCard = ({ product }) => {
  const { auth, addToCart } = useContext(DataContext);
  const navigate = useNavigate();
  if (!product) return null;

  return (
    <article
      className="
        group
        relative
        w-full
        max-w-90
        mx-auto
        overflow-hidden
        rounded-3xl
        bg-[#f3c02a]
        text-[#304f34]
        shadow-xl
        shadow-black/10
        transition-all
        duration-500
        hover:-translate-y-3
        hover:shadow-2xl
        hover:shadow-black/20
      "
    >
      <div
        className="
          absolute
          top-5
          left-5
          z-10
          rounded-full
          bg-[#2e5a46]
          px-4
          py-1.5
          text-xs
          font-bold
          uppercase
          tracking-wider
          text-[#f4e8c3]
          shadow-md
        "
      >
        Best Seller
      </div>

      <div
        className="
          relative
          flex
          h-60
          sm:h-65
          items-center
          justify-center
          overflow-hidden
          bg-[#f7d45b]
        "
      >
        <div
          className="
            absolute
            h-52
            w-52
            rounded-full
            bg-[#f4e8c3]/40
            transition-transform
            duration-700
            group-hover:scale-125
          "
        />

        <figure
          className="
            relative
            z-9
            w-57.5
            sm:w-62.5
            transition-transform
            duration-500
            ease-out
            group-hover:scale-110
            group-hover:-rotate-2
          "
        >
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="
              w-full
              h-auto
              object-contain
              drop-shadow-[0_18px_15px_rgba(0,0,0,0.22)]
              rounded-md
            "
          />
        </figure>
      </div>

      <div className="flex flex-col px-5 py-6 sm:px-6 sm:py-7">
        <span
          className="
            mb-2
            text-xs
            font-semibold
            uppercase
            tracking-[0.2em]
            text-[#304f34]/60
          "
        >
          {product.category}
        </span>

        <h2
          className="
            text-2xl
            sm:text-3xl
            font-extrabold
            tracking-tight
          "
        >
          {product.name}
        </h2>

        <p
          className="
            mt-3
            min-h-18
            text-sm
            sm:text-[15px]
            leading-6
            text-[#304f34]/65
          "
        >
          {product.description}
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-end gap-1">
            <span className="text-sm font-semibold text-[#304f34]/60">$</span>

            <span className="text-3xl font-extrabold tracking-tight">
              {product.price}
            </span>
          </div>

          <div
            className="
              flex
              items-center
              gap-1
              rounded-full
              bg-[#f4e8c3]/60
              px-3
              py-1.5
              text-sm
              font-semibold
            "
          >
            <span>★</span>
            <span>{product.rate}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => {
            if (!auth) {
              navigate("/login");
              return;
            }
            addToCart(product);
          }}
          className="
            group/button
            relative
            mt-6
            flex
            w-full
            items-center
            justify-center
            gap-2
            overflow-hidden
            rounded-xl
            bg-[#2e5a46]
            px-6
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-[#2e5a46]/20
            transition-all
            duration-300
            hover:bg-[#244936]
            hover:shadow-xl
            active:scale-[0.98]
            cursor-pointer
          "
        >
          <span
            className="
              absolute
              inset-0
              -translate-x-full
              bg-[#3b7057]
              transition-transform
              duration-500
              group-hover/button:translate-x-0
            "
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="
              relative
              z-10
              h-5
              w-5
              transition-transform
              duration-300
              group-hover/button:scale-110
            "
          >
            <path d="M3 3h2l2.4 11.4a2 2 0 0 0 2 1.6h7.8a2 2 0 0 0 2-1.6L21 7H6" />
            <circle cx="10" cy="20" r="1" />
            <circle cx="18" cy="20" r="1" />
          </svg>

          <span className="relative z-10">Add to Cart</span>
        </button>
      </div>
    </article>
  )
}

export default BestsellCard

