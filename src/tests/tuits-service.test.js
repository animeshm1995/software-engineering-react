import {createTuit, deleteTuitsByPostedBy, findAllTuits, findTuitById} from "../services/tuits-service";

describe('can create tuit with REST API', () => {
    // sample user to insert
    const nasaTuit = {
        tuit: 'Dragon spacecraft returns to Earth',
        postedBy: 'NASA'
    };

    // setup test before running test
    beforeAll(() => {
        // remove any/all users to make sure we create it in the test
        return deleteTuitsByPostedBy(nasaTuit.postedBy);
    })

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitsByPostedBy(nasaTuit.postedBy);
    })

    test('can insert new users with REST API', async () => {
        // insert new user in the database
        const newTuit = await createTuit(nasaTuit);

        // verify inserted user's properties match parameter user
        expect(newTuit.tuit).toEqual(nasaTuit.tuit);
        expect(newTuit.postedBy).toEqual(nasaTuit.postedBy);
    });
});

describe('can delete tuit wih REST API', () => {
    // sample tuit to delete
    const tuitByNasa = {
        tuit: 'This tuit is by NASA!',
        postedBy: 'NASA'
    };
    // setup the tests before verification
    beforeAll(() => {
        // insert the sample user we then try to remove
        return createTuit(tuitByNasa);
    });

    // clean up after test runs
    afterAll(() => {
        // remove any data we created
        return deleteTuitsByPostedBy(tuitByNasa.postedBy);
    })

    test('can delete tuits from REST API by username', async () => {
        // delete a tuit.
        const status = await deleteTuitsByPostedBy(tuitByNasa.postedBy);

        // verify we deleted at least one user by their username
        expect(status.deletedCount).toBeGreaterThanOrEqual(1);
    });
});

describe('can retrieve a tuit by their primary key with REST API', () => {
    // sample tuit we want to retrieve
    const tuitByNasa = {
        tuit: 'This tuit is from NASA!',
        postedBy: 'NASA'
    };
    // setup before running test
    beforeAll(() => {
        // clean up before the test making sure the user doesn't already exist
        return deleteTuitsByPostedBy(tuitByNasa.postedBy)
    });

    // clean up after ourselves
    afterAll(() => {
        // remove any data we inserted
        return deleteTuitsByPostedBy(tuitByNasa.postedBy);
    });

    test('can retrieve user from REST API by primary key', async () => {
        // insert the user in the database
        const newTuit = await createTuit(tuitByNasa);

        // verify new tuit matches the parameter tuit
        expect(newTuit.tuit).toEqual(tuitByNasa.tuit);
        expect(newTuit.postedBy).toEqual(tuitByNasa.postedBy);

        // retrieve the tuit from the database by its primary key
        const insertedTuit = await findTuitById(newTuit._id);

        // verify retrieved tuit matches parameter tuit
        expect(insertedTuit.tuit).toEqual(tuitByNasa.tuit);
        expect(insertedTuit.postedBy).toEqual(tuitByNasa.postedBy);
    });
});

describe('can retrieve all tuits with REST API', () => {

    // sample tuits we'll insert to then retrieve
    const tuits = [
        "SpaceX", "NASA", "Alice"
    ];

    // setup data before test
    beforeAll(() =>
        // insert several tuits
        tuits.map(tuit =>
            createTuit({
                tuit: `${tuit} is posting this tuit`,
                postedBy: `${tuit}`
            })
        )
    );

    // clean up after ourselves
    afterAll(() =>
        // delete the tuits we inserted
        tuits.map(tuit => {
                deleteTuitsByPostedBy(tuit);
            }
        )
    );

    test('can retrieve all tuits from REST API', async () => {
        // retrieve all the users
        const fetchedTuits = await findAllTuits();

        // there should be a minimum number of users
        expect(fetchedTuits.length).toBeGreaterThanOrEqual(fetchedTuits.length);

        // let's check each user we inserted
        const tuitsWeInserted = fetchedTuits.filter(
            tuit => tuits.indexOf(tuit.postedBy) >= 0);

        // compare the actual users in database with the ones we sent
        tuitsWeInserted.forEach(tuit => {
            const tuitFetched = tuits.find(tuitFetched => tuitFetched === tuit.postedBy);
            expect(tuit.postedBy).toEqual(tuitFetched);
            expect(tuit.tuit).toEqual(`${tuitFetched} is posting this tuit`);
        });
    });
});