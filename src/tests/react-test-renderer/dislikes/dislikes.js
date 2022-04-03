import Dislike from "./dislike";

const Dislikes = ({dislikes = []}) => {
    return (
        <div>
            {
                dislikes.map(dislike =>
                    <Dislike
                        key={dislike._id}
                        tuit={dislike.tuit}
                        dislikedBy={dislike.dislikedBy}
                    />
                )
            }
        </div>
    )
}
export default Dislikes;