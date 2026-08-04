import { Sparkles } from "lucide-react";
import { profile } from "../data/portfolioData";

const Navbar = () => {
  return (
    <header className="px-[5%] relative z-30 pt-8">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-brand-red">{profile.tagTop}</div>
          <div>{profile.tagBottom}</div>
        </div>
        <div className="flex gap-4 items-center">
          {profile.availableBadge}
          <Sparkles size={14} className="text-brand-red" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
