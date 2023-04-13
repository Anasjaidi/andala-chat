import { IconRobot } from '@tabler/icons-react';

export default function AssistantMessage(props) {

  return (
    <div className="flex items-center mb-2  w-full">
      <div className="flex-none flex flex-col items-center space-y-1 mr-4 border-2 border-[#dbf64d] rounded-full px-1 py-1">
		<IconRobot size={20} />
      </div>
      <div className="flex-1 bg-[#dbf64d] text-gray-900 p-2 rounded-lg mb-2 relative w-1/2">
		<div className=" whitespace-normal break-words">
			{props.message}
		</div>
		<div className="absolute left-0 top-1/2 transform -translate-x-1/2 rotate-45 w-2 h-2 bg-[#dbf64d]"></div>
	</div>

    </div>
  );
}
