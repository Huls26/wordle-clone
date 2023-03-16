import useFetchData from '@hooks/useFetchData';

export default function Mainpage() {
  const { data } = useFetchData();

  return (
    <div>{ data }</div>
  );
}
