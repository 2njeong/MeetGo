import { useEffect, useState } from 'react';
import { clientSupabase } from '(@/utils/supabase/client)';
import Image from 'next/image';
import AvatarDefault from '(@/utils/icons/AvatarDefault)';
import { userStore } from '(@/store/userStore)';
import { CommentListType } from './CommentList';
import { useCommentStore } from '(@/store/commentStore)';

type Props = {
  comment: CommentListType;
  onDeleteComment: (commentId: string) => void;
};

const CommentCard = ({ comment, onDeleteComment }: Props) => {
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [userNickname, setUserNickname] = useState<string | null>(null);

  const { user } = userStore((state) => state);
  const userId = user && user[0].user_id;

  const deleteComment = useCommentStore((state) => state.deleteComment);

  const getUserInfo = async () => {
    const { data: userData, error: userError } = await clientSupabase
      .from('users')
      .select('nickname, avatar')
      .eq('user_id', comment.user_id as string)
      .single();
    setUserAvatar(userData?.avatar || null);
    setUserNickname(userData?.nickname || null);
  };

  useEffect(() => {
    if (comment.comment_id) {
      getUserInfo();
    }
  }, []);

  const handleDeleteComment = async () => {
    if (window.confirm('댓글을 삭제하시겠습니까?')) {
      const { error } = await clientSupabase
        .from('review_comment')
        .delete()
        .eq('comment_id', comment.comment_id as string);
      onDeleteComment(comment.comment_id as string);
      deleteComment(comment.comment_id as string);
    }
  };

  return (
    <div className="flex">
      <div>
        {userAvatar ? (
          <Image className="mr-[15px] rounded-full" src={userAvatar} alt="유저 아바타" height={50} width={50} />
        ) : (
          <AvatarDefault />
        )}
      </div>
      <div>
        <div className="flex">
          <div>{userNickname}</div>
          <div className="text-[#A1A1AA]">
            {comment && comment.created_at
              ? new Intl.DateTimeFormat('ko-KR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                  hour12: false
                }).format(new Date(comment.created_at))
              : null}
          </div>
        </div>
        <div>
          <p>{comment.comment_content}</p>
        </div>
      </div>
      <div>{userId === comment.user_id && <button onClick={handleDeleteComment}>삭제</button>}</div>
    </div>
  );
};

export default CommentCard;
