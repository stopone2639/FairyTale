import {smallEmojiArr} from '@/assets/emojis';
import './EmojiGrid.scss';
import {useRef, useEffect, Dispatch, SetStateAction} from 'react';

type EmojiGridProps = {
  setEmojiNo: Dispatch<SetStateAction<number>>;
  setIsLongClicked: Dispatch<SetStateAction<boolean>>;
};

function EmojiGrid({setEmojiNo, setIsLongClicked}: EmojiGridProps) {
  const emojiGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('mousedown', ({target}) => {
      if (
        emojiGridRef.current &&
        !emojiGridRef.current.contains(target as Node)
      ) {
        setIsLongClicked(false);
      }
    });
  });

  return (
    <div ref={emojiGridRef} className="emojigrid">
      {smallEmojiArr.map((item, index) => {
        return (
          <img
            key={index}
            className="emojigrid-item"
            src={item}
            alt={`${index}번 이모지`}
            onClick={() => {
              setEmojiNo(index);
              setIsLongClicked(false);
            }}
          />
        );
      })}
    </div>
  );
}

export default EmojiGrid;