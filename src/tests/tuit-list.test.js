import {Tuits} from "../components/tuits";
import {screen, render} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";

const MOCKED_USERS = [
  "alice", "bob", "charlie"
];

const MOCKED_TUITS = [
  {tuit: 'Tuit by Alice', postedBy: 'Alice', _id: "111"},
  {tuit: 'Tuit by NASA', postedBy: 'NASA', _id: "222"},
  {tuit: 'Tuit by SpaceX', postedBy: 'SpaceX', _id: "333"}
];

test('tuit list renders static tuit array', () => {
  render(
      <HashRouter>
        <Tuits tuits={MOCKED_TUITS}/>
      </HashRouter>);
  const linkElement = screen.getByText(/Tuit by Alice/i);
  expect(linkElement).toBeInTheDocument();
});

test('tuit list renders async', async () => {
    const tuits = await findAllTuits();
    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);
    const linkElement = screen.getByText(/Alice/i);
    expect(linkElement).toBeInTheDocument();
})

