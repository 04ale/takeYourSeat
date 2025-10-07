import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    // Dica de Estilização: Essas classes com flexbox ajudam o footer a
    // ficar no final da página, mesmo que o conteúdo seja curto.
    <div className="App flex flex-col h-full w-full bg-[#F8F3ED]">
      
      {/* O Header agora será renderizado no topo de todas as páginas */}
      <Header />

      {/* O <Outlet> renderiza o componente da rota atual aqui no meio */}
      <main className="flex w-full items-center justify-center">
        <Outlet />
      </main>

      {/* O Footer agora será renderizado no final de todas as páginas */}
      <Footer />

    </div>
  );
}

export default App;
