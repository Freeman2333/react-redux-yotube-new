import React, {useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import styled, { css } from "styled-components";
import { Link, useParams } from "react-router-dom";
import {getVideo} from '../reducers/video'
import Player from '../components/Player'
import { LikeIcon, DislikeIcon } from "../components/Icons";
import {
  addChannelLocalSt,
  removeChannelLocalSt,
  client,
  timeSince,
} from "../utils";
import Button from "../styles/Button";

// reducers and others
import {
  like,
  dislike,
  cancelLike,
  cancelDislike,
  subscribeFromVideo
} from "../reducers/video";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 70% 1fr;
  grid-gap: 2rem;
  padding: 1.3rem;
  padding-bottom: 7rem;

  .video-container .video-info {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }

  .video-info span {
    color: ${(props) => props.theme.secondaryColor};
  }

  .channel-info-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .video-info-stats {
    display: flex;
    align-items: center;
  }

  .video-info-stats div {
    margin-left: 6rem;
    position: relative;
    top: -2px;
  }

  .channel-info-flex button {
    font-size: 0.9rem;
  }

  .channel-info-description {
    padding-top: 1rem;
    border-bottom: 1px solid ${(props) => props.theme.darkGrey};
    border-top: 1px solid ${(props) => props.theme.darkGrey};
  }

  .channel-info-description p {
    font-size: 0.9rem;
    padding: 1rem 0;
  }

  .related-videos img {
    height: 140px;
  }

  .related-videos div {
    margin-bottom: 1rem;
  }

  svg {
    fill: ${(props) => props.theme.darkGrey};
  }

  ${(props) =>
    props.filledLike &&
    css`
      .like svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

  ${(props) =>
    props.filledDislike &&
    css`
      .dislike svg {
        fill: ${(props) => props.theme.blue};
      }
    `}

	@media screen and (max-width: 930px) {
    grid-template-columns: 90%;
    .related-videos {
      display: none;
    }
  }

  @media screen and (max-width: 930px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 425px) {
    .video-info-stats div {
      margin-left: 1rem;
    }
  }
`;

const WatchVideo = () => {
    const { videoId } = useParams();
    
    const dispatch = useDispatch();

    const {isFetching: videoFetching, data: video} = useSelector(state=>state.video)

    const handleLike = ()=>{
      if (video.isLiked) {
        dispatch(cancelLike())
      }else{
        dispatch(like())
      }
    }

    const handleDislike = ()=>{
      if (video.isDisliked) {
        dispatch(cancelDislike())
      }else{
        dispatch(dislike())
      }

      if(video.isLiked){
        dispatch(cancelLike());
      }

      client(`${process.env.REACT_APP_BE}/videos/${videoId}/dislike`);
    }

    const handleSubscribe= (channel)=>{
      dispatch(subscribeFromVideo())
    }
    
    useEffect(() => {
      dispatch(getVideo(videoId))
      return () => {
      }
    }, [dispatch, videoId])
    return (
        <Wrapper filledLike={video && video.isLiked} filledDislike={video && video.isDisliked}>
          <div className="video-container">
            <div className="video">{!videoFetching && <Player/>}</div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <div className="video-info-stats">
                <p>
                  <span>{video.views} views</span> <span>•</span>
                  <span>{timeSince(video.createdAt)} ago</span>
                </p>
                <div className="likes-dislikes flex-row">
                  <p className="flex-row like">
                    <LikeIcon onClick={handleLike}/>
                    <span>{video.likesCount}</span>
                  </p>
                  <p className="flex-row dislike" style={{ marginLeft: "1rem" }}>
                    <DislikeIcon onClick={handleDislike} />{" "}
                    <span>{video.dislikesCount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="channel-info-description">
            <div className="channel-info-flex">
              <div className="channel-info flex-row">
                <img src={video.User?.avatar} alt="channel avatar" className="avatar md" />
                <div className="channel-info-meta">
                  <h4>
                    <Link to={`/channel/${video.userId}`}>{video.User?.username}</Link>
                  </h4>
                  <span className="secondary small">
                    {video.subscribersCount} subscribers
                  </span>
                </div>
              </div>
              {!video.isVideoMine && !video.isSubscribed && (
              <Button onClick={() => handleSubscribe({ ...video.User })}>
                Subscribe
              </Button>
            )}
            </div>
          </div>
        </Wrapper>
    )
}

export default WatchVideo
