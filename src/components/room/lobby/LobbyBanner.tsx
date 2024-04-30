import React from 'react';

function LobbyBanner() {
  return (
    <div className="w-full flex flex-col items-center">
      {/* <article className="flex lg:flex-row flex-col justify-center items-center w-full lg:h-[4rem] h-[5rem] lg:text-[1.4rem] text-[0.9rem] text-white bg-mainColor">
        <h4>지금 대학생 이메일 인증하면,</h4>
        <h4 className="font-bold">수만 명의 캠퍼스 인연들을 </h4>
        <h4>만들 수 있어요.</h4>
      </article> */}
      <article className="lg:mt-[3rem] my-[2rem] lg:w-[1032px] w-[22rem] flex flex-col lg:gap-4">
        <h1 className="text-4xl font-extrabold">미팅하기</h1>
        <h3 className="text-[1rem] text-[#6F7785]">사람을 찾습니다. 이번 주말에 뭐하세요?</h3>
      </article>
    </div>
  );
}

export default LobbyBanner;
