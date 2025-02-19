import React, { useState } from "react";
import { theme, getMenu } from "../constants/menu.jsx";
import { lightColors, darkColors } from "../constants/canvasColors.js";
import { useDispatch, useSelector } from "react-redux";
import { changecanvasColor } from "../features/canvasColor.js";
import { changeTheme } from "../features/theme.js";
import { CiPickerEmpty } from "react-icons/ci";

const Menu = () => {
  const menu = getMenu();
  const dispatch = useDispatch();
  const canvasColor = useSelector((state) => state.canvasColor.color);
  const themeColor = useSelector((state) => state.theme.themeColor);

  const handleColorChange = (e) => {
    dispatch(changecanvasColor(e.target.value));
  };

  const changeColor = (item) => {
    dispatch(changecanvasColor(item.hex));
  };
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
  const changeThemeColor = (theme) => {
    if (theme == "system") {
      dispatch(changeTheme(systemTheme));
    }
    dispatch(changeTheme(theme));
    console.log(themeColor);
  };
  return (
    <ul
      className={`${
        themeColor == "light"
          ? "bg-white border-slate-200 border-1 "
          : "bg-[#232329] text-white"
      } absolute top-18 left-4 justify-between items-center rounded-xl shadow-md flex flex-col`}
    >
      <li
        className={`p-2 ${
          themeColor == "light" ? "border-b border-b-slate-300" : ""
        }  w-full`}
      >
        <span className="text-[12px] flex justify-between">
          Canvas background
        </span>
        <div className="flex items-center gap-2 pb-2 justify-center">
          {lightColors.map((item, index) => (
            <div
              onClick={() => {
                changeColor(item);
              }}
              key={index}
              style={{ backgroundColor: item.hex }}
              className={`h-5 cursor-pointer w-5 rounded border-1 border-slate-200`}
            ></div>
          ))}
        </div>
        <div className="flex items-center gap-2 justify-center">
          {darkColors.map((item, index) => (
            <div
              onClick={() => {
                changeColor(item);
              }}
              key={index}
              style={{ backgroundColor: item.hex }}
              className={`h-5 w-5 cursor-pointer rounded border-1 border-slate-200`}
            ></div>
          ))}
          <label
            htmlFor="colorPicker"
            className="h-5 cursor-pointer w-5 rounded border-1 border-slate-200"
          >
            <CiPickerEmpty
              color="black"
              className="h-full w-full rounded"
              style={{
                background:
                  "linear-gradient(45deg, #FF5733, #FFC300, #DAF7A6, #33FF57, #3383FF)",
              }}
            />
          </label>
          <input
            type="color"
            id="colorPicker"
            value={canvasColor}
            onChange={handleColorChange}
            className="hidden absolute top-10"
          />
        </div>
      </li>
      {menu.map((item, index) => (
        <li
          className={`p-2 text-sm cursor-pointer w-full ${
            themeColor == "light" ? "border-b border-b-slate-300" : ""
          } ${
            themeColor == "light" ? "hover:bg-gray-200" : "hover:bg-gray-700"
          }`}
          key={index}
          onClick={item.onclick}
        >
          <span className="flex items-center gap-2 justify-start">
            {item.logo}
            {item.text}
          </span>
        </li>
      ))}

      <li className="p-2 w-full">
        <div>
          <span className="flex items-center justify-between gap-4 text-sm">
            Theme
            <div className="flex gap-1 p-1 rounded-xl border-1 border-slate-300">
              {theme.map((item, index) => (
                <div
                  className={`${
                    themeColor == "light"
                      ? "hover:bg-gray-200"
                      : "hover:bg-gray-500"
                  } p-1 rounded-xl ${
                    themeColor == "light" && item.type == "light"
                      ? "bg-gray-400"
                      : ""
                  } ${
                    themeColor == "dark" && item.type == "dark"
                      ? "bg-gray-500"
                      : ""
                  }`}
                  key={index}
                  onClick={() => {
                    changeThemeColor(item.type);
                    if (item.type == "dark") {
                      changeColor({ name: "Midnight Black", hex: "#121212" });
                    } else if (item.type == "light") {
                      changeColor({ name: "White", hex: "#FFFFFF" });
                    } else if (item.type == "system") {
                      if (systemTheme == "light") {
                        changeThemeColor("light");
                        changeColor({ name: "White", hex: "#FFFFFF" });
                      } else if (systemTheme == "dark") {
                        changeThemeColor("dark");
                        changeColor({ name: "Midnight Black", hex: "#121212" });
                      }
                    }
                  }}
                >
                  {item.logo}
                </div>
              ))}
            </div>
          </span>
        </div>
      </li>
    </ul>
  );
};

export default Menu;
