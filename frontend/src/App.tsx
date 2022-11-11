// notification
import {
  initToken,
  requestPermission,
} from '@apis/notifications/getMessagingToken';

import {Suspense, useEffect, useState, useRef, lazy} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import bgm from '@bgms/silver_waves.mp3';

import '@/App.scss';

import Loading from '@components/loading/Loading';
// route
import Intro from '@screens/Intro';
import Process from '@screens/Process';
import Main from '@screens/Main';
import Globe from '@screens/Globe';
import Map from '@screens/Map';
// lazy loading으로 대체
// import MessageList from '@screens/MessageList';
import MessageCreate from '@screens/MessageCreate';
import MessageDetail from '@screens/MessageDetail';
import VR from '@screens/VR';
import NotFound from '@screens/NotFound';
import Individual from '@screens/Individual';

//recoil
import {useRecoilState, useRecoilValue} from 'recoil';
// router
import {
  main,
  intro,
  process,
  globe,
  map,
  vr,
  messageList,
  messageCreate,
  messageUpdate,
  messageDetail,
  notFound,
  settings,
  notifications,
} from '@apis/router';
import {playingState} from '@apis/Recoil';

function App() {
  initToken();
  const [onPlay, setOnPlay] = useRecoilState(playingState);
  const audioRef = useRef<HTMLAudioElement>(null!);
  const handlePlay = () => {
    if (onPlay) {
      audioRef.current && audioRef.current.play();
    } else {
      audioRef.current && audioRef.current.pause();
    }
    setOnPlay(prev => !prev);
  };
  useEffect(() => {
    audioRef.current.volume = 0.4;
  }, []);
  useEffect(handlePlay, [onPlay]);

  const MessageList = lazy(() => import('@screens/MessageList'));
  return (
    <>
      {/* <InitMessage /> */}
      <BrowserRouter>
        {/* <RecoilRoot> */}
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path={intro()} element={<Intro />} />
            <Route path={process()} element={<Process />} />
            <Route path={main()} element={<Main />} />
            <Route path={globe()} element={<Globe />} />
            <Route path={map()} element={<Map />} />
            <Route path={vr()} element={<VR />} />
            <Route path={messageList()} element={<MessageList />} />
            <Route path={messageCreate()} element={<MessageCreate />} />
            <Route path={messageUpdate()} element={<MessageCreate />} />
            <Route path={messageDetail()} element={<MessageDetail />} />
            <Route path={notFound()} element={<NotFound />} />
            <Route path={settings()} element={<Individual />} />
            <Route path={notifications()} element={<Individual />} />
          </Routes>
        </Suspense>
        {/* </RecoilRoot> */}
      </BrowserRouter>
      <audio autoPlay={onPlay} loop={onPlay} src={bgm} ref={audioRef} />
    </>
  );
}
export default App;
