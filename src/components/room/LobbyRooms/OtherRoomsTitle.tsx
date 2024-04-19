import MemberNumberSelection from '../MemberNumberSelection';
import RegionSelection from '../RegionSelection';

function OtherRoomsTitle({ children }: { children: React.ReactNode }) {
  return (
    <article className="z-10 pt-[454px]">
      <div className="flex flex-col justify-start max-w-[1000px]">
        <div className="text-[40px]	font-semibold">모집 중</div>
        <div className="flex flex-row gap-x-[16px] mt-[24px] w-1/4">
          <RegionSelection text={'selectRegion'} />
          <MemberNumberSelection text={'selectMember'} />
        </div>
      </div>
      {children}
    </article>
  );
}

export default OtherRoomsTitle;
