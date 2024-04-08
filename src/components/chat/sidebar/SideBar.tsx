'use client';

import React, { useEffect, useState } from 'react';
import Map from '(@/components/chat/sidebar/Map)';
import DatePicker from './DatePicker';
import { clientSupabase } from '(@/utils/supabase/client)';
import { chatStore } from '(@/store/chatStore)';

interface SideBarProps {
  userId: string | null | undefined;
}

const SideBar: React.FC<SideBarProps> = ({ userId }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [selectedMeetingTime, setSelectedMeetingTime] = useState<string>();
  const [isTimeSelected, setIsTimeSelected] = useState<boolean>(false);
  const [finalDateTime, setFinalDateTime] = useState<string>();

  const { roomId, chatRoomId, roomData } = chatStore((state) => state);

  const thisRoomId = roomData?.find((room) => room.room_id === roomId);
  const leaderId = thisRoomId?.leader_id;

  useEffect(() => {
    const fetchData = async () => {
      if (!chatRoomId) {
        return;
      }
      const { data: chatData } = await clientSupabase
        .from('chatting_room')
        .select('meeting_time')
        .eq('chatting_room_id', chatRoomId)
        .single();
      const meetingTime = chatData?.meeting_time;

      setIsTimeSelected(!!meetingTime);

      setSelectedMeetingTime(meetingTime || '');
      setFinalDateTime(meetingTime || '');
    };
    fetchData();
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSelectedTime = async () => {
    if (!chatRoomId) {
      return;
    }
    setIsTimeSelected(!isTimeSelected);
    setFinalDateTime(selectedMeetingTime);

    if (!isTimeSelected) {
      // 장소 선택 안되었을 때
      const { error } = await clientSupabase
        .from('chatting_room')
        .update({ meeting_time: selectedMeetingTime })
        .eq('chatting_room_id', chatRoomId);
    } else {
      setSelectedMeetingTime('');
      setFinalDateTime('');
      const { error } = await clientSupabase
        .from('chatting_room')
        .update({ meeting_time: null })
        .eq('chatting_room_id', chatRoomId);
    }
  };

  return (
    <div className="absolute">
      <button onClick={toggleSidebar}>사이드바</button>
      {isSidebarOpen && (
        <div>
          <div>
            {/* {userId === leaderId && (
              <>
                미팅 날짜/시간:
                <input
                  type="text"
                  className="border"
                  value={selectedMeetingTime}
                  onChange={(e) => setSelectedMeetingTime(e.target.value)}
                />
                <button onClick={handleSelectedTime}>{isTimeSelected ? '취소' : '선택'}</button>
              </>
            )} */}

            <>
              미팅 날짜/시간:
              <input
                type="text"
                className="border"
                value={selectedMeetingTime}
                onChange={(e) => setSelectedMeetingTime(e.target.value)}
              />
              <button onClick={handleSelectedTime}>{isTimeSelected ? '취소' : '선택'}</button>
            </>

            <p>최종 날짜 : {finalDateTime}</p>
          </div>
          <DatePicker />
          <Map userId={userId} leaderId={leaderId} chatRoomId={chatRoomId} />
        </div>
      )}
    </div>
  );
};

export default SideBar;
