const Like = ({like}) => {
    return(
        <li className="ttr-like">
            {like.tuit}
            {like.likedBy}
        </li>
    )
}
export default Like
