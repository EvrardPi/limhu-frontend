import CustomAppbar from "../components/CustomAppbar.tsx";
import { Outlet } from "react-router-dom";
import { CSSProperties } from "react";

const mainStyle: CSSProperties = {
  paddingTop: "16px",
  paddingBottom: "16px",
  paddingLeft: "64px",
  paddingRight: "64px",
};

export default function MainLayout() {
  return (
    <>
      <CustomAppbar />
      <div
        style={{
          ...mainStyle,
        }}
      >
        <Outlet />
      </div>
    </>
  );
}
