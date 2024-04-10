'use client';

import React, { useEffect, useState } from 'react';
import Map from '(@/components/chat/sidebar/Map)';
import { useChatDataQuery, useRoomDataQuery } from '(@/hooks/useQueries/useChattingQuery)';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Card, CardBody } from '@nextui-org/react';

interface SideBarProps {
  userId: string | null | undefined;
  chatRoomId: string;
}

const SideBar: React.FC<SideBarProps> = ({ userId, chatRoomId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [finalDateTime, setFinalDateTime] = useState<string>();

  const room = useRoomDataQuery(chatRoomId);
  const leaderId = room?.roomData.leader_id;

  // 채팅방 정보 가져오기
  const chat = useChatDataQuery(chatRoomId);
  const meetingTime = chat?.[0]?.meeting_time;

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
    timeZone: 'Asia/Seoul'
  };

  useEffect(() => {
    if (meetingTime) {
      const convertedTime = new Intl.DateTimeFormat('ko-KR', options).format(new Date(meetingTime));
      setFinalDateTime(convertedTime);
    }
  }, [meetingTime]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className=" w-[377px] flex flex-col ml-8 z-0 ">
      <div className={`flex ${isSidebarOpen ? 'justify-end' : 'justify-start'}`}>
        <GiHamburgerMenu onClick={toggleSidebar} />
      </div>
      <div style={{ maxHeight: '100vh', overflowY: 'auto', paddingRight: '24px' }}>
        {isSidebarOpen && (
          <div>
            <h1 className="font-semibold text-2xl mb-2.5">미팅 날짜/시간</h1>
            <Card className="border border-mainColor shadow-none mb-6 h-[60px]">
              <CardBody>
                <p className=" justify-start items-center text-lg">{finalDateTime}</p>
              </CardBody>
            </Card>
            <Map userId={userId} chatRoomId={chatRoomId} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
