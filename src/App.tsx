import React, { useState, useEffect, useRef } from 'react';

export default function IPhoneSimulator() {
  const [screen, setScreen] = useState('lock'); // 'lock', 'passcode', 'home', 'app'
  const [passcode, setPasscode] = useState('');
  const [activeApp, setActiveApp] = useState(null);
  const [currentTime, setCurrentTime] = useState('08:23');
  const [battery, setBattery] = useState(82);

  // 날짜/시간 설정
  const currentDateStr = "1월 23일 금요일";

  // 카카오톡 상태
  const [kakaoChat, setKakaoChat] = useState([
    { sender: '태은 선배', text: '일이 생겨서 먼저 나왔어', time: '오전 8:00' },
    { sender: '태은 선배', text: 'ㅠㅠ', time: '오전 8:00' },
    { sender: '태은 선배', text: '일어나면 연락해', time: '오전 8:01' },
  ]);
  const [kakaoStep, setKakaoStep] = useState(0);
  const chatEndRef = useRef(null);

  // 태은 선배 실시간 채팅 시나리오
  useEffect(() => {
    if (activeApp === 'kakao_taeeun') {
      const messagesToAdd = [
        { sender: '나', text: '일어났어요', time: '오전 8:05' },
        { sender: '나', text: '언제 가셨어요?', time: '오전 8:05' },
        { sender: '태은 선배', text: '한두시간 전에', time: '오전 8:06' },
        { sender: '태은 선배', text: '이따가 볼까', time: '오전 8:06' },
        { sender: '태은 선배', text: '데리러 가던 곳으로 갈게', time: '오전 8:07' },
        { sender: '나', text: '선배 저 언제 끝나는지 모르시잖아요', time: '오전 8:07' },
        { sender: '태은 선배', text: '일찍 가서 기다리지 뭐', time: '오전 8:08' },
        { sender: '나', text: '저 4시 반에 끝나요', time: '오전 8:08' },
        { sender: '나', text: '오래 기다리지 말고 맞춰서 와요', time: '오전 8:09' },
        { sender: '태은 선배', text: '응', time: '오전 8:09' },
        { sender: '태은 선배', text: '이따 봐', time: '오전 8:10' },
      ];

      if (kakaoStep < messagesToAdd.length) {
        const timer = setTimeout(() => {
          setKakaoChat(prev => [...prev, messagesToAdd[kakaoStep]]);
          setKakaoStep(prev => prev + 1);
        }, 3000); // 3초 간격
        return () => clearTimeout(timer);
      }
    }
  }, [activeApp, kakaoStep]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [kakaoChat]);

  // 패스코드 입력
  const handlePasscode = (num) => {
    if (passcode.length < 4) {
      const nextPass = passcode + num;
      setPasscode(nextPass);
      if (nextPass === '0913') {
        setTimeout(() => {
          setScreen('home');
          setPasscode('');
        }, 200);
      } else if (nextPass.length === 4) {
        setTimeout(() => setPasscode(''), 400);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-900 font-sans select-none">
      {/* 아이폰 외형 프레임 */}
      <div className="relative w-[390px] h-[844px] bg-black rounded-[50px] shadow-2xl overflow-hidden border-[12px] border-slate-800 flex flex-col">
        
        {/* 상단 다이나믹 아일랜드 & 상태바 */}
        <div className="absolute top-0 left-0 right-0 h-11 z-50 flex justify-between items-center px-6 text-white text-xs pt-1">
          <span className="font-semibold text-sm">08:23</span>
          <div className="absolute left-1/2 -translate-x-1/2 top-2 w-24 h-7 bg-black rounded-full"></div>
          <div className="flex items-center space-x-1.5 text-xs">
            <span>5G</span>
            <span>82%</span>
          </div>
        </div>

        {/* 화면 콘텐츠 영역 */}
        <div className="relative flex-1 w-full h-full overflow-hidden flex flex-col pt-11">

          {/* 1. 잠금 화면 */}
          {screen === 'lock' && (
            <div 
              className="absolute inset-0 bg-black text-white flex flex-col justify-between items-center py-12 px-6 cursor-pointer z-40"
              onClick={() => setScreen('passcode')}
            >
              <div className="flex flex-col items-center mt-6">
                <span className="text-sm font-medium text-gray-300">{currentDateStr}</span>
                <h1 className="text-8xl font-light tracking-tighter mt-1">08:23</h1>
              </div>
              <div className="text-xs text-gray-400 animate-pulse pb-4">
                위로 밀거나 눌러서 열기
              </div>
            </div>
          )}

          {/* 2. 암호 입력 화면 */}
          {screen === 'passcode' && (
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md text-white flex flex-col justify-center items-center z-40 px-6">
              <h2 className="text-lg font-medium mb-6">암호 입력</h2>
              <div className="flex space-x-4 mb-10">
                {[0, 1, 2, 3].map((i) => (
                  <div key={i} className={`w-4 h-4 rounded-full border border-white ${passcode.length > i ? 'bg-white' : 'bg-transparent'}`} />
                ))}
              </div>
              <div className="grid grid-cols-3 gap-5 w-64">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, '취소', 0, '⌫'].map((btn, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (btn === '취소') setScreen('lock');
                      else if (btn === '⌫') setPasscode(prev => prev.slice(0, -1));
                      else if (typeof btn === 'number') handlePasscode(String(btn));
                    }}
                    className="w-16 h-16 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-2xl font-normal transition active:bg-zinc-600"
                  >
                    {btn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. 홈 화면 */}
          {screen === 'home' && (
            <div 
              className="absolute inset-0 bg-cover bg-center flex flex-col justify-between p-6 z-30"
              style={{ backgroundImage: `url('https://images.unsplash.com/photo-1518791841217-8f162f1e1131?q=80&w=1000&auto=format&fit=crop')` }}
            >
              {/* 위젯 영역 */}
              <div className="mt-8 bg-white/20 backdrop-blur-md rounded-2xl p-4 text-white w-44 shadow-lg">
                <div className="text-xs opacity-80">서울</div>
                <div className="text-3xl font-light">27°</div>
                <div className="text-xs mt-1">대체로 맑음</div>
              </div>

              {/* 앱 아이콘 그리드 */}
              <div className="grid grid-cols-4 gap-4 px-2">
                {[
                  { name: '카카오톡', bg: 'bg-yellow-400 text-black font-bold', icon: '💬', app: 'kakao' },
                  { name: '메시지', bg: 'bg-green-500 text-white', icon: '💬', app: 'message' },
                  { name: '전화', bg: 'bg-green-400 text-white', icon: '📞', app: 'phone' },
                  { name: '갤러리', bg: 'bg-gradient-to-tr from-yellow-400 to-purple-600 text-white', icon: '🖼️', app: 'gallery' },
                  { name: 'YouTube', bg: 'bg-red-600 text-white', icon: '▶', app: 'youtube' },
                  { name: 'Instagram', bg: 'bg-gradient-to-tr from-amber-500 via-pink-600 to-purple-700 text-white', icon: '📷', app: 'instagram' },
                  { name: '음악', bg: 'bg-pink-500 text-white', icon: '🎵', app: 'music' },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center cursor-pointer group" onClick={() => setActiveApp(item.app)}>
                    <div className={`w-14 h-14 rounded-2xl ${item.bg} flex items-center justify-center text-2xl shadow-md group-hover:scale-105 transition`}>
                      {item.icon}
                    </div>
                    <span className="text-white text-[11px] mt-1 drop-shadow">{item.name}</span>
                  </div>
                ))}
              </div>

              {/* 독 바 (하단 고정 앱) */}
              <div className="bg-white/20 backdrop-blur-md rounded-3xl p-3 flex justify-around items-center mb-2 shadow-lg">
                <div className="w-12 h-12 rounded-2xl bg-green-400 flex items-center justify-center text-white text-xl cursor-pointer" onClick={() => setActiveApp('phone')}>📞</div>
                <div className="w-12 h-12 rounded-2xl bg-green-500 flex items-center justify-center text-white text-xl cursor-pointer" onClick={() => setActiveApp('message')}>💬</div>
                <div className="w-12 h-12 rounded-2xl bg-yellow-400 flex items-center justify-center text-black font-bold text-xl cursor-pointer" onClick={() => setActiveApp('kakao')}>💬</div>
                <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white text-xl cursor-pointer" onClick={() => setActiveApp('music')}>🎵</div>
              </div>
            </div>
          )}

          {/* 4. 개별 앱 실행 화면들 */}
          {activeApp && (
            <div className="absolute inset-0 bg-white z-50 flex flex-col">
              {/* 앱 내부 상단바 */}
              <div className="h-12 bg-gray-100 border-b flex items-center justify-between px-4 pt-4">
                <button onClick={() => setActiveApp(null)} className="text-blue-500 text-sm font-medium">〈 홈</button>
                <span className="font-semibold text-sm">
                  {activeApp === 'kakao' && '채팅'}
                  {activeApp === 'message' && '메시지'}
                  {activeApp === 'phone' && '최근 통화'}
                  {activeApp === 'gallery' && '사진'}
                  {activeApp === 'youtube' && 'YouTube'}
                  {activeApp === 'instagram' && 'Instagram'}
                  {activeApp === 'music' && 'Apple Music'}
                </span>
                <span className="text-xs text-gray-400">편집</span>
              </div>

              {/* 앱 내부 컨텐츠 영역 */}
              <div className="flex-1 overflow-y-auto bg-white">
                {activeApp === 'kakao' && (
                  <div className="divide-y">
                    <div className="flex items-center p-3 hover:bg-gray-50 cursor-pointer" onClick={() => setActiveApp('kakao_taeeun')}>
                      <img src="https://i.imgur.com/PT8pEwC.jpeg" className="w-12 h-12 rounded-2xl object-cover mr-3" alt="" />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">태은 선배</div>
                        <div className="text-xs text-gray-500 truncate">일어나면 연락해</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                      <div className="w-12 h-12 rounded-2xl bg-gray-300 flex items-center justify-center text-white font-bold mr-3">엄</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">엄마</div>
                        <div className="text-xs text-gray-500 truncate">엄마도요</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'kakao_taeeun' && (
                  <div className="flex flex-col h-full bg-[#abc1d1]">
                    <div className="p-3 bg-white/80 border-b font-semibold text-center text-sm">태은 선배</div>
                    <div className="flex-1 p-3 overflow-y-auto space-y-3">
                      {kakaoChat.map((msg, idx) => (
                        <div key={idx} className={`flex ${msg.sender === '나' ? 'justify-end' : 'justify-start'}`}>
                          {msg.sender !== '나' && <img src="https://i.imgur.com/PT8pEwC.jpeg" className="w-9 h-9 rounded-xl object-cover mr-2" alt="" />}
                          <div className={`max-w-[70%] p-2.5 rounded-2xl text-sm ${msg.sender === '나' ? 'bg-[#fee500]' : 'bg-white'}`}>
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>
                    <div className="p-2 bg-white flex items-center">
                      <input type="text" placeholder="메시지 입력" className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm outline-none" />
                    </div>
                  </div>
                )}

                {activeApp === 'message' && (
                  <div className="divide-y">
                    <div className="flex items-center p-3">
                      <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-white mr-3 shrink-0">엄</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">엄마</div>
                        <div className="text-xs text-gray-500 truncate">바쁘니? 전화 받아봐</div>
                      </div>
                    </div>
                    <div className="flex items-center p-3">
                      <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center text-white mr-3 shrink-0">택</div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm">한진택배</div>
                        <div className="text-xs text-gray-500 truncate">[한진택배] 고객님의 상품이 배송 완료되었습니다.</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeApp === 'phone' && (
                  <div className="divide-y">
                    <div className="p-3 font-bold text-lg">최근 통화 기록</div>
                    <div className="p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                      <div>
                        <div className="font-semibold text-red-500">태은 선배</div>
                        <div className="text-xs text-gray-400">모바일 통화 • 수신됨</div>
                      </div>
                      <span className="text-blue-500 text-sm">상세 정보</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
