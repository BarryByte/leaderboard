/* eslint-disable @next/next/no-img-element */
import { useState, useRef, useEffect } from "react";

function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}
export default function BadgeIcons({ skill }) {
  const [showModel, setShowModel] = useState(false);
  const ref = useRef();
  useOnClickOutside(ref, () => setShowModel(false));

  const currentLevel = skill.levels.indexOf(skill.currentLevel) + 1;
  let glow = "";

  switch (skill.levels.length - currentLevel) {
    case 0:
      glow = "glow-gold";
      break;

    case 1:
      glow = "glow-silver";
      break;

    default:
      break;
  }

  return (
    <div ref={ref} className="" role="listitem">
      <div className="relative w-14 h-14 cursor-pointer">
        <img
          onClick={() => setShowModel(!showModel)}
          className={skill.currentLevel ? `badge-glow ${glow}` : "grayscale opacity-30"}
          src={skill.icon}
          alt="Graduate attribute"
        />
        {skill.currentLevel && (
          <div className="bg-white flex items-center justify-center absolute rounded bottom-0 right-0 z-10 py-0.5 px-1 leading-tight">
            <span className="text-xs font-medium">{skill.currentLevel.label}</span>
          </div>
        )}

        {/* model */}

        <div className={`inset-x-0 md:top-[calc(100%+10px)] md:inset-auto md:-left-[calc(125px-50%)] absolute z-20 bg-gray-800 rounded-lg shadow-2xl md:w-[250px] translate-y-5 transition-all mt-1 mx-4 md:mx-0 text-white ${showModel ? "opacity-100 translate-y-0 visible" : "invisible opacity-0"}`}>
          <div className="bg-gray-900 rounded-t-lg px-4 py-3 border-b border-gray-700">
            <img
              onClick={() => setShowModel(!showModel)}
              className={`w-24 h-24 mx-auto ${skill.currentLevel ? `badge-glow ${glow}` : "grayscale opacity-30"}`}
              src={skill.icon}
              alt="Graduate attribute"
            />
            <i className="fas fa-circle" />
          </div>
          <div className="px-4 pt-2 pb-4">
            <p className="font-bold pb-2">{skill.label}</p>
            <div className="space-y-1 text-sm">
              {skill.levels.map((level) => (
                <div key={level.value} className="flex items-center font-medium text-gray-400">
                  <p
                    className={`flex-shrink-0 bg-gray-700 px-1 py-0.5 rounded ${skill.currentLevel?.value >= level.value
                      ? "bg-green-400 text-white"
                      : ""
                      }`}
                  >
                    {level.label}
                  </p>
                  <div className="flex-grow pl-4">
                    <p
                      className={`flex items-center ${skill.currentLevel?.value >= level.value
                        ? "text-green-500"
                        : ""
                        }`}
                    >
                      {level.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
