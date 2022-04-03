import {act, create} from "react-test-renderer"
import Dislikes from "./dislikes";
import dislikesJson from "./dislikes.json"

test('dislikes render', () => {
    let dislikesRender
    act(() => {
        dislikesRender = create(
            <Dislikes
                tuits={dislikesJson}/>
        )
    })
    const root = dislikesRender.root
    const ttrDislikes = root.findAllByProps({
        className: 'ttr-dislike'})
    expect(ttrDislikes.length).toBe(dislikesJson.length)
    ttrDislikes.forEach((ttrTuit, ndx) => {
        expect(ttrTuit.props.children).toBe(dislikesJson[ndx].tuit)
    })
})
