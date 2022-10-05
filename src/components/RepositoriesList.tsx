import { useState } from "react";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { useActions } from "../hooks/useAction";

import { AiFillGithub, AiFillHome } from "react-icons/ai";
import { DiNpm } from "react-icons/di";
import { IoIosBug } from "react-icons/io";

interface ListRepositoriesProps {
  item: {
    name: string;
    description: string;
    links: { npm: string; homepage: string; repository: string; bugs: string };
  };
}

const RepositoriesList: React.FC = () => {
  const [term, setTerm] = useState("");
  const { searchRepositories } = useActions();
  const { data, error, loading } = useTypedSelector(
    (state) => state.repositories
  );

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    searchRepositories(term);
  };

  const ListRepositories: React.FC<ListRepositoriesProps> = ({ item }) => {
    return (
      <div className="box">
        <div className="content">
          <div className="contentDescription">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
          </div>
          <div className="contentLink">
            {item.links.npm && (
              <div>
                <a href={item.links.npm} target="_blank">
                  <DiNpm />
                </a>
              </div>
            )}
            {item.links.homepage && (
              <div>
                <a href={item.links.homepage} target="_blank">
                  <AiFillHome />
                </a>
              </div>
            )}
            {item.links.repository && (
              <div>
                <a href={item.links.repository} target="_blank">
                  <AiFillGithub />
                </a>
              </div>
            )}
            {item.links.bugs && (
              <div>
                <a href={item.links.bugs} target="_blank">
                  <IoIosBug />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Loader: React.FC = () => {
    return (
      <ul className="loader">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    );
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className="inputBox">
          <input
            type="text"
            required
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
          <span>Library/Package Name</span>
        </div>
        <button type="submit" className="btnSearch">
          Search
        </button>
      </form>

      {error && <h3>{error}</h3>}
      {loading && <Loader />}

      {!error &&
        !loading &&
        data.length > 0 &&
        data.map((item) => <ListRepositories key={item.name} item={item} />)}
    </div>
  );
};

export default RepositoriesList;
