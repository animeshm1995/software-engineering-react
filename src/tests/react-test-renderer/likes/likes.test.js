import {act, create} from "react-test-renderer"
import likesJson from "./likes.json"
import Likes from "./likes";

test('likes render', () => {
    let likesRender
    act(() => {
        likesRender = create(
            <Likes
                like={likesJson}/>
        )
    })
    const root = likesRender.root
    const ttrLikes = root.findAllByProps({
        className: 'ttr-like'})
    expect(ttrLikes.length).toBe(ttrLikes.length)
    ttrLikes.forEach((ttrLike, ndx) => {
        expect(ttrLike.props.children).toBe(likesJson[ndx].tuit)
    })
})