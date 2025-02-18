import { PiDownloadThin } from "react-icons/pi";
import { PiUsersThin } from "react-icons/pi";
import { PiTrashThin } from "react-icons/pi";
import { PiSignInThin } from "react-icons/pi";
import { PiFolderThin } from "react-icons/pi";

import { PiSunThin } from "react-icons/pi";
import { PiMoonThin } from "react-icons/pi";
import { PiMonitorThin } from "react-icons/pi";

export const menu = [
  { text: "Open", logo: <PiFolderThin size={17} /> },
  { text: "Download", logo: <PiDownloadThin size={17} /> },
  { text: "Live Collaboration", logo: <PiUsersThin size={17} /> },
  { text: "Reset the Canvas", logo: <PiTrashThin size={17} /> },
  { text: "Sign Up", logo: <PiSignInThin size={17} /> },
];

export const theme = [
  { type: "light", logo: <PiSunThin /> },
  { type: "dark", logo: <PiMoonThin /> },
  { type: "system", logo: <PiMonitorThin /> },
];
