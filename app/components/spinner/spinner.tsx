import { RiLoader4Line } from 'react-icons/ri';

const Spinner = () => {
  return (
    <div className="grid h-screen w-full animate-spin place-items-center">
      <RiLoader4Line size={24} />
    </div>
  );
};

export default Spinner;
