const Dislike = ({dislike}) => {
    return(
        <li className="ttr-dislike">
            {dislike.tuit}
            {dislike.dislikedBy}
        </li>
    )
}
export default Dislike