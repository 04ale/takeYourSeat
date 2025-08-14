import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, Heart, Undo2 } from "lucide-react";

const VITE_IMG = import.meta.env.VITE_IMG;

const CardDeck = ({ movies, title }) => {
  const [deck, setDeck] = useState([]);
  const [discarded, setDiscarded] = useState([]);
  const [animation, setAnimation] = useState("");

  useEffect(() => {
    setDeck(movies.slice(0, 7).reverse());
    setDiscarded([]);
  }, [movies]);

  const handleAction = (action) => {
    if (deck.length === 0) return;

    setAnimation(action);

    setTimeout(() => {
      setDiscarded((prev) => [deck[deck.length - 1], ...prev]);
      setDeck((prev) => prev.slice(0, -1));
      setAnimation("");
    }, 500);
  };

  const handleUndo = () => {
    if (discarded.length === 0) return;
    setDeck((prev) => [...prev, discarded[0]]);
    setDiscarded((prev) => prev.slice(1));
  };

  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto mt-12 px-4 md:px-0">
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>

      <div className="relative h-96 w-64 mx-auto">
        {deck.length > 0 ? (
          deck.map((movie, index) => {
            const isTopCard = index === deck.length - 1;
            let cardClasses = `absolute w-full h-full rounded-xl shadow-2xl bg-white transition-all duration-500 ease-in-out cursor-pointer`;

            if (isTopCard && animation === "like") {
              cardClasses += " transform rotate-12 translate-x-full";
            }
            if (isTopCard && animation === "dislike") {
              cardClasses += " transform -rotate-12 -translate-x-full";
            }

            return (
              <div
                key={movie.id}
                className={cardClasses}
                style={{
                  transform: isTopCard
                    ? "none"
                    : `scale(${
                        1 - (deck.length - 1 - index) * 0.05
                      }) translateY(${(deck.length - 1 - index) * -12}px)`,
                  zIndex: index,
                }}
              >
                <Link to={`/movie/${movie.id}`}>
                  <img
                    src={VITE_IMG + movie.poster_path}
                    alt={movie.title}
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 text-white rounded-b-xl">
                    <h3 className="font-bold text-lg">{movie.title}</h3>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="w-full h-full rounded-xl shadow-xl bg-gray-200 flex flex-col justify-center items-center text-gray-500">
            <p>Fim das recomendações!</p>
            <p className="text-sm">Volte mais tarde.</p>
          </div>
        )}
      </div>

      <div className="flex justify-center items-center gap-8 mt-6">
        <button
          onClick={() => handleAction("dislike")}
          className="bg-white rounded-full p-4 shadow-xl text-red-500 hover:scale-110 transition-transform"
          aria-label="Dislike"
        >
          <X size={32} />
        </button>
        <button
          onClick={handleUndo}
          className="bg-white rounded-full p-3 shadow-lg text-gray-500 hover:scale-110 transition-transform"
          aria-label="Undo"
          disabled={discarded.length === 0}
        >
          <Undo2 size={20} />
        </button>
        <button
          onClick={() => handleAction("like")}
          className="bg-white rounded-full p-4 shadow-xl text-green-500 hover:scale-110 transition-transform"
          aria-label="Like"
        >
          <Heart size={32} />
        </button>
      </div>
    </div>
  );
};

export default CardDeck;
