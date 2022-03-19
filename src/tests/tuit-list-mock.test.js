import axios from "axios";
import {render, screen} from "@testing-library/react";
import {HashRouter} from "react-router-dom";
import {findAllTuits} from "../services/tuits-service";
import {Tuits} from "../components/tuits";

jest.mock('axios');

const MOCKED_TUITS = [
    {tuit: 'Tuit by Alice', postedBy: 'Alice', _id: "111"},
    {tuit: 'Tuit by NASA', postedBy: 'NASA', _id: "222"},
    {tuit: 'Tuit by SpaceX', postedBy: 'SpaceX', _id: "333"}
];

test('tuit list renders mocked', async () => {
    axios.get.mockImplementation(() =>
        Promise.resolve({ data: {tuits: MOCKED_TUITS} }));
    const response = await findAllTuits();
    const tuits = response.tuits;

    render(
        <HashRouter>
            <Tuits tuits={tuits}/>
        </HashRouter>);

    const tuit = screen.getByText(/Alice/i);
    expect(tuit).toBeInTheDocument();
});