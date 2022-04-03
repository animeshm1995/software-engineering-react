

const Dislikes = ({dislikes = []}) => {
    return (
        <div>
            {
                dislikes.map(dislikes =>
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