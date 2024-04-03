import React, { Suspense } from 'react';
import ChatInput from '../../components/chat/ChatInput';
import { serverSupabase } from '(@/utils/supabase/server)';
import ChatHeader from '(@/components/chat/ChatHeader)';
import ChatList from '(@/components/chat/ChatList)';
import { ITEM_INTERVAL } from '(@/utils)';

const ChatPage = async () => {
  const supabase = serverSupabase();
  const { data } = await supabase.auth.getUser();
  // console.log('유저데이터 =>', data.user);
  const user = data.user;

  const { data: userData } = await supabase
    .from('users')
    .select('user_id, avatar, nickname')
    .eq('user_id', String(user?.id));
  // console.log(userData);

  const { data: serverMsg } = await supabase
    .from('messages')
    .select('*')
    .range(0, ITEM_INTERVAL)
    .order('created_at', { ascending: false });

  return (
    <div className="max-w-3xl mx-auto md:py-10 h-screen">
      <div className="h-full border rounded-md flex flex-col border-indigo-600 relative">
        <ChatHeader />
        {/* <div>
          <LoadChatMore />
        </div> */}
        <Suspense fallback="응애 나 애기 폴백">
          <ChatList serverMsg={serverMsg?.reverse() ?? []} user={user} />
        </Suspense>
        <ChatInput userData={userData} />
      </div>
    </div>
  );
};

export default ChatPage;
