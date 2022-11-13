import {useState, useRef, useEffect} from 'react';
import {useNavigate, useParams, useLocation} from 'react-router';
import {useRecoilState} from 'recoil';
import {loadingState} from '@apis/Recoil';
import {ReactComponent as EllipsisVertical} from '@images/ellipsisVertical.svg';
import MoreMenu from '@common/MoreMenu';
import Content from '@messageDetail/Content';
import Like from '@messageDetail/Like';
import MoveToBack from '@common/MoveToBack';
import {notFound, intro} from '@apis/router';
import '@screens/MessageDetail.scss';
import InitMessage from '@/apis/notifications/foregroundMessaging';
import {getMesssage} from '@/apis/messageDetail/textDetail';
import {detailResponse} from '@/apis/messageDetail/detailInterface';
import {intMessageId, convStringType} from '@/components/common/commonFunc';
import {checkType} from '@/apis';
import {currentUser} from '@/components/common/commonFunc';

function MessageDetail() {
  // recoil
  const [isLoading, setIsLoading] = useRecoilState(loadingState);
  setIsLoading(true);

  // 풍선 저장 관련
  const messageDetailRef = useRef(null!);

  // 전달 받은 messageId가 숫자가 아니라면 notfound로 이동
  const navigate = useNavigate();
  const params = useParams();
  const messageId = intMessageId(params.id);
  const type = convStringType(params.type);

  // 현재 사용자 정보
  // const userId = currentUser();
  const userId = 2;

  // 서버 통신으로 게시글 정보 가져오기
  const dataType = {
    postId: 0,
    type: 0,
    title: '',
    userId: 0,
    emojiNo: 0,
    content: '',
    likeCnt: 0,
    isLike: false,
    date: '',
    dayType: 9,
    status: 0,
  };
  // 현재 사용자가 작성한 게시글인지 확인
  const [data, setData] = useState(dataType);
  const isMine = () => userId === data.userId;

  useEffect(() => {
    if (messageId === -1) {
      navigate(notFound());
    }
    // else if (userId === -1) {
    // navigate(intro());
    // }
    else if (type) {
      getMesssage(type, messageId).then((res: detailResponse) => {
        if (res.message === 'SUCCESS') {
          setData(prev => {
            return {...prev, ...res.data};
          });
        } else {
          // 실패했을 경우 404로 이동
          navigate(notFound());
        }
      });
    } else {
      navigate(notFound());
    }
  }, []);

  // 비공개 글일 때 작성자가 자신이 아니면 404 페이지로 이동
  useEffect(() => {
    if (!isMine() && data.status) {
      navigate(notFound());
    }
  }, [data]);

  // 메뉴 표시 여부
  const [more, setMore] = useState(false);

  const hiddenMenu = () => {
    if (more) setMore(false);
  };

  const showMenu = () => setMore(!more);

  // 날짜 형식에 맞춰 표시
  const modifiedDate = () => data.date.split('T')[0];

  return (
    <>
      <InitMessage />
      <div
        className={`screen background${data.dayType}`}
        ref={messageDetailRef}
        onClick={hiddenMenu}>
        <main id="container">
          <section data-html2canvas-ignore="true" className="ignore">
            <MoveToBack path="" />
            <div id="message-detail-nav-more" onClick={showMenu}>
              <EllipsisVertical width="32" height="32" fill="white" />
            </div>
            <MoreMenu
              open={more}
              isMine={isMine()}
              detail={messageDetailRef}
              messageId={messageId}
              type={type}
              content={data.content}
              close={hiddenMenu}
              status={data.status}
            />
          </section>
          <section className="container">
            <Content
              title={data.title}
              content={data.content}
              type={data.type}
              date={modifiedDate()}
              status={data.status}
            />
            <Like
              count={data.likeCnt}
              like={data.isLike}
              isMine={isMine()}
              emoji={data.emojiNo}
              type={type}
              likeInfo={{
                postId: messageId,
                userId,
              }}
            />
          </section>
        </main>
      </div>
    </>
  );
}

export default MessageDetail;