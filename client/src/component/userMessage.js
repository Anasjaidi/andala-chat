import { IconUser } from '@tabler/icons-react';

export default function UserMessage(props) {
  return (
	<div className="flex items-center flex-row-reverse mb-4">
	<div className="flex-none flex flex-col items-center space-y-1 ml-4 border-2 border-[#dbf64d] rounded-full px-1 py-1">
	  <IconUser size={20} /> 
	</div>
	<div className="flex-1 bg-white text-gray-900 p-2 rounded-lg mb-2 relative w-1/2 border-2 border-[#dbf64d]">
	  <div className=" whitespace-normal break-words">
		{props.message}
	  </div>
	  <div className="absolute right-0 top-1/2 transform translate-x-1/2 rotate-45 w-2 h-2 bg-white border-t-2 border-r-2 border-[#dbf64d]"></div>
	</div>
  </div>
  );
}
