import {useState} from 'react';
import {ReactComponent as HeartEmpty} from '@images/heartEmpty.svg';
import {ReactComponent as HeartFilled} from '@images/heartFilled.svg';
import {emojiArr} from '@emojis/index';
import '@messageDetail/Like.scss';
import {returnFalse, returnTrue} from '../common/commonFunc';
import {likeMessage} from '@/apis/messageDetail';

interface LikeProps {
  count: number;
  like: boolean;
  isMine: boolean;
  emoji: number;
  type: number;
  likeInfo: {
    postId: number;
    userId: number;
  };
}

function Like({count, like, isMine, emoji, type, likeInfo}: LikeProps) {
  // 현재 사용자가 좋아요 눌렀는지 여부
  const [myLike, setLike] = useState(like);
  const [messageCount, setMessageCount] = useState(count);

  const changeLike = () => {
    if (!isMine) {
      // 이미 좋아요한 상태
      if (myLike) {
        setMessageCount(prev => prev - 1);
      } else {
        setMessageCount(prev => prev + 1);
      }
      setLike(() => !myLike);
    }
    likeMessage(type, {isLike: myLike, ...likeInfo});
  };

  return (
    <article className="like">
      <img src={emojiArr[emoji]} alt="풍선 이모지" className="like-balloon" />
      <div className="like-container">
        {isMine || myLike ? (
          <HeartFilled className="like-icon" onClick={changeLike} fill="red" />
        ) : (
          <HeartEmpty className="like-icon" onClick={changeLike} fill="white" />
        )}
        <p className="like-count">{messageCount}</p>
      </div>
    </article>
  );
}

export default Like;
