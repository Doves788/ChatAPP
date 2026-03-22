import { useRef, useState } from "react";
import useKeyboardSound from "../hooks/useKeyboardSound";
import { useChatStore } from "../store/useChatStore";
import toast from "react-hot-toast";
import { ImageIcon, SendIcon, XIcon } from "lucide-react";

function MessageInput() {
  const { playRandomKeyStrokeSound: prks } = useKeyboardSound();
  const [txt, stxt] = useState("");
  const [ip, sip] = useState(null);

  const fir = useRef(null);

  const { sendMessage: sm, isSoundEnabled: ise } = useChatStore();

  const hsm = (e) => {
    e.preventDefault();
    if (!txt.trim() && !ip) return;
    if (ise) prks();

    sm({
      text: txt.trim(),
      image: ip,
    });
    stxt("");
    sip("");
    if (fir.current) fir.current.value = "";
  };

  const hic = (e) => {
    const f = e.target.files[0];
    if (!f.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const rdr = new FileReader();
    rdr.onloadend = () => sip(rdr.result);
    rdr.readAsDataURL(f);
  };

  const ri = () => {
    sip(null);
    if (fir.current) fir.current.value = "";
  };

  return (
    <div className="p-4 border-t border-slate-700/50">
      {ip && (
        <div className="max-w-3xl mx-auto mb-3 flex items-center">
          <div className="relative">
            <img
              src={ip}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-slate-700"
            />
            <button
              onClick={ri}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-200 hover:bg-slate-700"
              type="button"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={hsm} className="max-w-3xl mx-auto flex space-x-4">
        <input
          type="text"
          value={txt}
          onChange={(e) => {
            stxt(e.target.value);
            ise && prks();
          }}
          className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-lg py-2 px-4"
          placeholder="Type your message..."
        />

        <input
          type="file"
          accept="image/*"
          ref={fir}
          onChange={hic}
          className="hidden"
        />

        <button
          type="button"
          onClick={() => fir.current?.click()}
          className={`bg-slate-800/50 text-slate-400 hover:text-slate-200 rounded-lg px-4 transition-colors ${
            ip ? "text-red-500" : ""
          }`}
        >
          <ImageIcon className="w-5 h-5" />
        </button>
        <button
          type="submit"
          disabled={!txt.trim() && !ip}
          className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg px-4 py-2 font-medium hover:from-red-600 hover:to-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <SendIcon className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}
export default MessageInput;