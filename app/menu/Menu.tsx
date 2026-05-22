import Logo from "~/utils/svgs/Logo";
import Classical from "~/utils/svgs/Classical";
import Blitz from "~/utils/svgs/Blitz";
import Rapid from "~/utils/svgs/Rapid";
import { TimeControl } from "~/types/TypeControl";
import TimeControlComponent from "./TimeControlComponent";
import ModeButton from "./ModeButton";
export default function Menu({
  timeControl,
  setTimeControl,
}: {
  timeControl: TimeControl;
  setTimeControl: (tc: TimeControl) => void;
}) {
  return (
    <main className="w-full h-16 dark:bg-[#334155] bg-[#0F172A] px-20 py-4 flex justify-between items-center">
      <div className="flex gap-2">
        <Logo />
        <h1 className="text-[#F8FAFC] font-extrabold text-xl">
          World Chess Rankings
        </h1>
      </div>
      <div className="flex gap-4 items-center">
        <div className="p-1 dark:bg-[#0f172a]/50 bg-[#FEFFFF]/10 rounded-full flex items-center">
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
        <ModeButton />
      </div>
    </main>
  );
}
