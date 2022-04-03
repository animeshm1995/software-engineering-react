

const Dislikes = ({dislikes = []}) => {
    return (
        <div>
            {
                dislikes.map(tuit =>
                    <Dislikes
                        key={dislikes._id}
                        tuit={dislikes.tuit}
                        dislikedBy={dislikes.dislikedBy}
                    />
                )
            }
        </div>
    )
}
export default Dislikes;