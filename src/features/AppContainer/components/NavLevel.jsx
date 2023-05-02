import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import { ImCross } from 'react-icons/im';

export default function NavLevel() {
  return (
    <section className="flex w-[20em] justify-between mb-2 items-center">
      <div className="flex space-x-1 text-2xl">
        <AiFillStar className="text-green" />
        <AiOutlineStar className="text-yellow" />
        <AiOutlineStar className="text-yellow" />
      </div>

      <h1 className="text-blue text-2xl font-bold drop-shadow-lg">Level 1</h1>

      <div className="flex space-x-1 text-2xl text-gray items-center">
        <ImCross className="text-red text-lg" />
        <RxCrossCircled />
        <RxCrossCircled />
      </div>
    </section>
  );
}
