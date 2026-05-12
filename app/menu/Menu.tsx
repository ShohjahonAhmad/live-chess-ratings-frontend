import Logo from "~/utils/svgs/Logo";
import Classical from "~/utils/svgs/Classical";
import Blitz from "~/utils/svgs/Blitz";
import Rapid from "~/utils/svgs/Rapid";
import { useState } from "react";
import { TimeControl } from "~/types/TypeControl";
import TimeControlComponent from "./TimeControlComponent";
export default function Menu() {
  const [timeControl, setTimeControl] = useState(TimeControl.CLASSICAL);

  return (
    <main className="w-screen h-16 bg-slate-900 px-20 py-4 flex justify-between items-center">
      <div className="flex gap-2">
        <Logo />
        <h1 className="text-slate-50 font-extrabold text-xl">
          World Chess Rankings
        </h1>
      </div>
      <div className="p-1 bg-[#FEFFFF]/10 rounded-full flex items-center">
        <TimeControlComponent
          svg={
            <Classical isActivated={TimeControl.CLASSICAL === timeControl} />
          }
          name={"Classical"}
          isActivated={TimeControl.CLASSICAL === timeControl}
          onClick={() => setTimeControl(TimeControl.CLASSICAL)}
        />
        <TimeControlComponent
          svg={<Rapid isActivated={TimeControl.RAPID === timeControl} />}
          name={"Rapid"}
          isActivated={TimeControl.RAPID === timeControl}
          onClick={() => setTimeControl(TimeControl.RAPID)}
        />
        <TimeControlComponent
          svg={<Blitz isActivated={TimeControl.BLITZ === timeControl} />}
          name={"Blitz"}
          isActivated={TimeControl.BLITZ === timeControl}
          onClick={() => setTimeControl(TimeControl.BLITZ)}
        />
      </div>
    </main>
  );
}
