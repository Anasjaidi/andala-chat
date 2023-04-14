import { useState } from "react";
import {
  IconBrandHipchat,
  IconSend,
  IconLayoutSidebarLeftExpand,
  IconLayoutSidebarLeftCollapse,
} from "@tabler/icons-react";

import AssistantMessage from "./assistantMessage";
import UserMessage from "./userMessage";
import { SideBar } from "./sideBar";
import { useEffect } from "react";
import axios from "axios";

export default function Chat() {
  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [sideBar, setSideBar] = useState(false);
  const [conversationList, setConversationList] = useState([]);
  const [selectedId, setSelectedId] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => {
    const fetchConvs = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        await axios
          .get("/api/v1/conversation", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((res) => {
            setConversationList(res.data.data);
          });
      }
    };
    fetchConvs();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedId != 0) {
        const messages = await axios.get(`/api/v1/conversation/${selectedId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // console.log("all messages, ", messages.data.data);
        setMessagesList(messages.data.data);
      }
    };
    fetchMessages();
  }, [selectedId]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const handleClosingPopup = () => {
    setOpen(false);
  };

  const handleOPeningPopup = () => {
    setOpen(true);
  };

  const handleOpenningSideBar = () => {
    setSideBar(true);
  };

  const handleClosingSideBar = () => {
    setSideBar(false);
  };

  return (
    <div className="fixed bottom-0 right-0 h-4/6 flex items-end ">
      {open ? (
        <div className="flex space-x-4 h-full">
          <div className="w-80 h-full flex flex-col border rounded-xl shadow-md bg-white ">
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center">
                <div className="hover:bg-[#dbf64d]/50  rounded-full w-10 h-10 flex items-center justify-center">
                  {!sideBar ? (
                    <IconLayoutSidebarLeftExpand
                      onClick={handleOpenningSideBar}
                    />
                  ) : (
                    <IconLayoutSidebarLeftCollapse
                      onClick={handleClosingSideBar}
                    />
                  )}
                </div>
              </div>
              <div className="flex flex-row space-x-1  items-center">
                <div className="w-2 h-2 rounded-full bg-green-600"></div>
                <div className="text-xs text-black">Online</div>
              </div>
              <div>
                <button
                  className="inline-flex hover:bg-[#dbf64d]/50 rounded-full p-2"
                  type="button"
                  onClick={handleClosingPopup}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            {/* chat */}
            <div className="overflow-y-auto w-full h-4/5 scrollbar-thin scrollbar-thumb-[#dbf64d] scrollbar-track-white scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
              {sideBar ? (
                <SideBar
                  conversationList={conversationList}
                  setConversationList={setConversationList}
                  setSelectedId={setSelectedId}
                />
              ) : null}
              <div className="px-2 py-4">
                {messagesList.map((item) =>
                  item.type === "assistant" ? (
                    <AssistantMessage message={item.content} />
                  ) : (
                    <UserMessage message={item.content} />
                  )
                )}
              </div>
            </div>

            <div className="flex items-center border-t p-2 space-x-1">
              <div className="w-full h-full">
                <input
                  className="w-full rounded-full border border-gray-900 px-2 placeholder:text-xs text-black text-sm h-full"
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Ask EduverceGPT"
                />
              </div>

              <div className="flex items-center justify-center">
                <button
                  className="inline-flex hover:bg-[#dbf64d]/50 rounded-full p-2"
                  type="button"
                >
                  <IconSend size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={handleOPeningPopup}
          href="#_"
          className=" animate-bounce relative inline-flex items-center justify-center p-2 overflow-hidden font-medium text-black mb-2 mr-3 transition duration-300 ease-out border-2 border-white rounded-full shadow-md group bg-[#dbf64d]"
        >
          <span className="absolute flex items-center justify-center w-full h-full text-black transition-all duration-300 transform  ease">
            <IconBrandHipchat size={22} />
          </span>
          <span className="relative invisible">ask</span>
        </button>
      )}
    </div>
  );
}
