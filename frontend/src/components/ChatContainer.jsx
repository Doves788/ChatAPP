import { useEffect, useRef } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser: su,
    getMessagesByUserId: gmbui,
    messages: msgs,
    isMessagesLoading: iml,
    subscribeToMessages: stm,
    unsubscribeFromMessages: ufm,
  } = useChatStore();
  const { authUser: au } = useAuthStore();
  const mer = useRef(null);

  useEffect(() => {
    gmbui(su._id);
    stm();

    return () => ufm();
  }, [su, gmbui, stm, ufm]);

  useEffect(() => {
    if (mer.current) {
      mer.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [msgs]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {msgs.length > 0 && !iml ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {msgs.map((m) => (
              <div
                key={m._id}
                className={`chat ${m.senderId === au._id ? "chat-end" : "chat-start"}`}
              >
                <div
                  className={`chat-bubble relative ${
                    m.senderId === au._id
                      ? "bg-red-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >
                  {m.image && (
                    <img src={m.image} alt="Shared" className="rounded-lg h-48 object-cover" />
                  )}
                  {m.text && <p className="mt-2">{m.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(m.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            <div ref={mer} />
          </div>
        ) : iml ? (
          <MessagesLoadingSkeleton />
        ) : (
          <NoChatHistoryPlaceholder name={su.fullName} />
        )}
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;