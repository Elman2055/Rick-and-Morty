import { useState, useEffect } from "react";
import { Pagination } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";

type TCharacters = {
  id: number;
  image: string;
  name: string;
};

const Index = () => {
  const router = useRouter();
  const [characters, setCharacters] = useState<TCharacters[]>([]);

  const getInfo = async (page: number) => {
    const { data } = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    setCharacters(data.results);
  };

  useEffect(() => {
    getInfo(1);
  }, []);

  return (
    <div className="container">
      <div className="charactersPosition">
        {characters.map((el: TCharacters) => (
          <div
            key={el.id}
            className="charactersCards"
            onClick={() => router.push(`character/${el.id}`)}
          >
            <img src={el.image} alt="character" className="charactersImage" />
            <h3>{el.name}</h3>
          </div>
        ))}
      </div>
      <div className="pagination">
        <Pagination
          count={42}
          color="primary"
          onChange={(event, page) => getInfo(page)}
        />
      </div>
    </div>
  );
};

export default Index;
