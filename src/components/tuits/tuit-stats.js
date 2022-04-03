import React, {useState} from "react";
import {findAllTuitsLikedByUser} from "../../services/likes-service";
import {findAllTuitsDislikedByUser} from "../../services/dislikes-service";

const TuitStats = ({tuit, likeTuit = () => {}, dislikeTuit = () => {}}) => {
    const [isTuitLiked, setIsTuitLiked] = useState(false);
    const [isTuitDisliked, setIsTuitDisliked] = useState(false);
    findAllTuitsLikedByUser("me").then(response => setIsTuitLiked((response.filter(retrievedTuitFromDB => retrievedTuitFromDB._id === tuit._id)).length > 0));
    findAllTuitsDislikedByUser("me").then(response => setIsTuitDisliked((response.filter(retrievedTuitFromDB => retrievedTuitFromDB._id === tuit._id)).length > 0));
    return (
      <div className="row mt-2">
        <div className="col">
          <i className="far fa-message me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-replies">{tuit.stats.replies}</span>
          }
        </div>
        <div className="col">
          <i className="far fa-retweet me-1"></i>
          {tuit.stats &&
          <span className="ttr-stats-retuits">{tuit.stats.retuits}</span>
          }
        </div>
        <div className="col">
          <span onClick={() => likeTuit(tuit)}>
              {
                  isTuitLiked === true &&
                  <i className="fas fa-thumbs-up me-1" style={{color: 'red'}}></i>
              }
              {
                  isTuitLiked === false &&
                  <i className="far fa-thumbs-up me-1"></i>
              }
              {tuit.stats && tuit.stats.likes}
          </span>
        </div>
        <div className="col">
          <span onClick={() => dislikeTuit(tuit)}>
              {
                  isTuitDisliked === true &&
                  <i className="fas fa-thumbs-down me-1" style={{color: 'red'}}></i>
              }
              {
                  isTuitDisliked === false &&
                  <i className="far fa-thumbs-down me-1"></i>
              }
              {tuit.stats && tuit.stats.dislikes}
          </span>
        </div>
        <div className="col">
          <i className="far fa-inbox-out"></i>
        </div>
      </div>
    );
}
export default TuitStats;