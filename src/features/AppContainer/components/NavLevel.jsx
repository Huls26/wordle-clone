import { AiOutlineStar } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
// import { ImCross } from 'react-icons/im';

export default function NavLevel() {
  return (
    <section className="flex w-[23em] justify-between">
      <div className="flex space-x-1">
        <AiOutlineStar />
        <AiOutlineStar />
        <AiOutlineStar />
      </div>

      <h1>Level 1</h1>

      <div className="flex space-x-1">
        <RxCrossCircled />
        <RxCrossCircled />
        <RxCrossCircled />
      </div>
    </section>
  );
}
