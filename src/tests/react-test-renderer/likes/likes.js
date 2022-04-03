

const Likes = ({likes = []}) => {
    return (
        <div>
            {
                likes.map(likes =>
                    <Likes
                        key={likes._id}
                        tuit={likes.tuit}
                        likedBy={likes.likedBy}
                    />
                )
            }
        </div>
    )
}
export default Likes;