import React, { useState, useEffect, useRef } from 'react';
import { 
  Battery, 
  Wifi, 
  Signal, 
  Lock, 
  ChevronLeft, 
  Phone, 
  MessageCircle, 
  Image as ImageIcon, 
  Music, 
  Youtube, 
  Instagram, 
  Play, 
  Plus,
  User,
  Heart,
  MessageCircle as Comment,
  Send,
  MoreHorizontal,
  Home,
  Search,
  Video,
  Settings,
  PhoneOff
} from 'lucide-react';

// --- Helper Data & Images ---

const HOME_BG = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800';
const TAEEUN_AVATAR = 'https://i.imgur.com/PT8pEwC.jpeg';
const DEFAULT_AVATAR = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%2381b8d0'/%3E%3Ccircle cx='50' cy='35' r='18' fill='%234e93b6'/%3E%3Cpath d='M 22 100 C 22 65, 78 65, 78 100 Z' fill='%234e93b6'/%3E%3C/svg%3E";

const INITIAL_KAKAO_FRIENDS = [
  { id: 'taeeun', name: '태은 선배', avatar: TAEEUN_AVATAR },
  { id: 'mom', name: '엄마', avatar: DEFAULT_AVATAR },
  { id: 'kang', name: '21학번 강서원 선배님', avatar: DEFAULT_AVATAR },
  { id: 'kim', name: '25학번 김동한', avatar: DEFAULT_AVATAR }
];

const INITIAL_TAEEUN_MSGS = [
  { id: 1, text: '일이 생겨서 먼저 나왔어', time: '오전 8:00', type: 'recv' },
  { id: 2, text: 'ㅠㅠ', time: '오전 8:00', type: 'recv' },
  { id: 3, text: '일어나면 연락해', time: '오전 8:01', type: 'recv' }
];

const OTHER_CHATS = {
  mom: [
    { id: 1, text: '하루야 밥 먹었어?', time: '오전 7:30', type: 'recv' },
    { id: 2, text: '먹었어요', time: '오전 8:01', type: 'sent' },
    { id: 3, text: '밥 잘 챙겨 먹고', time: '오전 8:05', type: 'recv' },
    { id: 4, text: '언제 올 거야?', time: '오전 8:05', type: 'recv' },
    { id: 5, text: '합주 끝나고 갈 거 같은데', time: '오전 8:10', type: 'sent' },
    { id: 6, text: '알았어 오늘 하루 잘 보내고', time: '오전 8:15', type: 'recv' },
    { id: 7, text: '엄마도요', time: '오전 8:16', type: 'sent' },
  ],
  kang: [
    { id: 1, text: '연습실 7시로 빌렸으니까 그때 오면 될 듯!', time: '어제', type: 'recv' },
    { id: 2, text: '천천히 와', time: '어제', type: 'recv' },
    { id: 3, text: '다른 애들 늦을 거 같다zz', time: '어제', type: 'recv' },
    { id: 4, text: '넵', time: '어제', type: 'sent' },
  ],
  kim: [
    { id: 1, text: '근데 아까 교수님이 과제 뭐라고 함?', time: '오후 2:30', type: 'recv' },
    { id: 2, text: '제출일 언제라고?', time: '오후 2:30', type: 'recv' },
    { id: 3, text: '다다음주 수업 시간', time: '오후 2:35', type: 'sent' },
    { id: 4, text: '오케', time: '오후 2:36', type: 'recv' },
    { id: 5, text: '근데 너 뒷풀이 올 거?', time: '오후 2:36', type: 'recv' },
    { id: 6, text: 'ㄴㄴ', time: '오후 2:40', type: 'sent' },
    { id: 7, text: '과대한테 말해둔다', time: '오후 2:41', type: 'recv' },
  ]
};

const INITIAL_GALLERY_PHOTOS = [
  'https://images.unsplash.com/photo-1612225330812-01a9c6b355ec?w=500', // 바이올린 1
  'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500', // 고양이 1
  'https://images.unsplash.com/photo-1533738363-b7f9aef128ce?w=500', // 고양이 2
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500', // 음식 1
  'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500', // 음식 2
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500', // 풍경 1
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=500', // 풍경 2
];

export default function IPhoneSimulator() {
  const [screen, setScreen] = useState('lock'); // lock, passcode, home, app
  const [activeApp, setActiveApp] = useState(null);
  
  // App States
  const [kakaoFriends] = useState(INITIAL_KAKAO_FRIENDS);
  const [kakaoView, setKakaoView] = useState('list'); // list, chat_taeeun, chat_mom, etc.
  const [kakaoTaeeunMsgs, setKakaoTaeeunMsgs] = useState(INITIAL_TAEEUN_MSGS);
  
  const [msgView, setMsgView] = useState('list');
  const [activeMsgContact, setActiveMsgContact] = useState('');

  const [phoneView, setPhoneView] = useState('history');
  const [phoneCallState, setPhoneCallState] = useState({ active: false, contact: null, status: '', subtitle: '' });

  const [galleryPhotos, setGalleryPhotos] = useState(INITIAL_GALLERY_PHOTOS);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const [youtubeView, setYoutubeView] = useState('list');
  const [activeVideo, setActiveVideo] = useState(null);

  const [instaTab, setInstaTab] = useState('feed');
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [musicView, setMusicView] = useState('playlist');

  const chatScrollRef = useRef(null);

  const currentTime = "08:23";
  const currentDate = "1월 23일 목요일";

  // --- Side Effects ---
  useEffect(() => {
    let seq = [];
    if (activeApp === 'kakao' && kakaoView === 'chat_taeeun') {
      setKakaoTaeeunMsgs([...INITIAL_TAEEUN_MSGS]);
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 4, text: '일어났어?', time: '오전 8:23', type: 'recv' }]), 3000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 5, text: '보고 싶다', time: '오전 8:23', type: 'recv' }]), 6000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 6, text: '일어났어요', time: '오전 8:24', type: 'sent' }]), 9000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 7, text: '언제 가셨어요?', time: '오전 8:24', type: 'sent' }]), 12000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 8, text: '한두시간 전에', time: '오전 8:25', type: 'recv' }]), 15000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 9, text: '이따가 볼까', time: '오전 8:25', type: 'recv' }]), 18000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 10, text: '데리러 가던 곳으로 갈게', time: '오전 8:26', type: 'recv' }]), 21000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 11, text: '선배 저 언제 끝나는지 모르시잖아요', time: '오전 8:26', type: 'sent' }]), 24000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 12, text: '일찍 가서 기다리지 뭐', time: '오전 8:27', type: 'recv' }]), 27000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 13, text: '저 4시 반에 끝나요', time: '오전 8:27', type: 'sent' }]), 30000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 14, text: '오래 기다리지 말고 맞춰서 와요', time: '오전 8:28', type: 'sent' }]), 33000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 15, text: '응', time: '오전 8:28', type: 'recv' }]), 36000));
      seq.push(setTimeout(() => setKakaoTaeeunMsgs(p => [...p, { id: 16, text: '이따 봐', time: '오전 8:29', type: 'recv' }]), 39000));
    }
    return () => seq.forEach(clearTimeout);
  }, [activeApp, kakaoView]);

  useEffect(() => {
    let seq = [];
    if (activeApp === 'phone' && phoneCallState.active) {
      if (phoneCallState.contact && phoneCallState.contact.includes('태은')) {
        seq.push(setTimeout(() => setPhoneCallState(p => ({...p, status: 'connected', subtitle: '잘잤어?'})), 2000));
        seq.push(setTimeout(() => setPhoneCallState(p => ({...p, subtitle: '너 일어날 때까지 같이 있었어야 했는데.'})), 5000));
        seq.push(setTimeout(() => setPhoneCallState(p => ({...p, subtitle: '아, 잠깐만... 누가 불러서. 카톡할게'})), 9000));
        seq.push(setTimeout(() => {
          setPhoneCallState(p => ({...p, status: 'ended', subtitle: '통화 종료'}));
          setTimeout(() => setPhoneView('history'), 1500);
        }, 12000));
      } else {
        seq.push(setTimeout(() => setPhoneCallState(p => ({...p, status: 'no_answer', subtitle: '응답 없음'})), 4000));
        seq.push(setTimeout(() => {
          setPhoneCallState({ active: false, contact: null, status: '', subtitle: '' });
          setPhoneView('history');
        }, 5500));
      }
    }
    return () => seq.forEach(clearTimeout);
  }, [activeApp, phoneCallState.active, phoneCallState.contact]);

  useEffect(() => {
    if (passcode.length === 4) {
      if (passcode === '0913') {
        setScreen('home');
      } else {
        setPasscodeError(true);
        setTimeout(() => {
          setPasscode('');
          setPasscodeError(false);
        }, 400);
      }
    }
  }, [passcode]);

  useEffect(() => {
    if (activeApp === 'kakao' && kakaoView.startsWith('chat_') && chatScrollRef.current) {
      setTimeout(() => {
        if (chatScrollRef.current) {
          chatScrollRef.current.scrollTo({
            top: chatScrollRef.current.scrollHeight,
            behavior: 'smooth'
          });
        }
      }, 50);
    }
  }, [kakaoTaeeunMsgs, kakaoView, activeApp]);

  const handleAppOpen = (appName) => {
    setActiveApp(appName);
    setScreen('app');
    if(appName === 'kakao') setKakaoView('list');
    if(appName === 'message') setMsgView('list');
    if(appName === 'phone') setPhoneView('history');
    if(appName === 'gallery') setSelectedPhoto(null);
    if(appName === 'youtube') setYoutubeView('list');
    if(appName === 'instagram') setInstaTab('feed');
    if(appName === 'music') setMusicView('playlist');
  };

  const goHome = () => {
    setScreen('home');
    setActiveApp(null);
    setPhoneCallState({ active: false, contact: null, status: '', subtitle: '' });
  };

  // --- Render Functions (Apps) ---

  const renderLockScreen = () => (
    <div className="relative w-full h-full text-white flex flex-col items-center justify-between py-16 cursor-pointer" onClick={() => setScreen('passcode')}>
      <div className="flex flex-col items-center mt-12">
        <Lock className="w-5 h-5 mb-2" />
        <span className="text-xl font-medium">{currentDate}</span>
        <span className="text-[5.5rem] leading-none font-light tracking-tight mt-2">{currentTime}</span>
      </div>
      
      <div className="absolute bottom-8 flex flex-col items-center w-full animate-pulse">
        <span className="text-sm font-medium">위로 밀거나 눌러서 열기</span>
        <div className="w-32 h-1 bg-white rounded-full mt-4"></div>
      </div>
    </div>
  );

  const renderPasscodeScreen = () => {
    const handleKey = (num) => { if (passcode.length < 4) setPasscode(prev => prev + num); };
    const handleDelete = () => setPasscode(prev => prev.slice(0, -1));

    return (
      <div className="relative w-full h-full bg-black/90 backdrop-blur-xl text-white flex flex-col items-center pt-24 z-50">
        <h2 className="text-xl mb-6">암호 입력</h2>
        <div className={`flex gap-6 mb-16 ${passcodeError ? 'animate-[shake_0.4s_ease-in-out]' : ''}`}>
          {[...Array(4)].map((_, i) => (
            <div key={i} className={`w-3 h-3 rounded-full border border-white ${passcode.length > i ? 'bg-white' : 'bg-transparent'}`} />
          ))}
        </div>
        
        <div className="grid grid-cols-3 gap-x-8 gap-y-6">
          {[1,2,3,4,5,6,7,8,9].map(num => (
            <button key={num} onClick={() => handleKey(num.toString())} className="w-16 h-16 rounded-full bg-[#333] hover:bg-[#444] text-3xl font-light active:scale-95 transition flex items-center justify-center">
              {num}
            </button>
          ))}
          <button className="col-start-1 col-end-2 w-16 h-16 flex items-center justify-center text-sm" onClick={() => setScreen('lock')}>취소</button>
          <button onClick={() => handleKey('0')} className="col-start-2 col-end-3 w-16 h-16 rounded-full bg-[#333] hover:bg-[#444] text-3xl font-light active:scale-95 transition flex items-center justify-center">
            0
          </button>
          <button onClick={handleDelete} className="col-start-3 col-end-4 w-16 h-16 flex items-center justify-center active:scale-95 transition">
            <span className="text-xl">⌫</span>
          </button>
        </div>
        <style>{`
          @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-10px); } 50% { transform: translateX(10px); } 75% { transform: translateX(-10px); } }
        `}</style>
      </div>
    );
  };

  const renderHomeScreen = () => {
    const apps = [
      { id: 'kakao', name: '카카오톡', bg: 'bg-[#FAE100]', icon: <MessageCircle className="text-[#3C1E1E]" /> },
      { id: 'youtube', name: 'YouTube', bg: 'bg-white', icon: <Youtube className="text-red-600 w-8 h-8" /> },
      { id: 'instagram', name: 'Instagram', bg: 'bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500', icon: <Instagram className="text-white w-8 h-8" /> },
      { id: 'gallery', name: '갤러리', bg: 'bg-white', icon: <ImageIcon className="text-blue-500 w-8 h-8" /> },
      { id: 'music', name: '음악', bg: 'bg-[#FA243C]', icon: <Music className="text-white w-8 h-8" /> },
    ];
    
    const dockApps = [
      { id: 'phone', bg: 'bg-green-500', icon: <Phone className="text-white w-7 h-7 fill-current" /> },
      { id: 'message', bg: 'bg-green-400', icon: <MessageCircle className="text-white w-8 h-8 fill-current" /> },
    ];

    return (
      <div className="relative w-full h-full p-6 pt-16 flex flex-col justify-between z-10">
        <div className="grid grid-cols-4 gap-4 mt-8">
          {apps.map(app => (
            <div key={app.id} className="flex flex-col items-center cursor-pointer active:opacity-70" onClick={() => handleAppOpen(app.id)}>
              <div className={`w-14 h-14 rounded-2xl ${app.bg} flex items-center justify-center shadow-sm`}>
                {app.icon}
              </div>
              <span className="text-white text-xs mt-1 font-medium drop-shadow-md">{app.name}</span>
            </div>
          ))}
        </div>

        <div className="bg-white/30 backdrop-blur-xl rounded-[2rem] p-4 flex justify-around mb-2 border border-white/20">
           {dockApps.map(app => (
            <div key={app.id} className="cursor-pointer active:scale-95 transition" onClick={() => handleAppOpen(app.id)}>
              <div className={`w-14 h-14 rounded-2xl ${app.bg} flex items-center justify-center shadow-lg`}>
                {app.icon}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderKakaoApp = () => {
    let activeMsgs = [];
    const activeId = kakaoView.replace('chat_', '');
    if (kakaoView === 'chat_taeeun') activeMsgs = kakaoTaeeunMsgs;
    else if (OTHER_CHATS[activeId]) activeMsgs = OTHER_CHATS[activeId];

    return (
      <div className="w-full h-full bg-[#b2c7d9] flex flex-col relative z-20">
        <div className="flex items-center justify-between px-4 pt-14 pb-3 bg-[#b2c7d9]">
          {kakaoView !== 'list' ? (
            <div className="flex items-center space-x-2">
              <ChevronLeft className="w-6 h-6 cursor-pointer text-gray-800 -ml-2" onClick={() => setKakaoView('list')} />
              <span className="font-semibold text-lg">{kakaoFriends.find(f => f.id === activeId)?.name || '채팅방'}</span>
            </div>
          ) : (
            <span className="font-bold text-xl ml-2 text-black">채팅</span>
          )}
          <MoreHorizontal className="w-6 h-6 text-gray-800" />
        </div>

        <div className={`flex-1 overflow-y-auto pb-12 hide-scrollbar ${kakaoView === 'list' ? 'bg-white' : 'bg-[#b2c7d9]'}`} ref={chatScrollRef}>
          {kakaoView === 'list' && (
            <div className="p-4 space-y-4">
              {kakaoFriends.map(f => {
                const previewText = f.id === 'taeeun' ? '일어나면 연락해' : OTHER_CHATS[f.id][OTHER_CHATS[f.id].length-1].text;
                return (
                  <div key={f.id} className="flex items-center space-x-3 cursor-pointer" onClick={() => setKakaoView(`chat_${f.id}`)}>
                    <div className="relative flex-shrink-0 z-30">
                      <img src={f.avatar} alt="profile" className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
                    </div>
                    <div className="flex-1 border-b border-gray-100 pb-3 min-w-0">
                      <h3 className="font-semibold text-black">{f.name}</h3>
                      <p className="text-sm text-gray-500 truncate mt-0.5">{previewText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {kakaoView.startsWith('chat_') && (
            <div className="p-4 flex flex-col space-y-4 pb-6">
              {activeMsgs.map(msg => (
                <div key={msg.id} className={`flex flex-col w-full ${msg.type === 'sent' ? 'items-end' : 'items-start'}`}>
                  {msg.type === 'recv' ? (
                    <div className="flex items-start space-x-2 max-w-[85%]">
                      <div className="flex-shrink-0">
                        <img src={kakaoFriends.find(f => f.id === activeId)?.avatar} className="w-10 h-10 rounded-2xl object-cover shadow-sm" alt="avatar" />
                      </div>
                      <div>
                        <span className="text-[11px] text-gray-700 mb-1 block ml-1 font-medium">{kakaoFriends.find(f => f.id === activeId)?.name}</span>
                        <div className="flex items-end space-x-1">
                          <div className="bg-white px-3.5 py-2.5 rounded-2xl rounded-tl-sm shadow-sm text-[15px] break-words whitespace-pre-wrap leading-snug">
                            {msg.text}
                          </div>
                          <span className="text-[10px] text-gray-500 mb-1 flex-shrink-0">{msg.time}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end space-x-1 max-w-[85%] justify-end">
                      <span className="text-[10px] text-gray-500 mb-1 flex-shrink-0">{msg.time}</span>
                      <div className="bg-[#fee500] px-3.5 py-2.5 rounded-2xl rounded-tr-sm shadow-sm text-[15px] break-words whitespace-pre-wrap leading-snug">
                        {msg.text}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {kakaoView !== 'list' && (
          <div className="absolute bottom-0 w-full h-12 bg-white flex items-center px-4 border-t border-gray-200">
            <Plus className="w-6 h-6 text-gray-500 mr-2" />
            <input type="text" className="flex-1 bg-gray-100 rounded-full px-4 py-1.5 outline-none text-sm" placeholder="메시지 입력" disabled />
            <div className="w-8 h-8 bg-yellow-300 rounded-full flex items-center justify-center ml-2">
              <Send className="w-4 h-4 text-gray-800" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderMessageApp = () => {
    const msgs = [
      { id: 'mom', name: '엄마', snippet: '바쁘니? 전화 받아봐', time: '오전 7:30' },
      { id: 'hanjin', name: '한진택배', snippet: '[한진택배] 고객님의 상품이 배송 완료되었습니다.', time: '어제' },
    ];
    return (
      <div className="w-full h-full bg-white flex flex-col relative z-20">
        <div className="flex items-center px-4 pt-14 pb-3 bg-gray-50/90 backdrop-blur-md border-b">
          {msgView === 'list' ? (
             <span className="font-bold text-2xl text-black">메시지</span>
          ) : (
            <div className="flex items-center text-blue-500 cursor-pointer" onClick={() => setMsgView('list')}>
              <ChevronLeft className="w-6 h-6 -ml-2" />
            </div>
          )}
        </div>
        <div className="flex-1 overflow-y-auto pb-8 hide-scrollbar">
          {msgView === 'list' && (
            <div className="p-4">
              {msgs.map(m => (
                <div key={m.id} className="flex items-center py-3 border-b border-gray-100 cursor-pointer" onClick={() => { setActiveMsgContact(m.name); setMsgView('chat'); }}>
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3 flex-shrink-0">
                    <User className="text-white w-6 h-6" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-semibold truncate pr-2 text-black">{m.name}</span>
                      <span className="text-xs text-gray-400 whitespace-nowrap">{m.time}</span>
                    </div>
                    <p className="text-sm text-gray-500 truncate w-full">{m.snippet}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {msgView === 'chat' && (
            <div className="flex flex-col p-4 space-y-4">
              <div className="flex flex-col items-center mb-4">
                 <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center mb-2">
                    <User className="text-white w-8 h-8" />
                  </div>
                  <span className="text-sm font-medium text-black">{activeMsgContact}</span>
              </div>
              <div className="flex items-start w-full">
                <div className="bg-gray-200 text-black px-4 py-2 rounded-2xl rounded-tl-sm max-w-[75%] text-[15px]">
                  {activeMsgContact === '엄마' ? '바쁘니? 전화 받아봐' : '[한진택배] 고객님의 상품이 배송 완료되었습니다. 이용해주셔서 감사합니다.'}
                </div>
              </div>
            </div>
          )}
        </div>
        {msgView === 'chat' && (
          <div className="absolute bottom-0 w-full p-2 pb-6 bg-gray-100 flex items-center">
            <input type="text" className="flex-1 bg-white border border-gray-300 rounded-full px-4 py-2 text-sm outline-none" placeholder="문자 메시지" disabled />
          </div>
        )}
      </div>
    );
  };

  const renderPhoneApp = () => {
    const history = [
      { date: '1월 16일', calls: [{ name: '태은 선배', time: '오후 11:30' }] },
      { date: '1월 15일', calls: [{ name: '엄마', time: '오후 6:20' }, { name: '23학번 전유경 선배님', time: '오전 10:15' }] },
      { date: '1월 13일', calls: [{ name: '한진택배', time: '오후 2:40' }] },
      { date: '1월 7일', calls: [{ name: '엄마', time: '오후 8:10' }] },
      { date: '1월 6일', calls: [{ name: '21학번 김동한 선배님', time: '오후 1:11' }] },
    ];

    const startCall = (name) => {
      setPhoneCallState({ active: true, contact: name, status: 'calling', subtitle: '' });
      setPhoneView('calling');
    };

    if (phoneView === 'calling') {
      return (
        <div className="w-full h-full bg-stone-900 text-white flex flex-col relative z-50 pt-20">
          <div className="flex flex-col items-center">
            <span className="text-gray-400 text-sm mb-2">
              {phoneCallState.status === 'calling' ? '발신 중...' : 
               phoneCallState.status === 'connected' ? '00:0' + Math.floor(Math.random()*9) : 
               phoneCallState.subtitle || ' '}
            </span>
            <span className="text-[34px] font-medium mb-6">{phoneCallState.contact}</span>
          </div>
          
          {phoneCallState.status === 'connected' && (
             <div className="mx-auto w-4/5 text-center text-[17px] bg-black/40 p-4 rounded-2xl backdrop-blur-md mt-4 text-gray-100 min-h-[60px] flex items-center justify-center border border-white/10 shadow-lg">
                "{phoneCallState.subtitle}"
             </div>
          )}

          <div className="absolute bottom-12 w-full px-8">
            <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-12">
               {['소리 끔', '키패드', '스피커', '통화 추가', 'FaceTime', '연락처'].map((btn, i) => (
                 <div key={i} className="flex flex-col items-center gap-2">
                   <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center">
                     <span className="text-xs text-gray-300 font-medium">{btn}</span>
                   </div>
                 </div>
               ))}
            </div>
            <div className="flex justify-center">
              <button className="w-[72px] h-[72px] rounded-full bg-[#FF3B30] flex items-center justify-center p-5 hover:bg-red-600 transition" onClick={() => {
                setPhoneCallState({ active: false, contact: null, status: '', subtitle: '' });
                setPhoneView('history');
              }}>
                <PhoneOff className="w-8 h-8 text-white fill-current" />
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-white flex flex-col relative z-20">
        <div className="pt-16 px-4 pb-3 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-black">최근 통화</h1>
        </div>
        <div className="flex-1 overflow-y-auto pb-16 hide-scrollbar px-4">
          {history.map((group, idx) => (
            <div key={idx} className="mt-4">
              <h2 className="text-lg font-bold mb-2 text-black">{group.date}</h2>
              {group.calls.map((call, cidx) => (
                <div key={cidx} className="flex justify-between items-center py-3 border-b border-gray-100 cursor-pointer active:bg-gray-100" onClick={() => startCall(call.name)}>
                  <div className="flex flex-col">
                    <span className={`text-[17px] font-semibold ${call.name.includes('태은') ? 'text-red-500' : 'text-black'}`}>{call.name}</span>
                    <span className="text-sm text-gray-500">휴대전화</span>
                  </div>
                  <div className="flex items-center text-gray-500 space-x-2">
                    <span className="text-sm">{call.time}</span>
                    <Settings className="w-5 h-5 text-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderGalleryApp = () => {
    const handleAddPhoto = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => setGalleryPhotos([event.target.result, ...galleryPhotos]);
        reader.readAsDataURL(file);
      }
    };

    if (selectedPhoto) {
      return (
        <div className="w-full h-full bg-black flex flex-col relative z-50">
          <div className="h-16 pt-4 flex items-center justify-between px-4 text-white">
            <div className="flex items-center cursor-pointer" onClick={() => setSelectedPhoto(null)}>
              <ChevronLeft className="w-7 h-7 -ml-2" />
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center overflow-hidden">
            <img src={selectedPhoto} className="w-full h-auto max-h-full object-contain" alt="Fullscreen" />
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-white flex flex-col relative z-20">
        <div className="flex justify-between items-center px-4 pt-16 pb-3 border-b border-gray-100">
          <h1 className="text-3xl font-bold text-black">앨범</h1>
          <label className="text-blue-500 cursor-pointer">
            <Plus className="w-7 h-7" />
            <input type="file" accept="image/*" className="hidden" onChange={handleAddPhoto} />
          </label>
        </div>
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {galleryPhotos.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400 pb-20">
              <ImageIcon className="w-16 h-16 mb-4 opacity-50" />
              <p>사진 또는 비디오 없음</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-1 px-1 mt-1">
              {galleryPhotos.map((url, i) => (
                <div key={i} className="aspect-square cursor-pointer bg-gray-100" onClick={() => setSelectedPhoto(url)}>
                  <img src={url} alt={`photo-${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderYoutubeApp = () => {
    const videos = [
      { id: 'Ico2EmLXjj4', title: 'YouTube Video 1' },
      { id: '2oOLRX3uNsg', title: 'YouTube Video 2' },
      { id: 'CsKZmUcQOzg', title: 'YouTube Video 3' },
    ];
    if (youtubeView === 'video') {
      return (
        <div className="w-full h-full bg-black text-white flex flex-col relative z-20">
          <div className="pt-14 pb-2 flex items-center px-4">
            <ChevronLeft className="w-7 h-7 cursor-pointer -ml-2" onClick={() => setYoutubeView('list')} />
          </div>
          <div className="w-full aspect-video mt-2 bg-gray-900">
            <iframe className="w-full h-full" src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-bold">Video Player</h2>
            <p className="text-gray-400 text-sm mt-2">상세 재생 화면입니다.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="w-full h-full bg-[#0f0f0f] text-white flex flex-col relative z-20">
        <div className="flex items-center justify-between px-4 pt-14 pb-3 border-b border-gray-800">
          <div className="flex items-center">
            <Youtube className="text-red-600 w-8 h-8 mr-1" />
            <span className="font-bold text-xl tracking-tighter">YouTube</span>
          </div>
          <div className="flex gap-4">
            <Search className="w-5 h-5" />
            <User className="w-5 h-5" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto pb-12 hide-scrollbar pt-2">
          {videos.map(v => (
            <div key={v.id} className="mb-6 cursor-pointer" onClick={() => { setActiveVideo(v.id); setYoutubeView('video'); }}>
              <div className="w-full aspect-video relative">
                <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt="thumb" className="w-full h-full object-cover" />
                <span className="absolute bottom-2 right-2 bg-black/80 px-1 text-xs rounded">3:42</span>
              </div>
              <div className="flex p-3 gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold line-clamp-2">유튜브 추천 영상 ({v.id})</h3>
                  <p className="text-xs text-gray-400 mt-1">추천 채널 • 조회수 14만회 • 2일 전</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderInstagramApp = () => {
    return (
      <div className="w-full h-full bg-white flex flex-col relative z-20">
        <div className="flex items-center justify-between px-4 pt-14 pb-3 border-b border-gray-200 bg-white z-30">
          {instaTab === 'feed' ? (
            <span className="font-[cursive] text-2xl font-bold text-black">Instagram</span>
          ) : (
            <div className="flex items-center space-x-1">
              <Lock className="w-4 h-4 text-black" />
              <span className="font-bold text-xl tracking-tight text-black">haruleeV</span>
              <ChevronLeft className="w-5 h-5 -rotate-90 text-black" />
            </div>
          )}
          <div className="flex gap-4">
            <Heart className="w-6 h-6 text-black" />
            <MessageCircle className="w-6 h-6 text-black" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto hide-scrollbar bg-gray-50 pb-16">
          {instaTab === 'feed' && (
            <div className="flex flex-col bg-white">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center p-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-400 to-fuchsia-600 p-[2px]">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                       <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100" alt="user" className="w-full h-full object-cover"/>
                    </div>
                  </div>
                  <span className="ml-2 font-semibold text-sm text-black">random_user</span>
                  <MoreHorizontal className="ml-auto w-5 h-5 text-gray-500" />
                </div>
                <div className="w-full aspect-square bg-gray-200">
                   <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=500" className="w-full h-full object-cover" alt="post" />
                </div>
                <div className="p-3">
                  <div className="flex gap-4 mb-2 text-black">
                    <Heart className="w-6 h-6" />
                    <Comment className="w-6 h-6" />
                    <Send className="w-6 h-6" />
                  </div>
                  <span className="font-semibold text-sm text-black">좋아요 1,234개</span>
                  <div className="text-sm mt-1 text-black">
                    <span className="font-semibold mr-2">random_user</span>
                    완벽한 하루 ✨
                  </div>
                </div>
              </div>
            </div>
          )}
          {instaTab === 'profile' && (
            <div className="bg-white min-h-full">
              <div className="p-4 flex items-center justify-between">
                <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border border-gray-300">
                  <User className="w-10 h-10 text-gray-400" />
                </div>
                <div className="flex flex-1 justify-around ml-6 text-center">
                  <div><div className="font-bold text-lg text-black">0</div><div className="text-sm text-gray-600">게시물</div></div>
                  <div><div className="font-bold text-lg text-black">174</div><div className="text-sm text-gray-600">팔로워</div></div>
                  <div><div className="font-bold text-lg text-black">200</div><div className="text-sm text-gray-600">팔로잉</div></div>
                </div>
              </div>
              <div className="px-4 font-semibold text-sm mb-4 text-black">haruleeV</div>
              <div className="px-4 flex gap-2">
                <button className="flex-1 bg-gray-200 font-semibold py-1.5 rounded-lg text-sm text-black">프로필 편집</button>
                <button className="flex-1 bg-gray-200 font-semibold py-1.5 rounded-lg text-sm text-black">프로필 공유</button>
              </div>
              <div className="mt-8 flex justify-center border-t border-gray-200 pt-12">
                <div className="text-center">
                  <div className="w-16 h-16 border-2 border-black rounded-full flex items-center justify-center mx-auto mb-4 text-black">
                    <Plus className="w-8 h-8" />
                  </div>
                  <h2 className="font-bold text-xl mb-2 text-black">게시물 없음</h2>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute bottom-0 w-full h-12 bg-white border-t border-gray-200 flex justify-around items-center pb-2 z-30">
          <Home className={`w-6 h-6 ${instaTab === 'feed' ? 'text-black' : 'text-gray-400'}`} onClick={() => setInstaTab('feed')} />
          <Search className="w-6 h-6 text-gray-400" />
          <Video className="w-6 h-6 text-gray-400" />
          <User className={`w-6 h-6 ${instaTab === 'profile' ? 'text-black' : 'text-gray-400'}`} onClick={() => setInstaTab('profile')} />
        </div>
      </div>
    );
  };

  const renderMusicApp = () => {
    if (musicView === 'player') {
      return (
        <div className="w-full h-full bg-black flex flex-col relative z-20">
          <div className="pt-14 px-4 pb-3 flex justify-between items-center bg-black border-b border-gray-900 text-white">
             <ChevronLeft className="w-7 h-7 cursor-pointer -ml-2" onClick={() => setMusicView('playlist')} />
             <h1 className="text-xl font-bold tracking-tight">Apple Music</h1>
             <div className="w-7"></div>
          </div>
          <div className="flex-1 w-full bg-black flex justify-center pb-8">
            <iframe 
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write" 
              frameBorder="0" 
              height="100%" 
              style={{width:'100%', maxWidth:'100%', overflow:'hidden', background:'transparent'}} 
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation" 
              src="https://embed.music.apple.com/kr/playlist/todays-hits/pl.f4d106fed2bd41149aaacabb233eb5eb">
            </iframe>
          </div>
        </div>
      );
    }

    const songs = [
      { title: '넌 내게 특별하고', artist: '소수빈' },
      { title: 'Antifreeze', artist: '백예린' },
      { title: '네가 좋아', artist: '노르웨이숲' },
      { title: 'Vancouver', artist: 'BIG Naughty' },
      { title: '나랑 같이 걸을래', artist: '적재' },
      { title: 'Everything', artist: '검정치마' }
    ];

    return (
      <div className="w-full h-full bg-white flex flex-col relative z-20">
        <div className="pt-16 px-5 pb-4 border-b border-gray-100 shadow-sm flex items-end">
           <h1 className="text-3xl font-bold text-black tracking-tight">today</h1>
        </div>
        <div className="flex-1 overflow-y-auto pb-24 hide-scrollbar">
           {songs.map((song, idx) => (
             <div key={idx} className="flex items-center px-5 py-3 border-b border-gray-50 cursor-pointer hover:bg-gray-50" onClick={() => setMusicView('player')}>
                <div className="w-12 h-12 bg-gray-100 rounded-lg mr-4 flex items-center justify-center shadow-inner">
                   <Music className="w-6 h-6 text-gray-400" />
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-[16px] text-gray-900">{song.title}</span>
                  <span className="text-[13px] text-gray-500 mt-0.5">{song.artist}</span>
                </div>
                <MoreHorizontal className="ml-auto w-5 h-5 text-gray-400" />
             </div>
           ))}
        </div>
        
        {/* Bottom Player */}
        <div 
          className="absolute bottom-[12px] left-3 right-3 bg-white/80 backdrop-blur-xl rounded-2xl p-3 flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200/50 cursor-pointer" 
          onClick={() => setMusicView('player')}
        >
          <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl mr-3 flex items-center justify-center shadow-sm">
             <Music className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col flex-1 overflow-hidden">
             <span className="font-semibold text-[15px] truncate text-black">넌 내게 특별하고</span>
             <span className="text-[13px] text-gray-500 truncate">소수빈</span>
          </div>
          <div className="flex space-x-4 pr-2 items-center">
             <Play className="w-6 h-6 text-black fill-current" />
          </div>
        </div>
      </div>
    );
  };

  const renderScreen = () => {
    if (screen === 'lock') return renderLockScreen();
    if (screen === 'passcode') return renderPasscodeScreen();
    if (screen === 'home') return renderHomeScreen();
    if (screen === 'app') {
      switch(activeApp) {
        case 'kakao': return renderKakaoApp();
        case 'message': return renderMessageApp();
        case 'phone': return renderPhoneApp();
        case 'gallery': return renderGalleryApp();
        case 'youtube': return renderYoutubeApp();
        case 'instagram': return renderInstagramApp();
        case 'music': return renderMusicApp();
        default: return renderHomeScreen();
      }
    }
  };

  const isDarkStatus = (screen === 'app' && activeApp !== 'youtube' && !(activeApp === 'music' && musicView === 'player')) && !(activeApp === 'phone' && phoneView === 'calling') && !(activeApp === 'gallery' && selectedPhoto);

  const getBackgroundImage = () => {
    if (screen === 'lock' || screen === 'passcode') return 'none';
    if (screen === 'home') return `url(${HOME_BG})`;
    return 'none';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div 
        className="relative w-[375px] h-[812px] rounded-[3rem] border-[14px] border-black bg-black overflow-hidden shadow-2xl shrink-0"
        style={{ backgroundImage: getBackgroundImage(), backgroundSize: 'cover', backgroundPosition: 'center' }}
      >
        {/* Status Bar */}
        <div className={`absolute top-0 w-full h-14 flex justify-between items-start px-6 pt-3.5 z-50 pointer-events-none ${isDarkStatus ? 'text-black' : 'text-white'}`}>
          <span className="text-sm font-semibold">{currentTime}</span>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] bg-black rounded-b-3xl"></div>
          <div className="flex items-center space-x-1">
            <Signal className="w-4 h-4" />
            <span className="text-xs font-bold mx-1">5G</span>
            <Battery className="w-5 h-5 fill-current" />
          </div>
        </div>

        {/* Screen Content */}
        {renderScreen()}

        {/* Home Bar Indicator */}
        {(screen === 'home' || screen === 'app') && (
          <div 
            className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1.5 bg-black/20 hover:bg-black/50 active:bg-black/80 rounded-full z-50 cursor-pointer transition-colors"
            onClick={goHome}
            style={{ backgroundColor: (isDarkStatus && !['youtube', 'music'].includes(activeApp)) ? '#000' : '#fff' }}
          />
        )}
      </div>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
