import Logo from "~/utils/svgs/Logo";
import Classical from "~/utils/svgs/Classical";
import Blitz from "~/utils/svgs/Blitz";
import Rapid from "~/utils/svgs/Rapid";
import { TimeControl } from "~/types/TypeControl";
import TimeControlComponent from "./TimeControlComponent";
import ModeButton from "./ModeButton";
import useRatingSearchParams from "~/hooks/useRatingSearchParams";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18n from "~/i18n";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Menu() {
  const { timeControl, setTimeControl } = useRatingSearchParams();
  const { t } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("lang");

    if (lang) {
      i18n.changeLanguage(lang);
    }
  }, []);

  return (
    <main className="w-full min-h-16 dark:bg-[#334155] bg-[#0F172A] px-4 md:px-20 py-4 flex flex-col md:flex-row justify-between items-center gap-3">
      <div className="flex gap-2 items-center">
        <Logo />
        <h1 className="text-[#F8FAFC] font-extrabold text-sm sm:text-lg md:text-xl">
          {t("menu.title")}
        </h1>
      </div>
      <div className="flex flex-wrap gap-2 items-center justify-center">
        <div className="p-1 dark:bg-[#0f172a]/50 bg-[#FEFFFF]/10 rounded-full flex flex-wrap items-center justify-center">
          <TimeControlComponent
            svg={
              <Classical isActivated={TimeControl.CLASSICAL === timeControl} />
            }
            name={t("timeControl.classical")}
            isActivated={TimeControl.CLASSICAL === timeControl}
            onClick={() => setTimeControl(TimeControl.CLASSICAL)}
          />
          <TimeControlComponent
            svg={<Rapid isActivated={TimeControl.RAPID === timeControl} />}
            name={t("timeControl.rapid")}
            isActivated={TimeControl.RAPID === timeControl}
            onClick={() => setTimeControl(TimeControl.RAPID)}
          />
          <TimeControlComponent
            svg={<Blitz isActivated={TimeControl.BLITZ === timeControl} />}
            name={t("timeControl.blitz")}
            isActivated={TimeControl.BLITZ === timeControl}
            onClick={() => setTimeControl(TimeControl.BLITZ)}
          />
        </div>
        <ModeButton />
        <LanguageSwitcher />
      </div>
    </main>
  );
}
