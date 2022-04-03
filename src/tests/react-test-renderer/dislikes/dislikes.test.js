import {act, create} from "react-test-renderer"
import dislikesJson from "./dislikes.json"
import Dislikes from "./dislikes";

test('dislikes render', () => {
    let dislikesRender
    act(() => {
        dislikesRender = create(
            <Dislikes
                dislike={dislikesJson}/>
        )
    })
    const root = dislikesRender.root
    const ttrDislikes = root.findAllByProps({
        className: 'ttr-dislike'})
    expect(ttrDislikes.length).toBe(ttrDislikes.length)
    ttrDislikes.forEach((ttrDislike, ndx) => {
        expect(ttrDislike.props.children).toBe(dislikesJson[ndx].tuit)
    })
})