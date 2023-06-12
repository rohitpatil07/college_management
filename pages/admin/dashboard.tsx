import React from "react";
import Dashboard from "../../components/Admin/Dashboard";
import { useAuth } from "../../contexts/AuthContext";

function Page() {
  return (
    <div>
      <Dashboard />
    </div>
  );
}

export default Page;
